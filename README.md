# CSV Data Visualization and PDF Conversion
This npm module is a tool for visualizing data from CSV files as line charts and converting the charts to a PDF document. The CSV data is expected to contain one time column and three columns of numerical values representing the x, y, and z coordinates. The program reads the CSV data, generates line charts for each coordinate using the Chart.js library, and combines the charts into a single PDF document.

## Getting Started
These instructions will help you get started with using the CSV Chart Generator in your own project.

### Prerequisites
To use this module, you will need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. You can check if you have these tools installed by running the following commands in the terminal:
```
node -v
npm -v
```

If you do not have Node.js and npm installed, you can download and install them from the official website (https://nodejs.org/).

## Installing
To install the CSV Chart Generator, run the following command in your terminal:

```
npm install csv-chart-generator
```

## Usage
To use the CSV Chart Generator, follow these steps:

1. Provide a folder containing CSV files with the data you want to visualize. The CSV files should have the following format:
```
time,x,y,z
<miliseconds>,<numeric value>,<numeric value>,<numeric value>
<miliseconds>,<numeric value>,<numeric value>,<numeric value>
...
```
The first row should not contain the column names, rows should contain the data values. The time column should contain the time data in number of milliseconds since January 1, 1970. x, y, and z columns should contain numerical values.
2. In your Node.js app, require the CSV Chart Generator module and call the generatePDF function, passing in the path to the folder containing your CSV files:
```
In your Node.js app, require the CSV Chart Generator module and call the generatePDF function, passing in the path to the folder containing your CSV files:
```
3. Run your Node.js app to generate the PDF document:
```
node app.js
```
The PDF document will be saved to a file named output.pdf in the project root directory. The PDF will have as many pages as there are CSV files in the specified folder.

## Example
Here's an example of how to use the CSV Chart Generator in a Node.js app via providing the folder path on the console:
```
// app.js

const data = require('csv-chart-generator');

const arguments = process.argv;
const folderPath = arguments[2].toString();

data.generatePDF(folderPath);
```
To run the example, open a terminal and navigate to the directory containing app.js. Then, run the following command:
```
node app.js <pathToFolder>
```
Replace <pathToFolder> with the path to the folder containing your CSV files. The PDF document will be generated and saved to a file named output.pdf in the project root directory.





