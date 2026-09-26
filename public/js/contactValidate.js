document.addEventListener("DOMContentLoaded", function () {

  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  const message = document.getElementById("contactMessage");
  const messageError = document.getElementById("contactMessageError");

  contactForm.addEventListener("submit", function (e) {

    let isValid = true;
    messageError.innerText = "";
    message.classList.remove("is-invalid");


    // MESSAGE
    if (!message.value.trim()) {
      messageError.innerText = "Message cannot be empty";
      message.classList.add("is-invalid");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      messageError.innerText = "Message must be at least 10 characters";
      message.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    }

  });

  if (message) {
    message.addEventListener("input", () => {
      message.classList.remove("is-invalid");
      messageError.innerText = "";
    });
  }

});