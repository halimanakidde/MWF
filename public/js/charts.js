(function(){
  let rawData = window.salesData || null;

  async function fetchData() {
    if (rawData) return rawData;
    try {
      const res = await fetch('/api/sales-summary');
      if (!res.ok) throw new Error('Failed to fetch sales data');
      const json = await res.json();
      return json;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  function transformForApex(data) {
    data.sort((a,b) => new Date(a.date) - new Date(b.date));
    const categories = data.map(d => d.date);
    const amounts = data.map(d => Number(d.amount) || 0);
    return { categories, amounts };
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(value);
  }

  async function render() {
    const data = await fetchData();
    const { categories, amounts } = transformForApex(data);

    const total = amounts.reduce((s, n) => s + n, 0);
    const avg = amounts.length ? Math.round(total / amounts.length) : 0;
    const summaryEl = document.getElementById('salesSummary');
    if (summaryEl) {
      summaryEl.innerHTML = `<strong>Total:</strong> ${formatCurrency(total)} &nbsp;·&nbsp; <strong>Avg/day:</strong> ${formatCurrency(avg)}`;
    }

    const options = {
      chart: {
        type: 'line',
        height: 320,
        toolbar: { show: true },
        zoom: { enabled: false },
        animations: { enabled: true, easing: 'easeinout', speed: 400 }
      },
      series: [{
        name: 'Sales',
        data: amounts
      }],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 4, hover: { size: 7 } },
      xaxis: {
        categories: categories,
        type: 'datetime',
        labels: { rotate: -45, datetimeUTC: false, format: 'dd MMM' }
      },
      yaxis: {
        labels: { formatter: val => Math.round(val).toLocaleString() },
        tooltip: { enabled: true }
      },
      tooltip: {
        shared: false,
        x: { format: 'dd MMM yyyy' },
        y: { formatter: val => formatCurrency(val) }
      },
      grid: { borderColor: '#eee', strokeDashArray: 4 },
      colors: ['#007bff'],
      responsive: [
        { breakpoint: 768, options: { chart: { height: 260 }, xaxis: { labels: { rotate: -30 } } } }
      ]
    };

    const el = document.querySelector('#salesChart');
    if (!el) return;

    if (el._apexChart) {
      try { el._apexChart.destroy(); } catch(e) {}
    }

    const chart = new ApexCharts(el, options);
    el._apexChart = chart;
    chart.render();
  }

  document.addEventListener('DOMContentLoaded', render);
})();
