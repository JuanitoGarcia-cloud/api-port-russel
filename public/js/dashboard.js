const API_URL = window.location.origin;
const token = localStorage.getItem("token");

if (!token) window.location.href = "/";

function loadDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    document.querySelector("#username").textContent = user.username;
    document.querySelector("#email").textContent = user.email;
    document.querySelector("#today").textContent = new Date().toLocaleDateString();

    loadCurrentReservations();
}

async function loadCurrentReservations() {
    const res = await fetch(`${API_URL}/catways`, {
        headers: { "Authorization": "Bearer " + token }
    });

    const catways = await res.json();
    const table = document.querySelector("#current-reservations");

    table.innerHTML = "";

    for (const c of catways) {
        const resRes = await fetch(`${API_URL}/catways/${c.catwayNumber}/reservations`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const reservations = await resRes.json();
        const active = reservations.filter(r => new Date(r.endDate) >= new Date());

        active.forEach(r => {
            table.innerHTML += `
                <tr>
                    <td>${r.catwayNumber}</td>
                    <td>${r.clientName}</td>
                    <td>${r.boatName}</td>
                    <td>${r.startDate}</td>
                    <td>${r.endDate}</td>
                </tr>
            `;
        });
    }
}

loadDashboard();
