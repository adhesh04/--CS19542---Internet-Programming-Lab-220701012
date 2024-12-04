document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission for login
  const loginForm = document.getElementById("loginForm"); // Form ID from adminlogin.html

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Get the form data
      const formData = new FormData(loginForm);
      const username = formData.get("username");
      const password = formData.get("password");

      // Perform AJAX request to send the form data to the server
      fetch("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to the admin main page if login is successful
            window.location.href = "adminmain.html";
          } else {
            // Handle login failure
            alert("Invalid login credentials. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });
  }

  // Handle form submission for signup (if needed)
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Collect the form data (if required for backend integration)
      const formData = new FormData(signupForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      // Perform AJAX request to send signup data to the server (if applicable)
      fetch("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Invalid login credentials");
          }
        })
        .then((data) => {
          if (data.redirect) {
            window.location.href = data.redirect;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Login failed. Please check your credentials.");
        });
    });
  }
});
