const tf = require("@tensorflow/tfjs-node");
const automl = require("@tensorflow/tfjs-automl");
const fs = require("fs");

const loadDictionary = modelUrl => {
  const lastIndexOfSlash = modelUrl.lastIndexOf("/");
  const prefixUrl =
    lastIndexOfSlash >= 0 ? modelUrl.slice(0, lastIndexOfSlash + 1) : "";
  const dictUrl = `${prefixUrl}dict.txt`;
  const text = fs.readFileSync(dictUrl, { encoding: "utf-8" });
  return text.trim().split("\n");
};

const loadObjectDetection = async modelUrl => {
  const [model, dict] = await Promise.all([
    tf.loadGraphModel(`file://${modelUrl}`),
    loadDictionary(modelUrl)
  ]);
  //return new automl.ImageClassificationModel(model, dict);
  return new automl.ObjectDetectionModel(model, dict);
};

const decodeImage = imgPath => {
  const imgSrc = fs.readFileSync(imgPath);
  const arrByte = Uint8Array.from(Buffer.from(imgSrc));
  return tf.node.decodeImage(arrByte);
};

const main = async () => {
  const modelURL = "./package-item-bb/model.json";
  const model = await loadObjectDetection(modelURL);
  //const modelUrl = 'model.json'; // URL to the model.json file.
  //const model = await automl.loadObjectDetection(modelURL);
  const decodedImage = decodeImage("test2.png");

  let result = await model.detect(decodedImage);
  console.log("Result");
  console.log(result);
  return result;
};

main()
  .then(console.log)
  .catch(console.log);