const fs = require("fs");
function createColumn(pathToFile, coordVal) {
    //Read the CSV data from the file
    const dataN = fs.readFileSync(pathToFile,"utf-8");
    const labels = [];

    // Split the CSV file into rows
    const lines = dataN.split("\n");
    // Convert the time data in the first column of each row from miliseconds to a date time in the format 'HH:mm:ss'
    for (var i = 0; i < lines.length; i++) {
        // Check if the line is empty
        if (lines[i].trim() === '') {
            // Skip the empty line
            continue;
        }
        // Split the line into columns
        var columns = lines[i].split(";");  // If the CSV file uses ',' as the delimiter, change this to ',' accordingly

        // Get the column of the coordinat value
        const label = columns[coordVal];
        labels.push(Number(label));
    }
    return labels;
    const maxPGA = Math.max(...labels);
    const minPGA = Math.min(...labels);
    const absPGA = Math.max(Math.abs(maxPGA), Math.abs(minPGA));
    console.log(maxPGA);
    console.log(minPGA);
    console.log(absPGA);
}

module.exports = createColumn;