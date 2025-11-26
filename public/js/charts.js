// document.addEventListener('DOMContentLoaded', function() {
    
//     // Safety check to ensure the canvas element exists before creating the chart
//     const canvas = document.getElementById('expensesPieChart');
//     if (!canvas) {
//         console.error("Canvas element 'expensesPieChart' not found.");
//         return;
//     }
    
//     // Assuming these variables are correctly passed from your Pug template:
//     // (Pug should render these as plain numbers in the HTML output)
//     const hardwoodCost = totalHardwood.totalcost || 0;
//     const softwoodCost = totalSoftwood.totalcost || 0;
//     const timberCost = totalTimber.totalcost || 0;
//     const polesCost = totalPoles.totalcost || 0;

//     const ctx = canvas.getContext('2d');

//     const expensesPieChart = new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: ['Hardwood', 'Softwood', 'Timber', 'Poles'],
//             datasets: [{
//                 label: 'Expenses (UGX)',
//                 data: [hardwoodCost, softwoodCost, timberCost, polesCost],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.8)',  // Red for Hardwood
//                     'rgba(54, 162, 235, 0.8)', // Blue for Softwood
//                     'rgba(255, 206, 86, 0.8)', // Yellow for Timber
//                     'rgba(75, 192, 192, 0.8)'  // Green for Poles
//                 ],
//                 // ... (rest of the chart configuration) ...
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false, 
//             plugins: {
//                 // ... (legend, title, tooltip callbacks for UGX formatting) ...
//             }
//         }
//     });
// });

// /js/Charts.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Check if the global data object exists
    if (typeof window.chartData === 'undefined') {
        console.error("Chart data not injected from server.");
        return;
    }
    
    // Read the data from the global window object
    const hardwoodCost = window.chartData.hardwood;
    const softwoodCost = window.chartData.softwood;
    const timberCost = window.chartData.timber;
    const polesCost = window.chartData.poles;

    const canvas = document.getElementById('expensesPieChart');
    if (!canvas) {
        console.error("Canvas element 'expensesPieChart' not found.");
        return;
    }
    
    const ctx = canvas.getContext('2d');

    const expensesPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Hardwood', 'Softwood', 'Timber', 'Poles'],
            datasets: [{
                label: 'Expenses (UGX)',
                data: [hardwoodCost, softwoodCost, timberCost, polesCost],
                backgroundColor: [
                    'rgba(228, 14, 61, 0.8)',
                    'rgba(15, 237, 74, 0.8)',
                    'rgba(247, 255, 86, 0.8)',
                    'rgba(89, 18, 175, 0.8)'
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
        options: {
            // ... (rest of the options) ...
        }
    });
});

// /js/Charts.js

// /js/Charts.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ... (Data Check and Pie Chart Code remain the same) ...

    // --- LINE CHART LOGIC (Updated for Weekly Sales) ---
    const lineCanvas = document.getElementById('stockLineChart');
    if (lineCanvas) {
        const lineCtx = lineCanvas.getContext('2d');
        
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: window.chartData.revenueLabels, // Uses the new weekly labels
                datasets: [
                    {
                        label: 'Wood Revenue',
                        data: window.chartData.woodRevenueData, 
                        borderColor: 'rgba(54, 162, 235, 1)', 
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'Furniture Revenue',
                        data: window.chartData.furnitureRevenueData, 
                        borderColor: 'rgba(255, 99, 132, 1)', 
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Revenue (UGX)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Week' // Changed X-axis label from 'Month' to 'Week'
                        }
                    }
                }
            }
        });
    }

}); // End of DOMContentLoaded