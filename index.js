const fs = require("fs");
const PDFDocument = require('pdfkit');
const createLabel = require("./modules/createLabel");
const createChart = require("./modules/createChart");
const createPDF = require("./modules/createPDF");
const createColumn = require("./modules/createColumn");
const generatePGA = require("./modules/generatePGA");

//node index.js ./seismicdata_8001_202211230409_0dd64ce0-98a2-490a-abad-dc33381e6a33.csv 
//komutunda 2.index dosyayı göstermektedir.
var arguments=process.argv
const pathToCSV= arguments[2].toString();
//const pathToCSV = "./seismicdata_8001_202211230409_0dd64ce0-98a2-490a-abad-dc33381e6a33.csv";
const labels = createLabel(pathToCSV);

const [valuesX, valuesY, valuesZ] = createColumn(pathToCSV);
const [[maxPGAX, minPGAX, absPGAX], [maxPGAY, minPGAY, absPGAY], [maxPGAZ, minPGAZ, absPGAZ]] = generatePGA(pathToCSV);

async function main() {
    const imageX = await createChart(labels, valuesX, 'rgba(0, 0, 255)', 'x', maxPGAX, minPGAX, absPGAX);
    const imageY = await createChart(labels, valuesY, 'rgba(255, 0, 0)', 'y', maxPGAY, minPGAY, absPGAY);
    const imageZ = await createChart(labels, valuesZ, 'rgba(0, 255, 0', 'z', maxPGAZ, minPGAZ, absPGAZ);
    // Wait for all images to be created before creating the PDF
    const [imageXBuffer, imageYBuffer, imageZBuffer] = await Promise.all([
        imageX,
        imageY,
        imageZ,
    ]);

    const doc = new PDFDocument({ size: "A4" });
    // Add the first image
    doc.image(imageXBuffer, 0, 0, { width: 600, height: 200 });
    // Add the second image
    doc.image(imageYBuffer, 0, 250, { width: 600, height: 200 });
    // Add the third image
    doc.image(imageZBuffer, 0, 500, { width: 600, height: 200 });
    // Save the PDF to a file
    doc.pipe(fs.createWriteStream('output110.pdf')).on('finish', () => {
        console.log('PDF saved');
    });
    doc.end();
}

main();
