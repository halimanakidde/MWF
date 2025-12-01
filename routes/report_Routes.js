const express = require("express");
const WoodSale = require("../models/wood_sale.js");
const FurnitureSale = require("../models/furniture_sale.js");
const Registration = require("../models/Registration.js");
const PDFDocument = require("pdfkit");

const router = express.Router();

// ROUTE FOR PDF DOWNLOAD OF SALES REPORT
router.get("/download/sales-pdf", async (req, res) => {
  try {
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=sales_report.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Combined Sales Report", { underline: true });
    doc.moveDown();

    // Loading sales from sales models
    const sources = [
      WoodSale.find().populate("salesAgent"),
      FurnitureSale.find().populate("salesAgent"),
    ];

    // Running all queries at the same time
    const results = await Promise.all(sources);

    // 3. Combine everything
    let allSales = results.flat();

    // 4. Sort newest first
    allSales.sort((a, b) => b.createdAt - a.createdAt);

    // 5. Write each entry to PDF
    allSales.forEach(s => {
      doc.fontSize(12).text(`Agent: ${s.salesAgent?.fullname || "N/A"}`);
      doc.text(`Product: ${s.productName || s.product || "N/A"}`);
      doc.text(`Unit Price: ${s.unitprice || 0}`);
      doc.text(`Quantity: ${s.quantity || 0}`);
      doc.text(`Total: ${s.totalprice || 0}`);
      doc.text(`Date: ${s.date ? s.date.toLocaleDateString() : "N/A"}`);
      doc.text(`Sale Type: ${s.constructor.modelName}`); // shows which model it came from
      doc.moveDown();
    });

    doc.end();

    doc.on("finish", () => res.end());
    doc.on("error", (error) => {
      console.error(error);
      res.status(500).send("PDF generation error");
    });

  } catch (error) {
    console.log("PDF ERROR:", error.message);
    res.status(500).send("Could not download PDF");
  }
});




module.exports = router;
