  function calculateTotalCost() {
    const qty = Number(document.getElementById("quantity").value);
    const unit = Number(document.getElementById("unitprice").value);
    const transport = document.getElementById("transportprovided")?.value;

    let total = qty * unit;

    if (transport === "Yes") {
      total = total * 1.05; // add 5%
    }

    document.getElementById("totalcost").value = 
      isNaN(total) ? "" : total.toFixed(2);//converts the number to a string, keeping only two digits after the decimal point
  }

  document.addEventListener("DOMContentLoaded", () => {
    const qtyInput = document.getElementById("quantity");
    const unitInput = document.getElementById("unitprice");
    const transportInput = document.getElementById("transportprovided");

    if (qtyInput) qtyInput.addEventListener("input", calculateTotalCost);
    if (unitInput) unitInput.addEventListener("input", calculateTotalCost);
    if (transportInput) transportInput.addEventListener("change", calculateTotalCost);
  });

 
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('salesform');
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
            // Simple validation: checks if all required fields in the current step have values
            const currentFields = steps[currentStep].querySelectorAll('[required]');
            let isValid = true;
            
            currentFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.style.borderColor = 'red'; // Simple visual cue
                } else {
                    field.style.borderColor = ''; // Clear visual cue
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
                    alert('Please fill out all required fields in this step before proceeding.');
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

    
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('furnitureform');
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
            // Check required fields in the current step
            const currentFields = steps[currentStep].querySelectorAll('[required]');
            let isValid = true;
            
            currentFields.forEach(field => {
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
                    alert('Please fill out all required fields in this step before proceeding.');
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
