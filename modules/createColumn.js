const fs = require("fs");

function createColumn(pathToFile) {
    //Read the CSV data from the file
    const data = fs.readFileSync(pathToFile,"utf-8");
    const labelsX = [];
    const labelsY = [];
    const labelsZ = [];

    // Split the CSV file into rows
    const lines = data.split("\n");
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
        const labelX = columns[1];
        labelsX.push(Number(labelX));
        const labelY = columns[2];
        labelsY.push(Number(labelY));
        const labelZ = columns[3];
        labelsZ.push(Number(labelZ));
    }
    return [labelsX, labelsY, labelsZ];
}

module.exports = createColumn;