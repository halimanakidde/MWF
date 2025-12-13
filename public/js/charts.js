document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof window.chartData === 'undefined') {
        console.error("Chart data (window.chartData) not fully injected from server.");
       
    }

   
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
            options: {  }
        });
    } else {
        console.warn("Pie Chart canvas 'expensesPieChart' not found.");
    }
    
});