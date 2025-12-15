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

document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('furnitureForm');
        const steps = Array.from(document.querySelectorAll('.form-step'));
        const progressBarSpans = document.querySelectorAll('#progress-bar span');
        let currentStep = 0;

        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.style.display = index === stepIndex ? 'block' : 'none';
                progressBarSpans[index].classList.toggle('active', index <= stepIndex);
            });
            currentStep = stepIndex;
        }

        function validateCurrentStep() {
            // This validation is crucial. You must ensure this integrates with 
            // your external validation script (validateFurnitureReg.js)
            const currentFields = steps[currentStep].querySelectorAll('[required]');
            let isValid = true;
            
            currentFields.forEach(field => {
                // Simplified check: ensures field has a value (works for text/select/date/number)
                if (!field.value) {
                    isValid = false;
                    field.style.borderColor = 'red'; 
                } else {
                    field.style.borderColor = '';
                }
            });
            return isValid;
        }

        // Handle Next button click
        form.querySelectorAll('.next-btn').forEach(button => {
            button.addEventListener('click', () => {
                if (validateCurrentStep() && currentStep < steps.length - 1) {
                    showStep(currentStep + 1);
                } else if (!validateCurrentStep()) {
                    alert('Please fill out all required fields in this step.');
                }
            });
        });

        // Handle Previous button click
        form.querySelectorAll('.prev-btn').forEach(button => {
            button.addEventListener('click', () => {
                if (currentStep > 0) {
                    showStep(currentStep - 1);
                }
            });
        });

        // Ensure only the first step is shown on load
        showStep(0);
    });
