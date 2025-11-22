// ---------- LOGIN ----------
const loginPage = document.getElementById("loginPage");
const mainApp = document.getElementById("mainApp");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userTag = document.getElementById("userTag");
const ownerTools = document.getElementById("ownerTools");

loginBtn.addEventListener("click", () => {
    const role = document.getElementById("roleSelect").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter username and password!");
        return;
    }

    loginPage.style.display = "none";
    mainApp.style.display = "block";
    userTag.textContent = `Logged in as: ${role.toUpperCase()} (${username})`;
    ownerTools.style.display = (role === "owner" || role === "admin") ? "block" : "none";
});

logoutBtn.addEventListener("click", () => {
    mainApp.style.display = "none";
    loginPage.style.display = "flex";
});

// ---------- STATIONS ----------
const stations = [
    { name: "GreenCharge Plaza", city: "Mumbai", owner: "EcoGrid Pvt Ltd", verified: true },
    { name: "Highway FastCharge", city: "Pune", owner: "Highway Infra", verified: true },
    { name: "Solar EV Point", city: "Surat", owner: "SolarRide", verified: false }
];

const stationsTable = document.getElementById("stationsTable").querySelector("tbody");
const searchStations = document.getElementById("searchStations");

function renderStations() {
    stationsTable.innerHTML = "";
    const query = searchStations.value.trim().toLowerCase();

    stations
        .filter(s => !query || s.name.toLowerCase().includes(query) || s.city.toLowerCase().includes(query))
        .forEach(station => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${station.name}</td>
        <td>${station.city}</td>
        <td>${station.owner}</td>
        <td>${station.verified ? "✅ Verified" : "⏳ Pending"}</td>
        <td><button class="mapBtn">Map</button></td>
      `;
            tr.querySelector(".mapBtn").addEventListener("click", () => showOnMap(station));
            stationsTable.appendChild(tr);
        });
}
renderStations();

searchStations.addEventListener("input", renderStations);

// ---------- MAP ----------
const mapFrame = document.getElementById("mapFrame");
const mapTitle = document.getElementById("mapTitle");
function showOnMap(station) {
    const query = encodeURIComponent(`${station.name} ${station.city}`);
    mapFrame.src = `https://www.google.com/maps?q=${query}&output=embed`;
    mapTitle.textContent = `${station.name} – ${station.city}`;
    mapFrame.scrollIntoView({ behavior: "smooth" });
}

// ---------- RANGE CALCULATOR ----------
let lastRange = 0;
document.getElementById("calcRangeBtn").addEventListener("click", () => {
    const full = Number(document.getElementById("fullRange").value);
    const percent = Number(document.getElementById("batteryPercent").value);
    lastRange = (full * percent) / 100;
    document.getElementById("rangeResult").textContent = `Range: ~${lastRange.toFixed(1)} km`;
});

document.getElementById("checkTripBtn").addEventListener("click", () => {
    const trip = Number(document.getElementById("tripDistance").value);
    const result = document.getElementById("tripResult");
    if (trip <= lastRange) {
        result.textContent = "Reachable ✅ You can make this trip.";
    } else {
        result.textContent = "Charging Required ⚠️ Need a charging stop.";
    }
});

// ---------- OWNER ADD STATION ----------
document.getElementById("addStationBtn").addEventListener("click", () => {
    const name = document.getElementById("newName").value.trim();
    const city = document.getElementById("newCity").value.trim();
    const owner = document.getElementById("newOwner").value.trim();
    if (!name || !city || !owner) return alert("Fill all fields!");
    stations.push({ name, city, owner, verified: false });
    renderStations();
    document.getElementById("newName").value = "";
    document.getElementById("newCity").value = "";
    document.getElementById("newOwner").value = "";
});