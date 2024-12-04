document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const hamburgerBtn = document.querySelector("#hamburger-btn");
  const closeMenuBtn = document.querySelector("#close-menu-btn");

  // Toggle mobile menu on hamburger button click
  hamburgerBtn.addEventListener("click", () =>
    header.classList.toggle("show-mobile-menu")
  );

  // Close mobile menu on close button click
  closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());

  // Handle login button click

  const loginBtn = document.querySelector(".loginBtn");
  loginBtn.addEventListener("click", () => {
    wrapper.classList.add("active");
    message.textContent = ""; // Clear any previous messages
  });

  // Handle form submission
  const loginForm = document.getElementById("loginForm"); // Assuming your form has an ID of "loginForm"
  if (loginForm) {
    // Check if the form exists on the page
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

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
          // Redirect to main.html regardless of login success or failure
          window.location.href = "main.html";
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });
  }
});
