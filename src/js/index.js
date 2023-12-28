import data from '/src/data/rawreturns.json' assert { type: 'json' }

let xVals = []

data.forEach(function (item) {
    // Get the keys of the object and then get the value of the 
    let keys = Object.keys(item)
    xVals.push(item[keys[1]])
});


let yVals1Percent = []

data.map(function (item) {
    // Get the keys of the object and then get the value of the 
    let keys = Object.keys(item);
    let add1percent = 1 + (item[keys[2]] / 100)
    yVals1Percent.push(add1percent)
    return add1percent;
});

let yVals = [];
let currProduct = 1;

yVals1Percent.forEach(function (currentValue) {
    currProduct *= currentValue;
    yVals.push(parseFloat((currProduct - 1) * 100).toFixed(4));
});


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
        }]
    },
    options: {
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
                title: {
                    display: true,
                    text: 'Dates',
                    font: {
                        size: '18px',
                        weight: 'bold'
                    }
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
                    // wheel: {
                    //     enabled: false,
                    // },
                    // pinch: {
                    //     enabled: false,
                    // },
                    mode: 'x',
                },
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += 'Total Return in %:  ' + context.formattedValue; // Modify 'Prefix' to your desired prefix
                        return label;
                    }
                }
            }
        }
    },
})




