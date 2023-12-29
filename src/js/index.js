// This file contains the functionality of the chart, the style of the points and 
// functions that calculate the total returns from the given data. The file also 
// contains functions that help reset the scale of the chart as well as help style 
// the chart points. 

import data from '/src/data/rawreturns.json' assert { type: 'json' }

let xVals = []

data.forEach(function (item) {
    // Getting the dates of the total returns 
    // from the JSON object as the x-values

    let keys = Object.keys(item)
    xVals.push(item[keys[1]])
});


let yVals1Percent = []

data.map(function (item) {
    // Calculating the added 1 percent y-values
    // from the JSON object 

    let keys = Object.keys(item);
    let add1percent = 1 + (item[keys[2]] / 100)
    yVals1Percent.push(add1percent)
    return add1percent;
});

let yVals = [];
let currProduct = 1;
let maxReturn = -1000000000
let minReturn = 1000000000
let arrayElem = 0

yVals1Percent.forEach(function (currentValue) {
    // Calculating the total returns from the 
    // the JSON object and finding the maximum
    // and the minimum total returns

    currProduct *= currentValue;
    arrayElem = parseFloat((currProduct - 1) * 100).toFixed(4)
    yVals.push(arrayElem)
    maxReturn = Math.max(arrayElem, maxReturn)
    minReturn = Math.min(arrayElem, minReturn)
});

let currChart = document.getElementById('myChart').getContext('2d')

// Chart styling

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "serif"

let lineChart = new Chart(currChart, {
    type: 'line',
    data: {
        labels: xVals,
        datasets: [{
            data: yVals,
            borderColor: '#083966',
            backgroundColor: '#516c8a',
            pointBackgroundColor: customColor,
            // setting different colors for the points
        }]
    },
    options: {
        elements: {
            point: {
                radius: customRadius,
                // setting different radius for the points
                display: true
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                // formatting the values on the x-axis
                type: 'time',
                time: {
                    unit: 'day',
                    parser: 'dd/MM/yyyy',
                    displayFormats: {
                        day: "dd MMM yyyy"
                    },
                    tooltipFormat: 'dd MMM yyyy',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 24
                },
                title: {
                    display: false,
                },
                position: 'bottom',
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Total Returns in %',
                    font: {
                        size: '18px',
                        weight: 'bold'
                    }
                },
            },


        },
        plugins: {
            zoom: {
                zoom: {
                    drag: {
                        enabled: true
                    },
                    // adding the click + drag zoom feature
                    mode: 'x',
                },
            },
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label || '';
                        var index = context.dataIndex;
                        var value = parseFloat(context.dataset.data[index]).toFixed(4);
                        if (label) {
                            label += ": ";
                        }
                        // adding custom labels to the points on the axis
                        if (value == minReturn) {
                            label += "Minimum Total Returns: " + context.formattedValue + "%"
                        } else if (value == maxReturn) {
                            label += "Maximum Total Returns: " + context.formattedValue + "%"
                        } else {
                            label += "Total Returns: " + context.formattedValue + "%";
                        }
                        return label;
                    }
                }
            }
        }
    },
})

function customColor(context) {
    let index = context.dataIndex;
    let value = parseFloat(context.dataset.data[index]).toFixed(4);

    if (value == minReturn) {
        return 'red' // if minimum return, the point is colored red
    } else if (value == maxReturn) {
        return 'green' // if maximum return, the point is colored green
    }

    // else point is colored blue
    return '#516c8a'
}


function customRadius(context) {
    let index = context.dataIndex;
    let value = parseFloat(context.dataset.data[index]).toFixed(4);

    // increasing the size of the point if the return is the 
    // maximum or the minimum return 
    if (value == minReturn || value == maxReturn) {
        return 4
    }

    return 2
}

// resetting the size of the chart if the chart is not the original size
const resetZoomBtn = (chart) => {
    chart.resetZoom()

};

const resetZoomButton = document.getElementById('resetZoomBtn');
resetZoomButton.addEventListener('click', () => {
    resetZoomBtn(lineChart);
});



