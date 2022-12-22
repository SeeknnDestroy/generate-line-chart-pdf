// Import the fs module for reading and writing files
const fs = require("fs");

/*
 * Reads a CSV file and converts the time data in the first column from miliseconds to a date time
 * in the format '10:24:45'.
 *
 * pathToFile - The file path for the input CSV file.
 * Returns an array of date time strings in the format 'HH:mm:ss'.
 */
function createLabel(pathToFile) {
    //Read the CSV data from the file
    const dataN = fs.readFileSync(pathToFile,"utf-8");
    const labels = [];

    // Split the CSV file into rows
    const lines = dataN.split("\n");
    // Convert the time data in the first column of each row from miliseconds to a date time in the format 'HH:mm:ss'
    for (let i = 0; i < lines.length; i++) {
        // Check if the line is empty
        if (lines[i].trim() === '') {
            // Skip the empty line
            continue;
        }
        // Split the line into columns
        let columns = lines[i].split(";");  // If the CSV file uses ',' as the delimiter, change this to ',' accordingly

        // Get the date and time information from the first column
        const dateTimeString = columns[0];
        const timestamp = Number(dateTimeString);   // Convert the miliseconds value to number
        const date = new Date(timestamp);   // Create a date object from the timestamp
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substring(-2) + ':' + seconds.substr(-2);
        labels.push(formattedTime);
    }
    return labels;
}

module.exports = createLabel;