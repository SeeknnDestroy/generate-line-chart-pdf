//Converts a PNG image file to a PDF file.
const PDFDocument = require("pdfkit");
const fs = require("fs");

//Callback function that converts the PNG file to PDF
function createPDF(pathToImg, pathToPDF) {
    console.log("Chart built..");
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pathToPDF));
    doc.image(pathToImg, 0, 0, {width: 600});
    doc.end();
    console.log("Pdf built..");
};

module.exports = createPDF;