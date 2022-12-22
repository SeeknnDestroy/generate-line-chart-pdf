const createColumn = require("./createColumn");

function generatePGA(pathToCSV) {
    const [valuesX, valuesY, valuesZ] = createColumn(pathToCSV);

    const maxPGAX = Math.max(...valuesX);
    const minPGAX = Math.min(...valuesX);
    const absPGAX = Math.max(Math.abs(maxPGAX), Math.abs(minPGAX));

    const maxPGAY = Math.max(...valuesY);
    const minPGAY = Math.min(...valuesY);
    const absPGAY = Math.max(Math.abs(maxPGAY), Math.abs(minPGAY));
    
    const maxPGAZ = Math.max(...valuesZ);
    const minPGAZ = Math.min(...valuesZ);
    const absPGAZ = Math.max(Math.abs(maxPGAZ), Math.abs(minPGAZ));

    return [[maxPGAX, minPGAX, absPGAX], [maxPGAY, minPGAY, absPGAY], [maxPGAZ, minPGAZ, absPGAZ]];
}

module.exports = generatePGA;