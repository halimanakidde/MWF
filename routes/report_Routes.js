import express from "express";
import Sale from "../models/sales.js";
import User from "../models/user.js";
import Product from "../models/product.js";

const router = express.Router();

//Agent Records a sale
router.post("/", async (req, res) => {
    try {
        const { agentId, productId, quantity } = req.body;

        const sale = await Sale.create({
            agent: agentId,
            product: productId,
            quantity
        });

        res.status(201).json({ message: "Sale recorded!", sale });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to record sale" });
    }
});

//Agent Views Their Own Sales
router.get("/agentDashboard/:id", async (req, res) => {
    try {
        const agentId = req.params.id;

        const sales = await Sale.find({ agent: agentId })
            .populate("product")
            .populate("agent");

        const agent = sales[0]?.agent || await User.findById(agentId);

        res.render("salesDashboard", {
            currentUser: agent,
            sales
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to load agent dashboard");
    }
});


//Manager Views All Sales Grouped by Agent
router.get("/manager/all", async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate("agent")
            .populate("product");

        const grouped = {};

        sales.forEach(sale => {
            const agentName = sale.agent.name;

            if (!grouped[agentName]) grouped[agentName] = [];

            grouped[agentName].push({
                product: sale.product.name,
                price: sale.product.price,
                quantity: sale.quantity,
                total: sale.product.price * sale.quantity,
                date: sale.date
            });
        });

        res.render("manager_sales_by_agent", { grouped });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading sales by agent");
    }
});


//Manager Gets Summary Totals
router.get("/manager/summary", async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate("agent")
            .populate("product");

        const summary = {};

        sales.forEach(s => {
            const agent = s.agent.name;
            const total = s.product.price * s.quantity;

            if (!summary[agent]) {
                summary[agent] = {
                    revenue: 0,
                    units: 0,
                    salesCount: 0
                };
            }

            summary[agent].revenue += total;
            summary[agent].units += s.quantity;
            summary[agent].salesCount += 1;
        });

        res.render("manager_sales_summary", { summary });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading summary");
    }
});




export default router;


