// /js/Charts.js (Consolidated and Corrected)

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. DATA SETUP & CHECK ---
    // If you are using an embedded script in PUG to set a global variable:
    // This section assumes the data object is attached to the window object 
    // by a previous script block in the PUG file.
    if (typeof window.chartData === 'undefined') {
        console.error("Chart data (window.chartData) not fully injected from server.");
        // We will assume woodChartData is set in a separate variable if not part of window.chartData
    }

    // --- 2. PIE CHART LOGIC (Existing Code) ---
    // Note: Assuming 'window.chartData' contains hardwood, softwood, etc. for the Pie Chart.
    const hardwoodCost = window.chartData ? window.chartData.hardwood : 0;
    const softwoodCost = window.chartData ? window.chartData.softwood : 0;
    const timberCost = window.chartData ? window.chartData.timber : 0;
    const polesCost = window.chartData ? window.chartData.poles : 0;

    const canvas = document.getElementById('expensesPieChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Hardwood', 'Softwood', 'Timber', 'Poles'],
                datasets: [{
                    label: 'Expenses (UGX)',
                    data: [hardwoodCost, softwoodCost, timberCost, polesCost],
                    backgroundColor: [
                    'rgba(218, 206, 32, 0.8)',
                    'rgba(231, 29, 29, 0.8)',
                    'rgba(42, 171, 240, 0.8)',
                    'rgba(54, 217, 54, 0.8)'
                     ],
                    borderColor: [
                    'rgba(51, 186, 24, 1)',
                    'rgba(18, 140, 222, 1)',
                    'rgba(242, 78, 37, 1)',
                    'rgba(217, 217, 23, 1)'
                     ],
                    borderWidth: 1
                }]
            },
            options: { /* ... options ... */ }
        });
    } else {
        console.warn("Pie Chart canvas 'expensesPieChart' not found.");
    }
    
    // --- 3. LINE CHART LOGIC (Existing Code) ---
    const lineCanvas = document.getElementById('stockLineChart');
    if (lineCanvas) {
        const lineCtx = lineCanvas.getContext('2d');
        
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: window.chartData ? window.chartData.revenueLabels : [],
                datasets: [
                    // ... Wood and Furniture Revenue Datasets ...
                ]
            },
            options: { /* ... options ... */ }
        });
    } else {
        console.warn("Line Chart canvas 'stockLineChart' not found.");
    }

    // --- 4. BAR CHART LOGIC (Correctly placed inside DOMContentLoaded) ---
    // If woodChartData is defined via a separate PUG embedded script, 
    // it must be accessed globally, or the data passed via another global variable.
    
    // **Assumption:** We are now accessing the data from the PUG embedded script
    // that runs *before* this file. The function definition needs to be here.
    
    // The data call for the bar chart is likely still needed in your PUG file:
    // script.
    //   window.woodChartData = !{JSON.stringify(woodChartData)};

    // The function definition is placed here:
    function drawWoodStockChart(data) {
        const ctx = document.getElementById('woodStockBarChart');
        if (!ctx) {
            console.error("Canvas element #woodStockBarChart not found.");
            return;
        }

        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Stock Units',
                    data: data.quantities,
                    backgroundColor: 'rgba(139, 69, 19, 0.7)', 
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Units Available' },
                        ticks: { callback: function(value) { if (value % 1 === 0) return value; } }
                    },
                    x: { grid: { display: false } }
                },
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Wood Stock Availability' }
                }
            }
        });
    }

    // The call to draw the bar chart
    if (typeof window.woodChartData !== 'undefined') {
        drawWoodStockChart(window.woodChartData);
    } else {
        console.error("Bar Chart data (window.woodChartData) not available.");
    }

});




// document.addEventListener('DOMContentLoaded', function() {
    
//     // Check if the global data object exists
//     if (typeof window.chartData === 'undefined') {
//         console.error("Chart data not injected from server.");
//         return;
//     }
    
//     // Read the data from the global window object
//     const hardwoodCost = window.chartData.hardwood;
//     const softwoodCost = window.chartData.softwood;
//     const timberCost = window.chartData.timber;
//     const polesCost = window.chartData.poles;

//     const canvas = document.getElementById('expensesPieChart');
//     if (!canvas) {
//         console.error("Canvas element 'expensesPieChart' not found.");
//         return;
//     }
    
//     const ctx = canvas.getContext('2d');

//     const expensesPieChart = new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: ['Hardwood', 'Softwood', 'Timber', 'Poles'],
//             datasets: [{
//                 label: 'Expenses (UGX)',
//                 data: [hardwoodCost, softwoodCost, timberCost, polesCost],
//                 backgroundColor: [
//                     'rgba(218, 206, 32, 0.8)',
//                     'rgba(231, 29, 29, 0.8)',
//                     'rgba(42, 171, 240, 0.8)',
//                     'rgba(54, 217, 54, 0.8)'
//                 ],
//                 borderColor: [
//                     'rgba(51, 186, 24, 1)',
//                     'rgba(18, 140, 222, 1)',
//                     'rgba(242, 78, 37, 1)',
//                     'rgba(217, 217, 23, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             // ... (rest of the options) ...
//         }
//     });
// });

// // /js/Charts.js


// // // Line graph
// // document.addEventListener('DOMContentLoaded', function() {
    
// //     // ... (Data Check and Pie Chart Code remain the same) ...

// //     // --- LINE CHART LOGIC (Updated for Weekly Sales) ---
// //     const lineCanvas = document.getElementById('stockLineChart');
// //     if (lineCanvas) {
// //         const lineCtx = lineCanvas.getContext('2d');
        
// //         new Chart(lineCtx, {
// //             type: 'line',
// //             data: {
// //                 labels: window.chartData.revenueLabels, // Uses the new weekly labels
// //                 datasets: [
// //                     {
// //                         label: 'Wood Revenue',
// //                         data: window.chartData.woodRevenueData, 
// //                         borderColor: 'rgba(54, 162, 235, 1)', 
// //                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
// //                         fill: false,
// //                         tension: 0.1
// //                     },
// //                     {
// //                         label: 'Furniture Revenue',
// //                         data: window.chartData.furnitureRevenueData, 
// //                         borderColor: 'rgba(255, 99, 132, 1)', 
// //                         backgroundColor: 'rgba(255, 99, 132, 0.2)',
// //                         fill: false,
// //                         tension: 0.1
// //                     }
// //                 ]
// //             },
// //             options: {
// //                 responsive: true,
// //                 scales: {
// //                     y: {
// //                         beginAtZero: true,
// //                         title: {
// //                             display: true,
// //                             text: 'Revenue (UGX)'
// //                         }
// //                     },
// //                     x: {
// //                         title: {
// //                             display: true,
// //                             text: 'Week' // Changed X-axis label from 'Month' to 'Week'
// //                         }
// //                     }
// //                 }
// //             }
// //         });
// //     }

// // });

// //Bar graph
// // Get data passed from Express. The !{JSON.stringify(...)} syntax 
// // is Pug's way of safely embedding a JavaScript object from the server.
// const woodChartData = !{JSON.stringify(woodChartData)};

// // Call the function to draw the wood chart
// drawWoodStockChart(woodChartData);
  
// // Define the chart drawing function
// function drawWoodStockChart(data) {
//     // 1. Get the canvas context using its ID
//     const ctx = document.getElementById('woodStockBarChart');

//     // Basic check to ensure the canvas element exists
//     if (!ctx) {
//         console.error("Canvas element #woodStockBarChart not found.");
//         return;
//     }

//     // 2. Create a new Chart instance
//     new Chart(ctx.getContext('2d'), {
//         // --- CHART TYPE ---
//         type: 'bar',

//         // --- DATA CONFIGURATION ---
//         data: {
//             // These are your wood types (Softwood, Hardwood, etc.)
//             labels: data.labels,
//             datasets: [{
//                 label: 'Stock Units',
//                 data: data.quantities, // These are the aggregated quantities
                
//                 // Styling the bars (using a wood-like brown color)
//                 backgroundColor: 'rgba(139, 69, 19, 0.7)', 
//                 borderColor: 'rgba(139, 69, 19, 1)',
//                 borderWidth: 1
//             }]
//         },

//         // --- OPTIONS CONFIGURATION ---
//         options: {
//             responsive: true,
//             maintainAspectRatio: false, // Allows you to control the canvas size via CSS or attributes
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     title: {
//                         display: true,
//                         text: 'Units Available'
//                     },
//                     // Ensure quantities are displayed as integers (no decimals)
//                     ticks: {
//                         callback: function(value) {
//                             if (value % 1 === 0) {
//                                 return value;
//                             }
//                         }
//                     }
//                 },
//                 x: {
//                     grid: {
//                         display: false // Hide vertical grid lines
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false // Hide the dataset label legend
//                 },
//                 title: {
//                     display: true,
//                     text: 'Wood Stock Availability'
//                 }
//             }
//         }
//     });
// }