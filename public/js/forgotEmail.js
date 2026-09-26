document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("forgotForm");
  if (!form) return;

  const email = document.getElementById("forgotEmail");
  const emailError = document.getElementById("forgotEmailError");
  const errorCon = document.querySelector(".error-container");

  form.addEventListener("submit", function (e) {

    let isValid = true;

    emailError.innerText = "";
    email.classList.remove("is-invalid");

    if (!email.value.trim()) {
      emailError.innerText = "Email is required";
      email.classList.add("is-invalid");
      isValid = false;
    } 
    else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      if (errorCon) errorCon.innerText = "";
      emailError.innerText = "Enter a valid email address";
      email.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    }

  });

  // Real-time clearing (same as login)
  if (email) {
    email.addEventListener("input", () => {
      email.classList.remove("is-invalid");
      emailError.innerText = "";
      if (errorCon) errorCon.innerText = "";
    });
  }

});