document.addEventListener("DOMContentLoaded", function () {

  // ===============================
  // REGISTER FORM VALIDATION
  // ===============================
  const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {

    

    const errorCon = document.querySelector(".error-container");

    registerForm.addEventListener("submit", function (e) {

      let isValid = true;

      // Clear old errors
      document.querySelectorAll(".error-message")
        .forEach(el => el.textContent = "");

      document.querySelectorAll(".form-control")
        .forEach(el => el.classList.remove("is-invalid"));

      // Name
      if (name && name.value.trim().length < 3) {
        document.getElementById("nameError").textContent =
          "Name must be at least 3 characters";
        name.classList.add("is-invalid");
        isValid = false;
      }

      // Email
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (email && !emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent =
          "Enter a valid email address";
        email.classList.add("is-invalid");
        isValid = false;
      }

      // Phone
      const phonePattern = /^[6-9]\d{9}$/;
      if (phone && !phonePattern.test(phone.value.trim())) {
        document.getElementById("phoneError").textContent =
          "Enter valid 10-digit mobile number";
        phone.classList.add("is-invalid");
        isValid = false;
      }

      // Password
      if (password && password.value.length < 6) {
        document.getElementById("passwordError").textContent =
          "Password must be at least 6 characters";
        password.classList.add("is-invalid");
        isValid = false;
      }

      // Confirm Password
      if (
        confirmPassword &&
        (confirmPassword.value !== password.value ||
          confirmPassword.value === "")
      ) {
        document.getElementById("confirmPasswordError").textContent =
          "Passwords do not match";
        confirmPassword.classList.add("is-invalid");
        isValid = false;
      }

      if (!isValid) e.preventDefault();
    });

    // ===============================
    // CLEAR SERVER ERROR MESSAGE
    // ===============================
    if (email) {
      email.addEventListener("input", () => {
        if (errorCon) errorCon.innerText = "";
      });
    }

    if (phone) {
      phone.addEventListener("input", () => {
        if (errorCon) errorCon.innerText = "";
      });
    }

  }

  // REMOVE ERROR ON TYPING

const fields = [
  { input: name, errorId: "nameError" },
  { input: email, errorId: "emailError" },
  { input: phone, errorId: "phoneError" },
  { input: password, errorId: "passwordError" },
  { input: confirmPassword, errorId: "confirmPasswordError" }
];

fields.forEach(field => {
  if (field.input) {
    field.input.addEventListener("input", () => {
      field.input.classList.remove("is-invalid");
      const errorEl = document.getElementById(field.errorId);
      if (errorEl) errorEl.textContent = "";
    });
  }
});


  // ===============================
  // RESEND OTP COOLDOWN (UNCHANGED)
  // ===============================

  const resendBtn = document.getElementById("resendOtp");
  const timerSpan = document.getElementById("timer");

  if (!resendBtn || !timerSpan) return;

  const COOLDOWN = 30;
  const storageKey = "otpCooldownEnd";
  let interval;

  const updateTimer = () => {
    const cooldownEnd = parseInt(localStorage.getItem(storageKey));
    const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000);

    if (remaining > 0) {
      timerSpan.innerText = `(${remaining}s)`;
      resendBtn.classList.add("disabled");
      resendBtn.style.pointerEvents = "none";
    } else {
      clearInterval(interval);
      timerSpan.innerText = "";
      resendBtn.classList.remove("disabled");
      resendBtn.style.pointerEvents = "auto";
      localStorage.removeItem(storageKey);
    }
  };

  const startCooldown = () => {
    const cooldownEnd = Date.now() + COOLDOWN * 1000;
    localStorage.setItem(storageKey, cooldownEnd);

    updateTimer(); // immediate UI update
    interval = setInterval(updateTimer, 1000);
  };

  // 🔥 MAIN LOGIC
  const storedTime = localStorage.getItem(storageKey);

  if (!storedTime) {
    // 👉 FIRST TIME PAGE LOAD → start countdown
    startCooldown();
  } else {
    const remaining = Math.ceil((parseInt(storedTime) - Date.now()) / 1000);

    if (remaining > 0) {
      // 👉 CONTINUE existing timer (after refresh)
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else {
      // 👉 EXPIRED → enable button
      localStorage.removeItem(storageKey);
      resendBtn.classList.remove("disabled");
      resendBtn.style.pointerEvents = "auto";
    }
  }

  // 🔥 CLICK HANDLER
  resendBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // prevent clicking during cooldown
    if (localStorage.getItem(storageKey)) return;

    startCooldown();

    // call backend
    fetch(resendBtn.getAttribute("href"))
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("OTP resent");
        }
      })
      .catch(err => console.error(err));
  });

});