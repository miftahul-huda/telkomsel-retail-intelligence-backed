// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

const { ArgumentParser } = require('argparse');

async function run(imageUrl)
{
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
    // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

    // Performs text detection on the gcs file
    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(JSON.stringify(text)));
}


const parser = new ArgumentParser({
    description: 'Argparse example'
  });

parser.add_argument('-u', '--url', { help: 'Url for the image file to parse' });
let o = parser.parse_args();
console.log(o.url)

run(o.url);


