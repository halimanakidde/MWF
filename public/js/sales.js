// function calculateTotalCost() {
//   const qty = parseFloat(document.getElementById('quantity').value) || 0;
//   const price = parseFloat(document.getElementById('unitprice').value) || 0;

//   const cost = qty * price;
//   const transport = cost * 0.05;
//   const total = cost + transport;

//   document.getElementById('totalcost').value =
//     total.toLocaleString() + " UGX";
// }

// document.addEventListener('input', calculateTotalCost);



  function calculateTotalCost() {
    const qty = Number(document.getElementById("quantity").value);
    const unit = Number(document.getElementById("unitprice").value);
    const transport = document.getElementById("transportprovided")?.value;

    let total = qty * unit;

    if (transport === "Yes") {
      total = total * 1.05; // add 5%
    }

    document.getElementById("totalcost").value = 
      isNaN(total) ? "" : total.toFixed(2);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const qtyInput = document.getElementById("quantity");
    const unitInput = document.getElementById("unitprice");
    const transportInput = document.getElementById("transportprovided");

    if (qtyInput) qtyInput.addEventListener("input", calculateTotalCost);
    if (unitInput) unitInput.addEventListener("input", calculateTotalCost);
    if (transportInput) transportInput.addEventListener("change", calculateTotalCost);
  });
