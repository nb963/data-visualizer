// Ensure the Chart class is loaded in the global context
// import Chart from 'chart.js/auto/'

const xVals = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const yVals = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

let currChart = document.getElementById('myChart').getContext('2d')

let lineChart = new Chart(currChart, {
    type: 'line',
    data: {
        labels: xVals,
        datasets: [{
            data: yVals,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
        }]
    },
    options: {},
})