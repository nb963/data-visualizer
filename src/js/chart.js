import data from './data/rawreturns.json' assert { type: 'json' }

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

console.log(yVals);


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
                position: 'bottom',
            },
            y: {
                beginAtZero: false,
            },
        },
    },
})

// function zoomClick()