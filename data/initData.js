// const data = [
//   {
//     title: "City Center Open Parking",
//     location: "Delhi",
//     country: "India",
//     description: "Open parking space near city center with easy access.",
//     slotType: "Open",
//     pricePerHour: 50,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1592891024301-bf7948cee673?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyJTIwcGFya2luZ3xlbnwwfHwwfHx8MA%3D%3D",
//   },
//   {
//     title: "Metro Station Covered Slot",
//     location: "Mumbai",
//     country: "India",
//     description: "Covered parking near metro station with security.",
//     slotType: "Covered",
//     pricePerHour: 80,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1562426509-5044a121aa49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Mall Basement Parking",
//     location: "Bengaluru",
//     country: "India",
//     description: "Basement parking available inside shopping mall.",
//     slotType: "Basement",
//     pricePerHour: 70,
//     isAvailable: false,
//     imageURL:
//       "https://media.istockphoto.com/id/2162618334/photo/parking-lot-is-full-of-cars.webp?a=1&b=1&s=612x612&w=0&k=20&c=TILx0VHO0GYa3yTjNCsJDZdCZE-HQBwzHFbBAiTJVTs=",
//   },
//   {
//     title: "Airport Long Stay Parking",
//     location: "Hyderabad",
//     country: "India",
//     description: "Long duration parking near airport terminal.",
//     slotType: "Outdoor",
//     pricePerHour: 100,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1526626607369-f89fe1ed77a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhciUyMHBhcmtpbmd8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     title: "IT Park Employee Parking",
//     location: "Pune",
//     country: "India",
//     description: "Reserved parking slots for IT park employees.",
//     slotType: "Covered",
//     pricePerHour: 60,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1545179605-1296651e9d43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNhciUyMHBhcmtpbmd8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     title: "Railway Station Parking Zone",
//     location: "Chennai",
//     country: "India",
//     description: "Parking facility close to railway station entry.",
//     slotType: "Open",
//     pricePerHour: 40,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1671468158285-8ad746ebf4d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY2fHxjYXIlMjBwYXJraW5nfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Hospital Visitor Parking",
//     location: "Kolkata",
//     country: "India",
//     description: "24/7 visitor parking with CCTV monitoring.",
//     slotType: "Covered",
//     pricePerHour: 55,
//     isAvailable: false,
//     imageURL:
//       "https://images.unsplash.com/photo-1611004764893-539518310d7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNhciUyMHBhcmtpbmd8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     title: "Residential Society Parking",
//     location: "Noida",
//     country: "India",
//     description: "Safe parking inside residential society.",
//     slotType: "Basement",
//     pricePerHour: 45,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1753856280369-f8739dd25070?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGNhciUyMHBhcmtpbmd8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     title: "Commercial Complex Parking",
//     location: "Gurugram",
//     country: "India",
//     description: "Multi-level parking for commercial offices.",
//     slotType: "Multi-Level",
//     pricePerHour: 90,
//     isAvailable: true,
//     imageURL:
//       "https://plus.unsplash.com/premium_photo-1724766409757-340b71bc798f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBhcmtpbmclMjBnYXJhZ2V8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     title: "Beachside Tourist Parking",
//     location: "Goa",
//     country: "India",
//     description: "Tourist parking near beach area.",
//     slotType: "Open",
//     pricePerHour: 120,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1597328588953-bfea27ae2fa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHBhcmtpbmclMjBnYXJhZ2V8ZW58MHx8MHx8fDA%3D",
//   },

//   // ---- 20 more ----

//   {
//     title: "University Campus Parking",
//     location: "Jaipur",
//     country: "India",
//     description: "Student and staff parking inside campus.",
//     slotType: "Open",
//     pricePerHour: 30,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1765328692811-018a287ac605?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYzfHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Cinema Hall Parking",
//     location: "Indore",
//     country: "India",
//     description: "Evening parking near cinema hall.",
//     slotType: "Covered",
//     pricePerHour: 65,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1651346863911-d2d8050eea02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ1fHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Highway Stop Parking",
//     location: "Agra",
//     country: "India",
//     description: "Parking for travelers on highway stops.",
//     slotType: "Outdoor",
//     pricePerHour: 35,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1630235027338-40622c663856?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY2fHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Corporate Office Parking",
//     location: "Ahmedabad",
//     country: "India",
//     description: "Office parking with monthly availability.",
//     slotType: "Basement",
//     pricePerHour: 75,
//     isAvailable: false,
//     imageURL:
//       "https://images.unsplash.com/photo-1758448721161-7b3df5ec04b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Shopping Street Parking",
//     location: "Chandigarh",
//     country: "India",
//     description: "Parking near busy shopping street.",
//     slotType: "Open",
//     pricePerHour: 55,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1699277357052-4f87d13087ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc0fHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Stadium Event Parking",
//     location: "Lucknow",
//     country: "India",
//     description: "Event-based parking near stadium.",
//     slotType: "Outdoor",
//     pricePerHour: 110,
//     isAvailable: false,
//     imageURL:
//       "https://images.unsplash.com/photo-1740479229028-c899cd33e34a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg1fHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Hotel Guest Parking",
//     location: "Udaipur",
//     country: "India",
//     description: "Parking facility for hotel guests.",
//     slotType: "Covered",
//     pricePerHour: 85,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1767884161753-8127126a27af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMzfHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Tech Hub Parking",
//     location: "Bengaluru",
//     country: "India",
//     description: "Parking near major tech hub.",
//     slotType: "Multi-Level",
//     pricePerHour: 95,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1644514006131-2441a9b1e74b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYyfHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Old City Market Parking",
//     location: "Varanasi",
//     country: "India",
//     description: "Parking near old city market area.",
//     slotType: "Open",
//     pricePerHour: 40,
//     isAvailable: true,
//     imageURL:
//       "https://plus.unsplash.com/premium_photo-1661962915138-c10a03d4ae28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzIxfHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Bus Terminal Parking",
//     location: "Bhopal",
//     country: "India",
//     description: "Parking close to main bus terminal.",
//     slotType: "Covered",
//     pricePerHour: 50,
//     isAvailable: false,
//     imageURL:
//       "https://images.unsplash.com/photo-1755108869577-60f3a7d7d3a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMzfHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },

//   {
//     title: "Industrial Area Parking",
//     location: "Faridabad",
//     country: "India",
//     description: "Parking for industrial workers and visitors.",
//     slotType: "Open",
//     pricePerHour: 35,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1589399517072-346cc2ab97d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU0fHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Convention Center Parking",
//     location: "Nagpur",
//     country: "India",
//     description: "Large parking area for conventions.",
//     slotType: "Multi-Level",
//     pricePerHour: 90,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1753925765745-9e20b0e78bd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzExfHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Zoo Visitor Parking",
//     location: "Patna",
//     country: "India",
//     description: "Parking near zoo entrance.",
//     slotType: "Outdoor",
//     pricePerHour: 45,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1762398948143-85d8293c4ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzYzfHxwYXJraW5nJTIwZ2FyYWdlfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Museum Parking Area",
//     location: "Surat",
//     country: "India",
//     description: "Public parking near museum.",
//     slotType: "Covered",
//     pricePerHour: 60,
//     isAvailable: false,
//     imageURL:
//       "https://images.unsplash.com/photo-1753856280369-f8739dd25070?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHBhcmtpbmclMjBjYXJ8ZW58MHx8MHx8fDA%3D",
//   },
//   {
//     title: "Hill Station Parking",
//     location: "Shimla",
//     country: "India",
//     description: "Tourist parking in hill station.",
//     slotType: "Open",
//     pricePerHour: 100,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1630165356811-645a4914aaca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFya2luZyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
//   },
//   {
//     title: "Temple Parking Zone",
//     location: "Tirupati",
//     country: "India",
//     description: "Parking for temple visitors.",
//     slotType: "Covered",
//     pricePerHour: 50,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1668367200066-f41b9a6ba5a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUzfHxwYXJraW5nJTIwY2FyfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Harbor Area Parking",
//     location: "Kochi",
//     country: "India",
//     description: "Parking near harbor and docks.",
//     slotType: "Open",
//     pricePerHour: 65,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1759705859717-085bdf70a582?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxwYXJraW5nJTIwY2FyfGVufDB8fDB8fHww",
//   },
//   {
//     title: "City Library Parking",
//     location: "Mysuru",
//     country: "India",
//     description: "Quiet parking near city library.",
//     slotType: "Covered",
//     pricePerHour: 40,
//     isAvailable: false,
//     imageURL:
//       "https://images.unsplash.com/photo-1555940920-5d0a29a7e7dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTA0fHxwYXJraW5nJTIwY2FyfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Sports Complex Parking",
//     location: "Raipur",
//     country: "India",
//     description: "Parking near sports complex.",
//     slotType: "Open",
//     pricePerHour: 55,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1691811734734-c45e8706db4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTU0fHxwYXJraW5nJTIwY2FyfGVufDB8fDB8fHww",
//   },
//   {
//     title: "Town Hall Parking",
//     location: "Amritsar",
//     country: "India",
//     description: "Parking space near town hall.",
//     slotType: "Covered",
//     pricePerHour: 70,
//     isAvailable: true,
//     imageURL:
//       "https://images.unsplash.com/photo-1611845129459-b85618b4f6e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTc1fHxwYXJraW5nJTIwY2FyfGVufDB8fDB8fHww",
//   },
// ];

// module.exports = { data };














// const data = [
//   {
//     title: "City Center Open Parking",
//     location: "Delhi",
//     detailedLocation: {
//       area: "Connaught Place",
//       landmark: "Rajiv Chowk Metro",
//       address: "Inner Circle, Connaught Place, New Delhi",
//     },
//     country: "India",
//     description: "Open parking space near city center with easy access.",
//     vehicleType: "car",
//     slotType: "open",
//     pricePerHour: 50,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1592891024301-bf7948cee673?w=600",
//   },

//   {
//     title: "Metro Station Covered Slot",
//     location: "Mumbai",
//     detailedLocation: {
//       area: "Andheri East",
//       landmark: "Metro Station",
//       address: "Metro Line 1 Parking, Andheri East, Mumbai",
//     },
//     country: "India",
//     description: "Covered parking near metro station with security.",
//     vehicleType: "bike",
//     slotType: "covered",
//     pricePerHour: 80,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1562426509-5044a121aa49",
//   },

//   {
//     title: "Mall Basement Parking",
//     location: "Bengaluru",
//     detailedLocation: {
//       area: "Whitefield",
//       landmark: "Phoenix Mall",
//       address: "Basement B2, Phoenix Marketcity, Whitefield",
//     },
//     country: "India",
//     description: "Basement parking available inside shopping mall.",
//     vehicleType: "car",
//     slotType: "basement",
//     pricePerHour: 70,
//     isAvailable: false,
//     imageURL: "https://media.istockphoto.com/id/2162618334/photo/parking-lot-is-full-of-cars.webp",
//   },

//   {
//     title: "Airport Long Stay Parking",
//     location: "Hyderabad",
//     detailedLocation: {
//       area: "Shamshabad",
//       landmark: "RGIA Airport",
//       address: "Long Stay Parking, RGIA Hyderabad",
//     },
//     country: "India",
//     description: "Long duration parking near airport terminal.",
//     vehicleType: "suv",
//     slotType: "outdoor",
//     pricePerHour: 100,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1526626607369-f89fe1ed77a9",
//   },

//   {
//     title: "IT Park Employee Parking",
//     location: "Pune",
//     detailedLocation: {
//       area: "Hinjewadi",
//       landmark: "IT Park",
//       address: "Phase 2, Hinjewadi, Pune",
//     },
//     country: "India",
//     description: "Reserved parking slots for IT park employees.",
//     vehicleType: "car",
//     slotType: "covered",
//     pricePerHour: 60,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1545179605-1296651e9d43",
//   },

//   {
//     title: "Railway Station Parking Zone",
//     location: "Chennai",
//     detailedLocation: {
//       area: "Egmore",
//       landmark: "Railway Station",
//       address: "Station Road, Egmore, Chennai",
//     },
//     country: "India",
//     description: "Parking facility close to railway station entry.",
//     vehicleType: "bike",
//     slotType: "open",
//     pricePerHour: 40,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1671468158285-8ad746ebf4d5",
//   },

//   {
//     title: "Hospital Visitor Parking",
//     location: "Kolkata",
//     detailedLocation: {
//       area: "Salt Lake",
//       landmark: "Hospital",
//       address: "Hospital Parking Zone, Salt Lake",
//     },
//     country: "India",
//     description: "24/7 visitor parking with CCTV monitoring.",
//     vehicleType: "car",
//     slotType: "covered",
//     pricePerHour: 55,
//     isAvailable: false,
//     imageURL: "https://images.unsplash.com/photo-1611004764893-539518310d7b",
//   },

//   {
//     title: "Residential Society Parking",
//     location: "Noida",
//     detailedLocation: {
//       area: "Sector 62",
//       landmark: "Residential Society",
//       address: "Basement Parking, Sector 62, Noida",
//     },
//     country: "India",
//     description: "Safe parking inside residential society.",
//     vehicleType: "car",
//     slotType: "basement",
//     pricePerHour: 45,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1753856280369-f8739dd25070",
//   },

//   {
//     title: "Commercial Complex Parking",
//     location: "Gurugram",
//     detailedLocation: {
//       area: "Cyber City",
//       landmark: "Office Complex",
//       address: "Multi-Level Parking, DLF Cyber City",
//     },
//     country: "India",
//     description: "Multi-level parking for commercial offices.",
//     vehicleType: "suv",
//     slotType: "multi-level",
//     pricePerHour: 90,
//     isAvailable: true,
//     imageURL: "https://plus.unsplash.com/premium_photo-1724766409757-340b71bc798f",
//   },

//   {
//     title: "Beachside Tourist Parking",
//     location: "Goa",
//     detailedLocation: {
//       area: "Baga Beach",
//       landmark: "Tourist Zone",
//       address: "Tourist Parking Zone, Baga Beach",
//     },
//     country: "India",
//     description: "Tourist parking near beach area.",
//     vehicleType: "bike",
//     slotType: "open",
//     pricePerHour: 120,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1597328588953-bfea27ae2fa9",
//   },

//   {
//     title: "University Campus Parking",
//     location: "Jaipur",
//     detailedLocation: {
//       area: "Jagatpura",
//       landmark: "University Gate",
//       address: "Campus Parking Area, Jaipur",
//     },
//     country: "India",
//     description: "Student and staff parking inside campus.",
//     vehicleType: "bike",
//     slotType: "open",
//     pricePerHour: 30,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1765328692811-018a287ac605",
//   },

//   {
//     title: "Cinema Hall Parking",
//     location: "Indore",
//     detailedLocation: {
//       area: "Vijay Nagar",
//       landmark: "Cinema Hall",
//       address: "Cinema Parking Zone, Vijay Nagar",
//     },
//     country: "India",
//     description: "Evening parking near cinema hall.",
//     vehicleType: "car",
//     slotType: "covered",
//     pricePerHour: 65,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1651346863911-d2d8050eea02",
//   },

//   {
//     title: "Highway Stop Parking",
//     location: "Agra",
//     detailedLocation: {
//       area: "NH-19",
//       landmark: "Highway Stop",
//       address: "NH-19 Parking Bay, Agra",
//     },
//     country: "India",
//     description: "Parking for travelers on highway stops.",
//     vehicleType: "car",
//     slotType: "outdoor",
//     pricePerHour: 35,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1630235027338-40622c663856",
//   },

//   {
//     title: "Corporate Office Parking",
//     location: "Ahmedabad",
//     detailedLocation: {
//       area: "SG Highway",
//       landmark: "Office Tower",
//       address: "Basement Parking, SG Highway",
//     },
//     country: "India",
//     description: "Office parking with monthly availability.",
//     vehicleType: "car",
//     slotType: "basement",
//     pricePerHour: 75,
//     isAvailable: false,
//     imageURL: "https://images.unsplash.com/photo-1758448721161-7b3df5ec04b3",
//   },

//   {
//     title: "Shopping Street Parking",
//     location: "Chandigarh",
//     detailedLocation: {
//       area: "Sector 17",
//       landmark: "Market",
//       address: "Street Parking, Sector 17",
//     },
//     country: "India",
//     description: "Parking near busy shopping street.",
//     vehicleType: "bike",
//     slotType: "open",
//     pricePerHour: 55,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1699277357052-4f87d13087ee",
//   },

//   {
//     title: "Stadium Event Parking",
//     location: "Lucknow",
//     detailedLocation: {
//       area: "Gomti Nagar",
//       landmark: "Stadium",
//       address: "Event Parking Zone, Gomti Nagar",
//     },
//     country: "India",
//     description: "Event-based parking near stadium.",
//     vehicleType: "car",
//     slotType: "outdoor",
//     pricePerHour: 110,
//     isAvailable: false,
//     imageURL: "https://images.unsplash.com/photo-1740479229028-c899cd33e34a",
//   },

//   {
//     title: "Hotel Guest Parking",
//     location: "Udaipur",
//     detailedLocation: {
//       area: "Lake Pichola",
//       landmark: "Hotel",
//       address: "Hotel Guest Parking, Udaipur",
//     },
//     country: "India",
//     description: "Parking facility for hotel guests.",
//     vehicleType: "car",
//     slotType: "covered",
//     pricePerHour: 85,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1767884161753-8127126a27af",
//   },

//   {
//     title: "Tech Hub Parking",
//     location: "Bengaluru",
//     detailedLocation: {
//       area: "Electronic City",
//       landmark: "Tech Park",
//       address: "Multi-Level Parking, Electronic City",
//     },
//     country: "India",
//     description: "Parking near major tech hub.",
//     vehicleType: "suv",
//     slotType: "multi-level",
//     pricePerHour: 95,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1644514006131-2441a9b1e74b",
//   },

//   {
//     title: "Old City Market Parking",
//     location: "Varanasi",
//     detailedLocation: {
//       area: "Godowlia",
//       landmark: "Main Market",
//       address: "Market Parking Zone, Godowlia",
//     },
//     country: "India",
//     description: "Parking near old city market area.",
//     vehicleType: "bike",
//     slotType: "open",
//     pricePerHour: 40,
//     isAvailable: true,
//     imageURL: "https://plus.unsplash.com/premium_photo-1661962915138-c10a03d4ae28",
//   },

//   {
//     title: "Bus Terminal Parking",
//     location: "Bhopal",
//     detailedLocation: {
//       area: "ISBT",
//       landmark: "Bus Terminal",
//       address: "ISBT Parking Zone, Bhopal",
//     },
//     country: "India",
//     description: "Parking close to main bus terminal.",
//     vehicleType: "car",
//     slotType: "covered",
//     pricePerHour: 50,
//     isAvailable: false,
//     imageURL: "https://images.unsplash.com/photo-1755108869577-60f3a7d7d3a1",
//   },

//   {
//     title: "Industrial Area Parking",
//     location: "Faridabad",
//     detailedLocation: {
//       area: "Sector 24",
//       landmark: "Industrial Estate",
//       address: "Open Parking, Sector 24",
//     },
//     country: "India",
//     description: "Parking for industrial workers and visitors.",
//     vehicleType: "car",
//     slotType: "open",
//     pricePerHour: 35,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1589399517072-346cc2ab97d8",
//   },

//   {
//     title: "Convention Center Parking",
//     location: "Nagpur",
//     detailedLocation: {
//       area: "Civil Lines",
//       landmark: "Convention Center",
//       address: "Multi-Level Parking, Civil Lines",
//     },
//     country: "India",
//     description: "Large parking area for conventions.",
//     vehicleType: "suv",
//     slotType: "multi-level",
//     pricePerHour: 90,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1753925765745-9e20b0e78bd1",
//   },

//   {
//     title: "Zoo Visitor Parking",
//     location: "Patna",
//     detailedLocation: {
//       area: "Bailey Road",
//       landmark: "Zoo",
//       address: "Zoo Parking Zone, Patna",
//     },
//     country: "India",
//     description: "Parking near zoo entrance.",
//     vehicleType: "bike",
//     slotType: "outdoor",
//     pricePerHour: 45,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1762398948143-85d8293c4ca8",
//   },

//   {
//     title: "Museum Parking Area",
//     location: "Surat",
//     detailedLocation: {
//       area: "Athwa",
//       landmark: "City Museum",
//       address: "Public Parking, Athwa",
//     },
//     country: "India",
//     description: "Public parking near museum.",
//     vehicleType: "car",
//     slotType: "covered",
//     pricePerHour: 60,
//     isAvailable: false,
//     imageURL: "https://images.unsplash.com/photo-1753856280369-f8739dd25070",
//   },

//   {
//     title: "Hill Station Parking",
//     location: "Shimla",
//     detailedLocation: {
//       area: "Mall Road",
//       landmark: "Ridge",
//       address: "Tourist Parking, Mall Road",
//     },
//     country: "India",
//     description: "Tourist parking in hill station.",
//     vehicleType: "car",
//     slotType: "open",
//     pricePerHour: 100,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1630165356811-645a4914aaca",
//   },

//   {
//     title: "Temple Parking Zone",
//     location: "Tirupati",
//     detailedLocation: {
//       area: "Temple Road",
//       landmark: "Main Gate",
//       address: "Temple Parking Area, Tirupati",
//     },
//     country: "India",
//     description: "Parking for temple visitors.",
//     vehicleType: "bike",
//     slotType: "covered",
//     pricePerHour: 50,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1668367200066-f41b9a6ba5a8",
//   },

//   {
//     title: "Harbor Area Parking",
//     location: "Kochi",
//     detailedLocation: {
//       area: "Willingdon Island",
//       landmark: "Harbor",
//       address: "Open Parking, Willingdon Island",
//     },
//     country: "India",
//     description: "Parking near harbor and docks.",
//     vehicleType: "car",
//     slotType: "open",
//     pricePerHour: 65,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1759705859717-085bdf70a582",
//   },

//   {
//     title: "City Library Parking",
//     location: "Mysuru",
//     detailedLocation: {
//       area: "Sayyaji Rao Road",
//       landmark: "City Library",
//       address: "Library Parking Zone, Mysuru",
//     },
//     country: "India",
//     description: "Quiet parking near city library.",
//     vehicleType: "bike",
//     slotType: "covered",
//     pricePerHour: 40,
//     isAvailable: false,
//     imageURL: "https://images.unsplash.com/photo-1555940920-5d0a29a7e7dd",
//   },

//   {
//     title: "Sports Complex Parking",
//     location: "Raipur",
//     detailedLocation: {
//       area: "VIP Road",
//       landmark: "Sports Complex",
//       address: "Open Parking, VIP Road",
//     },
//     country: "India",
//     description: "Parking near sports complex.",
//     vehicleType: "bike",
//     slotType: "open",
//     pricePerHour: 55,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1691811734734-c45e8706db4b",
//   },

//   {
//     title: "Town Hall Parking",
//     location: "Amritsar",
//     detailedLocation: {
//       area: "Hall Bazaar",
//       landmark: "Town Hall",
//       address: "Covered Parking, Hall Bazaar",
//     },
//     country: "India",
//     description: "Parking space near town hall.",
//     vehicleType: "car",
//     slotType: "covered",
//     pricePerHour: 70,
//     isAvailable: true,
//     imageURL: "https://images.unsplash.com/photo-1611845129459-b85618b4f6e4",
//   },
// ];

// module.exports = { data };




























const data = [
  {
    title: "City Center Open Parking",
    location: "Inner Circle Parking, Connaught Place, Central Delhi, New Delhi, Delhi",
    country: "India",
    description: "Open parking space near city center with easy access.",
    vehicleType: "car",
    slotType: "open",
    pricePerHour: 50,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1592891024301-bf7948cee673?w=600",
  },

  {
    title: "Metro Station Covered Slot",
    location: "Metro Line 1 Parking Zone, Andheri East, Mumbai, Maharashtra",
    country: "India",
    description: "Covered parking near metro station with security.",
    vehicleType: "bike",
    slotType: "covered",
    pricePerHour: 80,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1562426509-5044a121aa49",
  },

  {
    title: "Mall Basement Parking",
    location: "Basement B2 Parking, Phoenix Marketcity Mall, Whitefield, Bengaluru, Karnataka",
    country: "India",
    description: "Basement parking available inside shopping mall.",
    vehicleType: "car",
    slotType: "basement",
    pricePerHour: 70,
    isAvailable: false,
    imageURL: "https://media.istockphoto.com/id/2162618334/photo/parking-lot-is-full-of-cars.webp?a=1&b=1&s=612x612&w=0&k=20&c=TILx0VHO0GYa3yTjNCsJDZdCZE-HQBwzHFbBAiTJVTs="  },

  {
    title: "Airport Long Stay Parking",
    location: "Long Stay Parking Area, Rajiv Gandhi International Airport, Shamshabad, Hyderabad, Telangana",
    country: "India",
    description: "Long duration parking near airport terminal.",
    vehicleType: "suv",
    slotType: "outdoor",
    pricePerHour: 100,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1526626607369-f89fe1ed77a9",
  },

  {
    title: "IT Park Employee Parking",
    location: "Employee Parking Zone, Hinjewadi Phase 2 IT Park, Pune, Maharashtra",
    country: "India",
    description: "Reserved parking slots for IT park employees.",
    vehicleType: "car",
    slotType: "covered",
    pricePerHour: 60,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1545179605-1296651e9d43",
  },

  {
    title: "Railway Station Parking Zone",
    location: "Railway Station Parking, Egmore Railway Station, Egmore, Chennai, Tamil Nadu",
    country: "India",
    description: "Parking facility close to railway station entry.",
    vehicleType: "bike",
    slotType: "open",
    pricePerHour: 40,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1671468158285-8ad746ebf4d5",
  },

  {
    title: "Hospital Visitor Parking",
    location: "Visitor Parking Area, Salt Lake Hospital Zone, Kolkata, West Bengal",
    country: "India",
    description: "24/7 visitor parking with CCTV monitoring.",
    vehicleType: "car",
    slotType: "covered",
    pricePerHour: 55,
    isAvailable: false,
    imageURL: "https://images.unsplash.com/photo-1611004764893-539518310d7b",
  },

  {
    title: "Residential Society Parking",
    location: "Basement Parking, Residential Society, Sector 62, Noida, Uttar Pradesh",
    country: "India",
    description: "Safe parking inside residential society.",
    vehicleType: "car",
    slotType: "basement",
    pricePerHour: 45,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1753856280369-f8739dd25070",
  },

  {
    title: "Commercial Complex Parking",
    location: "Multi-Level Parking, DLF Cyber City, Gurugram, Haryana",
    country: "India",
    description: "Multi-level parking for commercial offices.",
    vehicleType: "suv",
    slotType: "multi-level",
    pricePerHour: 90,
    isAvailable: true,
    imageURL: "https://plus.unsplash.com/premium_photo-1724766409757-340b71bc798f",
  },

  {
    title: "Beachside Tourist Parking",
    location: "Tourist Parking Zone, Baga Beach, North Goa, Goa",
    country: "India",
    description: "Tourist parking near beach area.",
    vehicleType: "bike",
    slotType: "open",
    pricePerHour: 120,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1597328588953-bfea27ae2fa9",
  },

  {
    title: "University Campus Parking",
    location: "Campus Parking Area, Jagatpura University Zone, Jaipur, Rajasthan",
    country: "India",
    description: "Student and staff parking inside campus.",
    vehicleType: "bike",
    slotType: "open",
    pricePerHour: 30,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1765328692811-018a287ac605",
  },

  {
    title: "Cinema Hall Parking",
    location: "Covered Parking, Cinema Hall Complex, Vijay Nagar, Indore, Madhya Pradesh",
    country: "India",
    description: "Evening parking near cinema hall.",
    vehicleType: "car",
    slotType: "covered",
    pricePerHour: 65,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1651346863911-d2d8050eea02",
  },

  {
    title: "Highway Stop Parking",
    location: "Highway Parking Bay, NH-19 Roadside Stop, Agra, Uttar Pradesh",
    country: "India",
    description: "Parking for travelers on highway stops.",
    vehicleType: "car",
    slotType: "outdoor",
    pricePerHour: 35,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1630235027338-40622c663856",
  },

  {
    title: "Corporate Office Parking",
    location: "Basement Office Parking, SG Highway Corporate Zone, Ahmedabad, Gujarat",
    country: "India",
    description: "Office parking with monthly availability.",
    vehicleType: "car",
    slotType: "basement",
    pricePerHour: 75,
    isAvailable: false,
    imageURL: "https://images.unsplash.com/photo-1758448721161-7b3df5ec04b3",
  },

  {
    title: "Shopping Street Parking",
    location: "Street Parking Area, Sector 17 Market, Chandigarh",
    country: "India",
    description: "Parking near busy shopping street.",
    vehicleType: "bike",
    slotType: "open",
    pricePerHour: 55,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1699277357052-4f87d13087ee",
  },

  {
    title: "Stadium Event Parking",
    location: "Event Parking Zone, Stadium Area, Gomti Nagar, Lucknow, Uttar Pradesh",
    country: "India",
    description: "Event-based parking near stadium.",
    vehicleType: "car",
    slotType: "outdoor",
    pricePerHour: 110,
    isAvailable: false,
    imageURL: "https://images.unsplash.com/photo-1740479229028-c899cd33e34a",
  },

  {
    title: "Hotel Guest Parking",
    location: "Hotel Guest Parking, Lake Pichola Area, Udaipur, Rajasthan",
    country: "India",
    description: "Parking facility for hotel guests.",
    vehicleType: "car",
    slotType: "covered",
    pricePerHour: 85,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1767884161753-8127126a27af",
  },

  {
    title: "Tech Hub Parking",
    location: "Multi-Level Parking, Electronic City Tech Hub, Bengaluru, Karnataka",
    country: "India",
    description: "Parking near major tech hub.",
    vehicleType: "suv",
    slotType: "multi-level",
    pricePerHour: 95,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1644514006131-2441a9b1e74b",
  },

  {
    title: "Old City Market Parking",
    location: "Market Parking Zone, Godowlia Chowk, Varanasi, Uttar Pradesh",
    country: "India",
    description: "Parking near old city market area.",
    vehicleType: "bike",
    slotType: "open",
    pricePerHour: 40,
    isAvailable: true,
    imageURL: "https://plus.unsplash.com/premium_photo-1661962915138-c10a03d4ae28",
  },

  {
    title: "Bus Terminal Parking",
    location: "Terminal Parking Area, ISBT Bus Terminal, Bhopal, Madhya Pradesh",
    country: "India",
    description: "Parking close to main bus terminal.",
    vehicleType: "car",
    slotType: "covered",
    pricePerHour: 50,
    isAvailable: false,
    imageURL: "https://images.unsplash.com/photo-1755108869577-60f3a7d7d3a1",
  },

  {
    title: "Industrial Area Parking",
    location: "Open Parking Zone, Industrial Estate Sector 24, Faridabad, Haryana",
    country: "India",
    description: "Parking for industrial workers and visitors.",
    vehicleType: "car",
    slotType: "open",
    pricePerHour: 35,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1589399517072-346cc2ab97d8",
  },

  {
    title: "Convention Center Parking",
    location: "Multi-Level Parking, Convention Center Area, Civil Lines, Nagpur, Maharashtra",
    country: "India",
    description: "Large parking area for conventions.",
    vehicleType: "suv",
    slotType: "multi-level",
    pricePerHour: 90,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1753925765745-9e20b0e78bd1",
  },

  {
    title: "Zoo Visitor Parking",
    location: "Visitor Parking Zone, Zoo Area, Bailey Road, Patna, Bihar",
    country: "India",
    description: "Parking near zoo entrance.",
    vehicleType: "bike",
    slotType: "outdoor",
    pricePerHour: 45,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1762398948143-85d8293c4ca8",
  },

  {
    title: "Museum Parking Area",
    location: "Public Parking Area, City Museum Zone, Athwa, Surat, Gujarat",
    country: "India",
    description: "Public parking near museum.",
    vehicleType: "car",
    slotType: "covered",
    pricePerHour: 60,
    isAvailable: false,
    imageURL: "https://images.unsplash.com/photo-1753856280369-f8739dd25070",
  },

  {
    title: "Hill Station Parking",
    location: "Tourist Parking Area, Mall Road, Shimla, Himachal Pradesh",
    country: "India",
    description: "Tourist parking in hill station.",
    vehicleType: "car",
    slotType: "open",
    pricePerHour: 100,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1630165356811-645a4914aaca",
  },

  {
    title: "Temple Parking Zone",
    location: "Covered Parking Area, Temple Road, Tirupati, Andhra Pradesh",
    country: "India",
    description: "Parking for temple visitors.",
    vehicleType: "bike",
    slotType: "covered",
    pricePerHour: 50,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1668367200066-f41b9a6ba5a8",
  },

  {
    title: "Harbor Area Parking",
    location: "Open Parking Area, Willingdon Island Harbor Zone, Kochi, Kerala",
    country: "India",
    description: "Parking near harbor and docks.",
    vehicleType: "car",
    slotType: "open",
    pricePerHour: 65,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1759705859717-085bdf70a582",
  },

  {
    title: "City Library Parking",
    location: "Library Parking Zone, Sayyaji Rao Road, Mysuru, Karnataka",
    country: "India",
    description: "Quiet parking near city library.",
    vehicleType: "bike",
    slotType: "covered",
    pricePerHour: 40,
    isAvailable: false,
    imageURL: "https://images.unsplash.com/photo-1555940920-5d0a29a7e7dd",
  },

  {
    title: "Sports Complex Parking",
    location: "Open Parking Area, Sports Complex Zone, VIP Road, Raipur, Chhattisgarh",
    country: "India",
    description: "Parking near sports complex.",
    vehicleType: "bike",
    slotType: "open",
    pricePerHour: 55,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1691811734734-c45e8706db4b",
  },

  {
    title: "Town Hall Parking",
    location: "Covered Parking Area, Town Hall Complex, Hall Bazaar, Amritsar, Punjab",
    country: "India",
    description: "Parking space near town hall.",
    vehicleType: "car",
    slotType: "covered",
    pricePerHour: 70,
    isAvailable: true,
    imageURL: "https://images.unsplash.com/photo-1611845129459-b85618b4f6e4",
  },
];

module.exports = { data };
