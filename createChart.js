const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require("fs");
const createPDF = require("./createPDF");

const width = 1125;
const height = 330;
const maxPGA = Math.max(...[3,5,7]);

//Create line chart
const createChart = async(labels, data, color, axis) => {
    const config = {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `${axis}-axis, +PGA: ${maxPGA} -PGA: `,
                data: data,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                pointRadius: 0,
                showLine: true
            }]
        },
        options: {
            layout: {
                padding: {
                    top: 70,
                    left: 70,
                    right: 70
                }
            },
            backgroundColor: '#FFFFFF',
            borderWidth: 5,
            borderColor: '#000000',
            plugins: {
                title: {
                    display: true,
                    text: "2053 - HAZNEDAR - GUNGOREN",
                }
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        maxTicksLimit: 10
                    },
                    border: {
                        display:true
                    }
                },
                y: {
                    display: true,
                    suggestedMin: -10,
                    suggestedMax: 10,
                    title: {
                        display: true,
                        text: "Acc (cm/s^2)"
                    }
                }
            }
        }
    };
    //Create a new canvas using chartjs-node-canvas lib
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: width, height: height }); 
    const image = await chartJSNodeCanvas.renderToBufferSync(config);
    return image;
    // fs.writeFile(pathToImg ,image, () => {
    //     createPDF(pathToImg, pathToPDF);
    // });
};

module.exports = createChart;