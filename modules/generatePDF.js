const PDFDocument = require("pdfkit");
const fs = require("fs");
const createLabel = require("./createLabel");
const createColumn = require("./createColumn");
const generatePGA = require("./generatePGA");
const createChart = require("./createChart");

async function generatePDF(folderPath, pageCompleted) {
    // Create a new PDF document
    const doc = new PDFDocument({ size: "A4" });
    // Read the contents of folder
    const fileNames = fs.readdirSync(folderPath);
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
        // Add title to PDF
        const title = fileName.split('-')[1];
        doc.font('Helvetica-Bold').fontSize(20).fillColor('#000000').text(title, { align: 'center' }); 
        // Add some space below the title
        doc.moveDown(1);
        // Calculate the vertical position of the x, y, and z graphs based on the height of the title and the space below it
        const graphY = doc.y;
        doc.image(imageXBuffer, 0, graphY, { width: 600, height: 200 });
        doc.image(imageYBuffer, 0, graphY + 200, { width: 600, height: 200 });
        doc.image(imageZBuffer, 0, graphY + 400, { width: 600, height: 200 });
        // Add a new page if there are more file names left in the array
        if (fileNames.indexOf(fileName) < fileNames.length - 1){
            doc.addPage();
            pageCompleted();
        }
    }
    // Save the PDF to a file
    doc.pipe(fs.createWriteStream('output2.pdf')).on('finish', () => {
        console.log('PDF saved');
    });
    doc.end();
}

module.exports = generatePDF;