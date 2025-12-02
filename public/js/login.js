document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault(); 

      let username=document.getElementById("username").value.trim();
      let password = document.getElementById("password").value.trim();

      // Simple validation
      if (!username || !password) {
        alert("Please fill in all fields.");
        return;
      }

      // If all validations pass
      alert("Login successful!");
      this.submit(); // submit form if everything is valid
    });
    
    
