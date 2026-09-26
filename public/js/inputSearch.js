const searchInput = document.getElementById("searchSlotInput");
const clearBtn = document.getElementById("clearSearch");
let timer;

if (searchInput) {
  // Trigger search function
  const triggerSearch = () => {
  const value = searchInput.value.trim();
  const params = new URLSearchParams(window.location.search);

  if (value !== "") {
    params.set("search", value);
  } else {
    params.delete("search");
  }

  window.location.search = params.toString();
};


  //Auto search after user stops typing
  searchInput.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      triggerSearch();
    }, 2000);
  });

  //Immediate search if Enter pressed
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      clearTimeout(timer); // cancel pending auto search
      triggerSearch();
    }
  });
}


// show / hide ❌ icon
function toggleClearBtn() {
  clearBtn.style.display = searchInput.value.trim() ? "block" : "none";
}

// clear input on click
clearBtn.addEventListener("click", function () {
  const params = new URLSearchParams(window.location.search);
  params.delete("search");
  window.location.search = params.toString();
});


// detect typing & prefilled value
searchInput.addEventListener("input", toggleClearBtn);
window.addEventListener("DOMContentLoaded", toggleClearBtn);
