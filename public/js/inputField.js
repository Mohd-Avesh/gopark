document.addEventListener("DOMContentLoaded", function () {

  const inputs = document.querySelectorAll(".slot-main-input");

  function updateBackground(input) {
    if (input.value.trim() !== "") {
      input.style.backgroundColor = "#f0fbfb";
    } else {
      input.style.backgroundColor = "#ffffff";
    }
  }

  inputs.forEach(input => {

    // Normal typing
    input.addEventListener("input", () => updateBackground(input));

    // Change event
    input.addEventListener("change", () => updateBackground(input));

    // Blur event
    input.addEventListener("blur", () => updateBackground(input));

    // 🔥 THIS IS THE FIX
    let previousValue = input.value;

    setInterval(() => {
      if (input.value !== previousValue) {
        previousValue = input.value;
        updateBackground(input);
      }
    }, 200);

  });

});