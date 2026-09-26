document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("bookingDate");
  const startInput = document.getElementById("startTime");
  const durationInput = document.getElementById("durationHours");
  const endTimeDisplay = document.getElementById("endTimeCalc");
  const totalPriceEl = document.getElementById("totalPrice");
  const finalTotalPrice = document.getElementById("finalTotalPrice");
  const errorDiv = document.getElementById("timeError");
  const submitBtn = document.getElementById("submitBtn");
  const pricePerHour = Number(document.getElementById("pricePerHour").value);

  const form = document.getElementById("bookingForm")
  const vehicleNumberInput = document.getElementById("vehicleNumber");

  const vehiclePattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
  form.addEventListener("submit", (e) => {
    if(!vehicleNumberInput.value){
      e.preventDefault();
      errorDiv.innerText = "Please enter vehicle number";
      return;
    }

    const vehicleNum = vehicleNumberInput.value.toUpperCase().trim();
    if (!vehiclePattern.test(vehicleNum)) {
        e.preventDefault();
        errorDiv.innerText = "Invalid vehicle number format (Example: MH12AB1234)";
        return;
    }
  });

  vehicleNumberInput.addEventListener("input", function() {
    errorDiv.innerText = "";
  });

  // Disable past dates (start from today)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayFormatted = `${yyyy}-${mm}-${dd}`;
  dateInput.min = todayFormatted;

  const resetAll = () => {
    totalPriceEl.innerText = "0";
    finalTotalPrice.value = "";
    endTimeDisplay.innerText = "00:00";
    errorDiv.innerText = "";
    submitBtn.disabled = true;
  };

  const calculateBooking = () => {
    const date = dateInput.value;
    const start = startInput.value;
    const hours = Number(durationInput.value);

    // Validate inputs
    if (!date || !start || !hours || hours <= 0 || hours > 24) {
      resetAll();
      if (hours > 24) errorDiv.innerText = "Duration cannot exceed 24 hours";
      return;
    }

    // Booking start in local time
    const [startHour, startMinute] = start.split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);

    const bookingStart = new Date(year, month - 1, day, startHour, startMinute);
    const now = new Date();

    if (bookingStart < now) {
      resetAll();
      errorDiv.innerText = "Cannot book past time";
      return;
    }

    errorDiv.innerText = "";

    // Calculate booking end
    const bookingEnd = new Date(bookingStart);
    bookingEnd.setHours(bookingEnd.getHours() + hours);

    // Format end time
    const endHours = String(bookingEnd.getHours()).padStart(2, "0");
    const endMinutes = String(bookingEnd.getMinutes()).padStart(2, "0");
    const formattedEndTime = `${endHours}:${endMinutes}`;

    // Local end date
    const endDateLocal = `${bookingEnd.getFullYear()}-${String(bookingEnd.getMonth() + 1).padStart(2,'0')}-${String(bookingEnd.getDate()).padStart(2,'0')}`;

    // Display end time (check if next day)
    if (endDateLocal !== date) {
      endTimeDisplay.innerText = `${formattedEndTime} (Next Day)`;
    } else {
      endTimeDisplay.innerText = formattedEndTime;
    }

    // Total price
    const totalPrice = hours * pricePerHour;
    totalPriceEl.innerText = totalPrice;
    finalTotalPrice.value = totalPrice;

    submitBtn.disabled = false;
  };

  // Event listeners
  dateInput.addEventListener("change", calculateBooking);
  startInput.addEventListener("change", calculateBooking);
  durationInput.addEventListener("input", calculateBooking);

  resetAll();

});

