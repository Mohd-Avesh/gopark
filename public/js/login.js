document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  const emailError = document.getElementById("loginEmailError");
  const passwordError = document.getElementById("loginPasswordError");
  const errorCon = document.querySelector(".error-container");

  loginForm.addEventListener("submit", function (e) {

    let isValid = true;

    // Reset previous state
    emailError.innerText = "";
    passwordError.innerText = "";

    email.classList.remove("is-invalid");
    password.classList.remove("is-invalid");

    // Email validation
    if (!email.value.trim()) {
      emailError.innerText = "Email is required";
      email.classList.add("is-invalid");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      errorCon.innerText = ""
      emailError.innerText = "Enter a valid email address";
      email.classList.add("is-invalid");
      isValid = false;
    }

    // Password validation
    if (!password.value.trim()) {
      passwordError.innerText = "Password is required";
      password.classList.add("is-invalid");
      isValid = false;
    } else if (password.value.length < 6) {
      passwordError.innerText = "Password must be at least 6 characters";
      password.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    }

  });

  // Clear errors while typing
  if (email) {
    email.addEventListener("input", () => {
      email.classList.remove("is-invalid");
      emailError.innerText = "";
      if (errorCon) {
        errorCon.innerText = "";
      }
    });
  }

  if (password) {
    password.addEventListener("input", () => {
      password.classList.remove("is-invalid");
      passwordError.innerText = "";
    });
  }

});