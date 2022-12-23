const fs = require("fs");
const PDFDocument = require('pdfkit');
const createLabel = require("./modules/createLabel");
const createChart = require("./modules/createChart");
const createColumn = require("./modules/createColumn");
const generatePGA = require("./modules/generatePGA");
const generatePDF = require("./modules/generatePDF");

const folderPath = "./botas_20221123_duzce_csv";

async function main() {
    let pageNumber = 2;
    function pageCompleted() {
        console.log(`Completed creating page ${pageNumber}`);
        pageNumber++;
    }
    generatePDF(folderPath, pageCompleted);
}

main();