document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", (e) => {
        const fullName = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("userRole").value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullName) {
            alert("Please enter your full name.");
            e.preventDefault();
            return;
        }

        if (!email || !emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            e.preventDefault();
            return;
        }

        if (!password || password.length < 6) {
            alert("Password must be at least 6 characters long.");
            e.preventDefault();
            return;
        }

        if (!role) {
            alert("Please select a role.");
            e.preventDefault();
            return;
        }
    });
});
