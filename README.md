# CSV Data Visualization and PDF Conversion
This project is a tool for visualizing data from CSV files as line charts and converting the charts to a PDF document. The CSV data is expected to contain three columns of numerical values representing the x, y, and z coordinates of a time series. The program reads the CSV data, generates line charts for each coordinate using the Chart.js library, and combines the charts into a single PDF document.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
To run this project, you will need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. You can check if you have these tools installed by running the following commands in the terminal:
```
node -v
npm -v
```

If you do not have Node.js and npm installed, you can download and install them from the official website (https://nodejs.org/).

## Installing
To install the project, follow these steps:
1. Clone the repository to your local machine:
```
git clone https://github.com/SeeknnDestroy/generate-line-chart-pdf.git
```
2. Navigate to the project directory:
```
cd generate-line-chart-pdf
```
3. Install the project dependencies:
```
npm install
```

## Usage
To use this project, follow these steps:
1. Provide a folder containing CSV files with the data you want to visualize. The CSV files should have the following format:
```
time,x,y,z
<miliseconds>,<numeric value>,<numeric value>,<numeric value>
<miliseconds>,<numeric value>,<numeric value>,<numeric value>
...
```
The first row should not contain the column names, rows should contain the data values. The time column should contain the time data in number of milliseconds since January 1, 1970. x, y, and z columns should contain numerical values.
2. In the index.js file, change the folderPath variable to the path of the folder containing your CSV files:
```
const folderPath = "path/to/folder";
```
3. Run the index.js file to generate the PDF document:
```
node index.js
```
The PDF document will be saved to a file named output.pdf in the project root directory. The PDF will have as many pages as there are CSV files in the specified folder.
