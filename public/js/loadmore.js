const container = document.getElementById("slotsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let skip = Number(container.dataset.skip); // starts at 15
const limit = 6;

loadMoreBtn.addEventListener("click", async () => {
  loadMoreBtn.disabled = true;

  const res = await fetch(`/parking-slots/load-more?skip=${skip}`);
  const slots = await res.json();

  if (slots.length === 0) {
    loadMoreBtn.innerText = "No more slots";
    return;
  }

  slots.forEach(slot => {
    const div = document.createElement("div");
    div.className = "col-lg-4 col-md-6";

    div.innerHTML = `
      <div class="card slot-card">
        <a href="/parking-slots/${slot._id}" class="card-img-a">
          <img src="${slot.imageURL}?w=400&h=200&fit=crop&auto=format&q=80" />
        </a>

        <div class="card-body">
          <h5 class="card-title fw-bold">
            ${slot.title}
          </h5>

          <p class="text-dark mb-1 card-location">
            <span class="location-icon"></span>${slot.location.split(",").slice(-2).join(",").trim()}, ${slot.country}
          </p>

          <p class="small text-muted">
            ${slot.description || ""}
          </p>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="badge ${slot.isAvailable ? "bg-success" : "bg-danger"}">
              ${slot.isAvailable ? "Available" : "Full"}
            </span>

            <span class="fw-bold text-dark">
              ₹${slot.pricePerHour}/hr
            </span>
          </div>
        </div>

        <div class="card-footer bg-white border-0">
          ${
            slot.isAvailable
              ? `<a href="/parking-slots/${slot._id}/book" class="btn w-100 slot-btn teal-main-btn">Book Slot</a>`
              : `<button class="btn w-100 btn-secondary slot-diabled-btn" disabled>
                   Not Available
                 </button>`
          }
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  skip += limit; // 15 → 20 → 25
  loadMoreBtn.disabled = false;
});
