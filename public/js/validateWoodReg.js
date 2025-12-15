document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("woodForm");

    form.addEventListener("submit", (e) => {
        let errors = [];

        const woodName = document.getElementById("woodName").value.trim();
        const woodType = document.getElementById("woodType").value.trim();
        const woodcolor = document.getElementById("woodcolor").value.trim();
        const measurements = document.getElementById("measurements").value.trim();
        const quality = document.getElementById("quality").value.trim();
        const date = document.getElementById("date").value.trim();
        const quantity = document.getElementById("quantity").value.trim();
        const supplier = document.getElementById("supplier").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const price = document.getElementById("price").value.trim();document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("woodForm");

    // Input elements
    const woodName = document.getElementById("woodName");
    const woodType = document.getElementById("woodType");
    const woodColor = document.getElementById("woodcolor");
    const measurements = document.getElementById("measurements");
    const quality = document.getElementById("quality");
    const date = document.getElementById("date");
    const quantity = document.getElementById("quantity");
    const supplier = document.getElementById("supplier");
    const contact = document.getElementById("contact");
    const price = document.getElementById("price");
    const locationInput = document.getElementById("location");

    // Error message elements
    const errors = {
        woodNameError: document.getElementById("woodNameError"),
        woodTypeError: document.getElementById("woodTypeError"),
        woodColorError: document.getElementById("woodColorError"),
        measurementsError: document.getElementById("measurementsError"),
        qualityError: document.getElementById("qualityError"),
        dateError: document.getElementById("dateError"),
        quantityError: document.getElementById("quantityError"),
        supplierError: document.getElementById("supplierError"),
        contactError: document.getElementById("contactError"),
        priceError: document.getElementById("priceError"),
        locationError: document.getElementById("locationError"),
    };

    // Helper function to show error
    function showError(fieldError, message) {
        fieldError.textContent = message;
    }

    // Helper function to clear errors
    function clearErrors() {
        Object.values(errors).forEach(err => err.textContent = "");
    }

    form.addEventListener("submit", function (e) {
        let isValid = true;
        clearErrors();

        // Validation rules
        if (woodName.value === "") {
            showError(errors.woodNameError, "Please select a wood name.");
            isValid = false;
        }

        if (woodType.value === "") {
            showError(errors.woodTypeError, "Please select the wood type.");
            isValid = false;
        }

        if (woodColor.value.trim() === "") {
            showError(errors.woodColorError, "Enter the wood color.");
            isValid = false;
        }

        if (measurements.value === "") {
            showError(errors.measurementsError, "Select a measurement.");
            isValid = false;
        }

        if (quality.value === "") {
            showError(errors.qualityError, "Select a quality option.");
            isValid = false;
        }

        if (date.value === "") {
            showError(errors.dateError, "Pick a date.");
            isValid = false;
        }

        if (quantity.value === "" || quantity.value <= 0) {
            showError(errors.quantityError, "Quantity must be at least 1.");
            isValid = false;
        }

        if (supplier.value.trim() === "") {
            showError(errors.supplierError, "Enter the supplier name.");
            isValid = false;
        }

        if (contact.value.trim() === "" || contact.value.length < 10) {
            showError(errors.contactError, "Enter a valid contact number (at least 10 digits).");
            isValid = false;
        }

        if (price.value === "" || price.value <= 0) {
            showError(errors.priceError, "Enter a valid price.");
            isValid = false;
        }

        if (locationInput.value.trim() === "") {
            showError(errors.locationError, "Enter the storage location.");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Stop form submission
        }
    });
});

        const location = document.getElementById("location").value.trim();

        //validation

        if (!woodName) errors.push("Please select wood name.");
        if (!woodType) errors.push("Please select wood type.");
        if (woodcolor === "") errors.push("Wood color is required.");
        if (!measurements) errors.push("Please choose measurements.");
        if (!quality) errors.push("Select wood quality.");
        if (!date) errors.push("Date is required.");
        
        if (!quantity || quantity <= 0) {
            errors.push("Enter a valid quantity.");
        }

        if (supplier === "") errors.push("Supplier name is required.");

        if (!contact || contact.length < 10) {
            errors.push("Enter a valid contact number (at least 10 digits).");
        }

        if (!price || price <= 0) {
            errors.push("Enter a valid price per piece.");
        }

        if (location === "") errors.push("Storage location is required.");

        // show the errors
        if (errors.length > 0) {
            e.preventDefault();
            alert(errors.join("\n"));
        }
    });
});


 document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('woodForm');
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
            // This is a simple validation check. For real-world use, you would integrate
            // this with your external validation logic (e.g., /js/validateWoodReg.js)
            const currentFields = steps[currentStep].querySelectorAll('[required]');
            let isValid = true;
            
            currentFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.style.borderColor = 'red'; // Simple visual cue
                } else {
                    field.style.borderColor = ''; // Clear cue
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