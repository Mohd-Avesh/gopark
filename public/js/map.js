const map = L.map('map').setView([19.0760, 72.8777], 20); // Mumbai

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([19.0760, 72.8777]).addTo(map)
      .bindPopup("Parking Here")
      .openPopup();