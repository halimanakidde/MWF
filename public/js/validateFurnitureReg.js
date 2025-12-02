document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("furnitureForm");

    form.addEventListener("submit", (e) => {
        let valid = true;

        // Get values
        const name = document.getElementById("itemName").value.trim();
        const category = document.getElementById("category").value;
        const material = document.getElementById("material").value;
        const quantity = document.getElementById("quantity").value.trim();
        const price = document.getElementById("price").value.trim();
        const date = document.getElementById("productionDate").value;

        // Clear old errors
        document.querySelectorAll(".error").forEach(div => div.innerText = "");

        // Furniture Name
        if (!name) {
            document.getElementById("itemNameError").innerText = "Furniture name is required.";
            valid = false;
        }

        // Category
        if (!category) {
            document.getElementById("categoryError").innerText = "Please select a furniture category.";
            valid = false;
        }

        // Material
        if (!material) {
            document.getElementById("materialError").innerText = "Please select a material.";
            valid = false;
        }

        // Quantity
        if (!quantity || quantity <= 0) {
            document.getElementById("quantityError").innerText = "Enter a valid quantity (minimum 1).";
            valid = false;
        }

        // Price
        if (!price || price <= 0) {
            document.getElementById("priceError").innerText = "Enter a valid price (greater than 0).";
            valid = false;
        }

        // Production Date
        if (!date) {
            document.getElementById("dateError").innerText = "Please select a production date.";
            valid = false;
        }

        // Prevent form submission if invalid
        if (!valid) e.preventDefault();
    });
});
