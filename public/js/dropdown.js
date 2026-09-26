document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
  const selectedText = dropdown.querySelector(".dropdown-selected span");
  const clearBtn = dropdown.querySelector(".dropdown-clear");
  const options = dropdown.querySelectorAll(".dropdown-options li");
  const input = dropdown.querySelector("input");

  // open / close
  dropdown.querySelector(".dropdown-selected").addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  // select option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selectedText.textContent = option.textContent;
      input.value = option.dataset.value;
      clearBtn.style.display = "inline";
      dropdown.classList.remove("open");

      // reload page with filter
      const params = new URLSearchParams(window.location.search);
params.set("vehicleType", input.value);
window.location.search = params.toString();

    });
  });

  // clear selection
  clearBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  selectedText.textContent = "Select vehicle type";
  input.value = "";
  clearBtn.style.display = "none";

  const params = new URLSearchParams(window.location.search);
  params.delete("vehicleType");
  params.delete("skip"); // reset pagination when filter changes

  window.location.search = params.toString();
});
});

// close when clicking outside
document.addEventListener("click", (e) => {
  document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});
