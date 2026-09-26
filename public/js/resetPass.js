document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("resetForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errorCon = document.getElementById("error-conn")
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

form.addEventListener("submit", function (e) {
  let isValid = true;

  // Reset errors
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  password.classList.remove("is-invalid");
  confirmPassword.classList.remove("is-invalid");

  // ✅ Password required
  if (!password.value) {
    passwordError.textContent = "Password is required";
    password.classList.add("is-invalid");
    isValid = false;
  }
  // ✅ Password length
  else if (password.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    password.classList.add("is-invalid");
    isValid = false;
  }

  // ✅ Confirm password required
  if (!confirmPassword.value) {
    confirmPasswordError.textContent = "Confirm Password is required";
    confirmPassword.classList.add("is-invalid");
    isValid = false;
  }
  // ✅ Match check
  else if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "Passwords do not match";
    confirmPassword.classList.add("is-invalid");
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();
  }
});

if(password){
    password.addEventListener("input", () =>{
        password.classList.remove("is-invalid");
        passwordError.textContent = ""
        if(errorCon) errorCon.innerText = ""
    })
}
if(confirmPassword){
    confirmPassword.addEventListener("input", () =>{
        confirmPassword.classList.remove("is-invalid");
        confirmPasswordError.textContent = ""
        if(errorCon) errorCon.innerText = ""
    })
}

});