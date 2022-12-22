const fs = require("fs");
const PDFDocument = require('pdfkit');
const createLabel = require("./modules/createLabel");
const createChart = require("./modules/createChart");
const createPDF = require("./modules/createPDF");
const createColumn = require("./modules/createColumn");
const generatePGA = require("./modules/generatePGA");

const folderPath = "./example_csv";

async function main() {
    // Read the contents of folder
    const fileNames = fs.readdirSync(folderPath);
    // Create a new PDF document
    const doc = new PDFDocument({ size: "A4" });

    for (const fileName of fileNames) {
        // Read the CSV data
        const pathToCSV = `${folderPath}/${fileName}`;
        const labels = createLabel(pathToCSV);
        const [valuesX, valuesY, valuesZ] = createColumn(pathToCSV);
        const [[maxPGAX, minPGAX, absPGAX], [maxPGAY, minPGAY, absPGAY], 
                    [maxPGAZ, minPGAZ, absPGAZ]] = generatePGA(pathToCSV);
        // Generate images for each coordinate
        const imageX = await createChart(labels, valuesX, 'rgba(0, 0, 255)', 'x', maxPGAX, minPGAX, absPGAX);
        const imageY = await createChart(labels, valuesY, 'rgba(255, 0, 0)', 'y', maxPGAY, minPGAY, absPGAY);
        const imageZ = await createChart(labels, valuesZ, 'rgba(0, 255, 0', 'z', maxPGAZ, minPGAZ, absPGAZ);
        // Wait for all images to be created before creating the PDF
        const [imageXBuffer, imageYBuffer, imageZBuffer] = await Promise.all([
            imageX,
            imageY,
            imageZ,
        ]);
        
        doc.image(imageXBuffer, 0, 0, { width: 600, height: 200 });
        doc.image(imageYBuffer, 0, 250, { width: 600, height: 200 });
        doc.image(imageZBuffer, 0, 500, { width: 600, height: 200 });
        // Add a new page if there are more file names left in the array
        if (fileNames.indexOf(fileName) < fileNames.length - 1)
            doc.addPage();
    }
    // Save the PDF to a file
    doc.pipe(fs.createWriteStream('output.pdf')).on('finish', () => {
        console.log('PDF saved');
    });
    doc.end();
}

main();