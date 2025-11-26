// =====================
// REPORT ROUTES (COMMONJS)
// =====================

const express = require("express");
const WoodSale = require("../models/wood_sale.js");
const FurnitureSale = require("../models/furniture_sale.js");
const Registration = require("../models/Registration.js");

const router = express.Router();

// =====================
// 1️⃣ MANAGER – ALL SALES (WOOD + FURNITURE)
// =====================
router.get("/manager/all", async (req, res) => {
    try {
        const woodSales = await WoodSale.find().populate("salesAgent");
        const furnitureSales = await FurnitureSale.find().populate("salesAgent");

        // merge all sales
        const combined = [...woodSales, ...furnitureSales];

        const grouped = {};

        combined.forEach((sale) => {
            const agentName = sale.salesAgent ? sale.salesAgent.fullname : "Unknown Agent";

            if (!grouped[agentName]) grouped[agentName] = [];

            grouped[agentName].push({
                category: sale.productType,
                product: sale.productName,
                price: sale.unitprice,
                quantity: sale.quantity,
                total: sale.totalprice,
                date: sale.date
            });
        });

        res.render("manager_sales_by_agent", { grouped });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading combined sales report");
    }
});


// =====================
// 2️⃣ MANAGER – SUMMARY REPORT (WOOD + FURNITURE)
// =====================
router.get("/manager/summary", async (req, res) => {
    try {
        const woodSales = await WoodSale.find().populate("salesAgent");
        const furnitureSales = await FurnitureSale.find().populate("salesAgent");

        const combined = [...woodSales, ...furnitureSales];

        const summary = {};

        combined.forEach((s) => {
            const agent = s.salesAgent ? s.salesAgent.fullname : "Unknown Agent";

            if (!summary[agent]) {
                summary[agent] = {
                    revenue: 0,
                    units: 0,
                    salesCount: 0
                };
            }

            summary[agent].revenue += s.totalprice || 0;
            summary[agent].units += s.quantity || 0;
            summary[agent].salesCount += 1;
        });

        res.render("manager_sales_summary", { summary });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading summary");
    }
});


// =====================
// 3️⃣ AGENT – VIEW OWN SALES (WOOD + FURNITURE)
// =====================
router.get("/agent/:id", async (req, res) => {
    try {
        const agentId = req.params.id;

        const woodSales = await WoodSale.find({ salesAgent: agentId });
        const furnitureSales = await FurnitureSale.find({ salesAgent: agentId });

        const agent = await Registration.findById(agentId);

        const sales = [
            ...woodSales.map((s) => ({ ...s.toObject(), type: "Wood" })),
            ...furnitureSales.map((s) => ({ ...s.toObject(), type: "Furniture" }))
        ];

        res.render("reports/agent_sales", {
            agent,
            sales,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading agent sales");
    }
});



module.exports = router;
