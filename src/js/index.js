import data from '/src/data/rawreturns.json' assert { type: 'json' }

let xVals = []

data.forEach(function (item) {
    let keys = Object.keys(item)
    xVals.push(item[keys[1]])
});


let yVals1Percent = []

data.map(function (item) {
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
    currProduct *= currentValue;
    arrayElem = parseFloat((currProduct - 1) * 100).toFixed(4)
    yVals.push(arrayElem)
    maxReturn = Math.max(arrayElem, maxReturn)
    minReturn = Math.min(arrayElem, minReturn)
});

// let maxElem = document.getElementById("max-pt")
// maxElem.innerHTML = "Max Total Return: " + maxReturn

// let minElem = document.getElementById("min-pt")
// minElem.innerHTML = "Min Total Return: " + minReturn

console.log(minReturn, maxReturn)

let currChart = document.getElementById('myChart').getContext('2d')

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
        }]
    },
    options: {
        elements: {
            point: {
                radius: customRadius,
                display: true
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
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
                min: '1990-01-02',
                max: '2022-09-30',
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
        return 'red'
    } else if (value == maxReturn) {
        return 'green'
    }

    return '#516c8a'
}


function customRadius(context) {
    let index = context.dataIndex;
    let value = parseFloat(context.dataset.data[index]).toFixed(4);

    if (value == minReturn || value == maxReturn) {
        return 4
    }

    return 2
}

const resetZoomBtn = (chart) => {

    chart.resetZoom()

};

const resetZoomButton = document.getElementById('resetZoomBtn');
resetZoomButton.addEventListener('click', () => {
    resetZoomBtn(lineChart);
});


