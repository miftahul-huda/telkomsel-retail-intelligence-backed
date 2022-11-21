const tf = require("@tensorflow/tfjs-node");
const automl = require("@tensorflow/tfjs-automl");
const fs = require("fs");
const Jimp = require("jimp");
const OperatorLogic = require("./operatorlogic")


class MlLogic
{
    static loadDictionary(modelUrl){
        const lastIndexOfSlash = modelUrl.lastIndexOf("/");
        const prefixUrl =
          lastIndexOfSlash >= 0 ? modelUrl.slice(0, lastIndexOfSlash + 1) : "";
        const dictUrl = `${prefixUrl}dict.txt`;
        const text = fs.readFileSync(dictUrl, { encoding: "utf-8" });
        return text.trim().split("\n");        
    }

    static loadObjectDetection(modelUrl)
    {
        
    }

    static async ml_getPackageItems(imageUrl)
    {
      // Imports the Google Cloud client libraries
      const vision = require('@google-cloud/vision');

      // Creates a client
      const client = new vision.ImageAnnotatorClient();

      /**
       * TODO(developer): Uncomment the following lines before running the sample.
       */
      // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
      // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

      // Performs text detection on the gcs file
      const [result] = await client.textDetection(imageUrl);
      //const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
      const detections = result.textAnnotations;
      console.log('Text:');
      detections.forEach(text => console.log(text));
    }

    static makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
    }

    static get_area_weights()
    {
      let area_weights = [[5, 20, 5], [5, 35, 15], [5,5,5]];
      return area_weights;
    }

    static async split_image(imageUrl)
    {
      let area_weights = MlLogic.get_area_weights();

      let area = [];
      let counter = 0;
      let promise = new Promise((resolve, reject)=>{

        try{

          Jimp.read(imageUrl, (err, image)=>{
            if (err) throw err;
            let w = image.bitmap.width;
            let h = image.bitmap.height;
            let xx = Math.floor(w/3) - 20;
            let yy = Math.floor(h/3) - 20;
            let originalImage = image;

           
    
            for(let r = 0; r < 3; r++)
            {
              let row = [];
              for(let c =0; c < 3; c++)
              {
                let cropImage = image.clone();
                let posx = c * xx;
                let posy = r * yy;
               
    
                let fname = "/tmp/" + MlLogic.makeid(5) + "_" + r + "_" + c + ".png";
                console.log("Cropped to " + fname)
                cropImage.crop(posx, posy, xx, yy ).write(fname, ()=>{

                  
                  if(counter >= 8)
                  {
                    resolve(area);
                  }
                  counter++;
                })

                let area_weight = area_weights[r][c];
                let box = { x: posx, y: posy, w:xx, h: yy, filename: fname, weight: area_weight, row: r, col:c}
                area.push(box);
              }
              //area.push(row);
            }
          })

        }
        catch(err)
        {
          reject(err);
        }

      })

      return promise;

    }


    static async process(imagefile, targetColor)
    {

        let promise = new Promise(async (resolve, reject)=>{
          //const targetColor = {r: 10, g: 41, b: 106, a: 255};  // Color you want to replace
          const replaceColor = {r: 0, g: 0, b: 0, a: 0};  // Color you want to replace with
          const colorDistance = (c1, c2) => Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2) + Math.pow(c1.a - c2.a, 2) );  // Distance between two colors
          const threshold = 50;  // Replace colors under this threshold. The smaller the number, the more specific it is.
          let counter = 0;
          let total = 0;
          let positions = [];
          let image = await Jimp.read(imagefile)
          image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            const thisColor = {
              r: image.bitmap.data[idx + 0],
              g: image.bitmap.data[idx + 1],
              b: image.bitmap.data[idx + 2],
              a: image.bitmap.data[idx + 3]
            };
            
            if(colorDistance(targetColor, thisColor) <= threshold) {
              image.bitmap.data[idx + 0] = replaceColor.r;
              image.bitmap.data[idx + 1] = replaceColor.g;
              image.bitmap.data[idx + 2] = replaceColor.b;
              image.bitmap.data[idx + 3] = replaceColor.a;
      
              let pos = {x: x, y: y, idx: idx}
              positions.push(pos);
              //console.log(pos)
              total++;
              //console.log("total")
              //console.log(total)
            }
            //console.log(idx)
            counter++;
          });

      
          let percentage = total / counter;
          percentage = percentage * 2;
          //console.log(percentage)

          resolve(percentage)

        })

        //image.write('transparent.png');

        return promise;
    }

    static colorstr2color(color)
    {
      let clr = {};
      color = color.split(",");
      clr.r = color[0]
      clr.g = color[1]
      clr.b = color[2]
      clr.a = 255
      return clr;
    }


    static async get_dominant_operator_by_area(operators, area)
    {
      let promise = new Promise(async (resolve, reject)=>{
        let dominant_op = { operator: null, percentage: -1 }
        await Promise.all( operators.map(async (operator)=>{
          let operator_average_percentage = 0;
          let colors = operator.color;
          colors = colors.split(";");
          await Promise.all( colors.map( async (color)=>{
            let clr = MlLogic.colorstr2color(color)
            let percentage =  await MlLogic.process(area.filename, clr)

            if(percentage > operator_average_percentage)
              operator_average_percentage = percentage;
            //console.log("operator %s, color %s, percentage %s, operator_average_percentage %s", operator.operator_name, color, percentage, operator_average_percentage)
            
          }))

          //console.log("operator_average_percentage")
          //console.log(operator_average_percentage);

          //operator_average_percentage = operator_average_percentage/colors.length;
          if(dominant_op.percentage < operator_average_percentage)
          {
            dominant_op.percentage = operator_average_percentage;
            dominant_op.operator = operator;
          }
        }))

        //console.log("dominant_op")
        //console.log(dominant_op)
        
        resolve(dominant_op)

      })

      return promise;
 
    }


    static searchOp(dominantOps, op)
    {
      let o = null;
      dominantOps.map((dop)=>{
        if(dop.operator == op.operator_value)
          o = dop;
      })

      return o;
    }

    static areas2dominantOps(areas)
    {
      let threshold = 0.01;
      let dominantOps = [];
      areas.map((area)=>{
        if(area.dominant_operator.percentage > threshold)
        {
          let dop = MlLogic.searchOp(dominantOps, area.dominant_operator.operator)
          if(dop == null)
          {
            dop = { operator: area.dominant_operator.operator.operator_value, operatorText: area.dominant_operator.operator.operator_name, percentage: area.weight }
            dominantOps.push(dop);
          }
          else
          {
            dop.percentage += area.weight
          }
          
        }
      })

      return dominantOps;
    }

    static deleteAreaFiles(areas)
    {
      areas.map((area)=>{
        console.log("deleting " + area.filename)
        fs.unlinkSync(area.filename);
      })
    }

    static async ml_getColorPercentage(imageUrl)
    {
      let promise = new Promise(async (resolve, reject)=>{

        try{
          let areas = await MlLogic.split_image(imageUrl);
          //console.log(areas)
          let result = await OperatorLogic.findAll();
          let operators = result.payload;

          operators = JSON.parse(JSON.stringify(operators))
          let i = 0;
          areas.map(async (area)=>{
            let dominant_operator = await MlLogic.get_dominant_operator_by_area( operators, area);
            //console.log("dominant operator")
            //console.log(dominant_operator);
            //areas[i].dominant_operator = dominant_operator;
            area.dominant_operator = dominant_operator;
            //console.log("area")
            //console.log(area);

            i++;

            if(i >= areas.length)
            {

              let dominantOps = MlLogic.areas2dominantOps(areas);
   
              MlLogic.deleteAreaFiles(areas);
              resolve({ success: true, payload: dominantOps });
            }
          })
          
        }
        catch(err)
        {
          reject({ success:false, payload: JSON.stringify(err), message: "Error" });
        }

      })

      return promise;

    }

}

module.exports = MlLogic;