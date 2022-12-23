const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const width = 1125;
const height = 330;

//Create line chart
const createChart = async(labels, data, color, axis, maxPGA, minPGA, absPGA) => {
    const config = {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `${axis}-axis   +PGA:${maxPGA.toFixed(2)}   -PGA:${minPGA.toFixed(2)}   PGA:${absPGA.toFixed(2)} `,
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
                        text: `Acc (cm/s²)`
                    }
                }
            }
        }
    };
    //Create a new canvas using chartjs-node-canvas lib
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: width, height: height }); 
    const image = await chartJSNodeCanvas.renderToBufferSync(config);
    return image;
};

module.exports = createChart;