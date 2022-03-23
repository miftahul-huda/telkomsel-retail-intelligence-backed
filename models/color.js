const ColorThief = require('colorthief');
const { ArgumentParser } = require('argparse');
const fs = require("fs");
var readimage = require("readimage")
var colorPalette = require("colors-palette");
var analyze = require( 'rgbaster');
var Canvas = require("canvas");
global.Image = Canvas.Image;

var Jimp = require('jimp');


async function run(imageUrl, targetColor)
{
    let ss = targetColor.split(";");
    let colors = [];
    ss.map((color)=>{
      let ccc = color.split(",")
      let clr = { r: ccc[0], g: ccc[1], b: ccc[2], a: 255 }
      colors.push(clr);
    })
    colors.map((color)=>{
        // open a file called "lenna.png"
        Jimp.read(imageUrl, (err, image) => {
            if (err) throw err;
            process(image, color)
        });
    })


}

function sortX(colors)
{
    colors.sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0))
    return colors;
}

function sortY(colors)
{
    colors.sort((a,b) => (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0))
    return colors;
}

function process(image, targetColor)
{
    //const targetColor = {r: 10, g: 41, b: 106, a: 255};  // Color you want to replace
    const replaceColor = {r: 0, g: 0, b: 0, a: 0};  // Color you want to replace with
    const colorDistance = (c1, c2) => Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2) + Math.pow(c1.a - c2.a, 2) );  // Distance between two colors
    const threshold = 70;  // Replace colors under this threshold. The smaller the number, the more specific it is.
    let counter = 0;
    let total = 0;
    let positions = [];
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const thisColor = {
        r: image.bitmap.data[idx + 0],
        g: image.bitmap.data[idx + 1],
        b: image.bitmap.data[idx + 2],
        a: image.bitmap.data[idx + 3]
      };
      
      if(colorDistance(targetColor, thisColor) <= threshold) {
        console.log("thisColor")
        console.log(thisColor)
        image.bitmap.data[idx + 0] = replaceColor.r;
        image.bitmap.data[idx + 1] = replaceColor.g;
        image.bitmap.data[idx + 2] = replaceColor.b;
        image.bitmap.data[idx + 3] = replaceColor.a;

        let pos = {x: x, y: y, idx: idx}
        positions.push(pos);
        //console.log(pos)
        total++;
      }
      //console.log(idx)
      counter++;
    });

    //console.log(positions)
    /*positions = sortX(positions)
    let minX = positions[0];
    let maxX = positions[positions.length - 1];

    positions = sortY(positions)
    let minY = positions[0];
    let maxY = positions[positions.length - 1];

    let originalArea = image.bitmap.width * image.bitmap.height;
    let lengthX = maxX - minX;
    let lengthY = maxY - minY;
    let area = lengthX * lengthY;

    //let percentage = area/originalArea;
    */

    let percentage = total / counter;
    percentage = percentage * 2;
    console.log(percentage)
    image.write('transparent.png');
}


const parser = new ArgumentParser({
    description: 'Argparse example'
  });

parser.add_argument('-u', '--url', { help: 'Url for the image file to parse' });
parser.add_argument('-c', '--color', { help: 'Target color' });
let o = parser.parse_args();

console.log(o.url)

run(o.url, o.color);
