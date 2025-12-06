const reservationsTable = document.getElementById("reservationsTable").querySelector("tbody");
const reservationForm = document.getElementById("reservationForm");
const reservationError = document.getElementById("error");

const tokenReservation = localStorage.getItem("token");
if (!tokenReservation) window.location.href = "/";

const reservationHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenReservation}`
};

// Récupérer toutes les réservations
async function fetchReservations() {
    const res = await fetch("/catways", { headers: reservationHeaders });
    const catways = await res.json();

    reservationsTable.innerHTML = "";
    for (const c of catways) {
        const resCatway = await fetch(`/catways/${c.catwayNumber}/reservations`, { headers: reservationHeaders });
        const resData = await resCatway.json();
        resData.forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${r.catwayNumber}</td>
                <td>${r.clientName}</td>
                <td>${r.boatName}</td>
                <td>${new Date(r.startDate).toLocaleDateString()}</td>
                <td>${new Date(r.endDate).toLocaleDateString()}</td>
                <td>
                    <button onclick="editReservation('${r._id}', ${r.catwayNumber})">Modifier</button>
                    <button onclick="deleteReservation('${r._id}', ${r.catwayNumber})">Supprimer</button>
                </td>
            `;
            reservationsTable.appendChild(tr);
        });
    }
}

// Ajouter réservation
reservationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const catwayNumber = parseInt(document.getElementById("catwayNumber").value);
    const clientName = document.getElementById("clientName").value;
    const boatName = document.getElementById("boatName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    try {
        const res = await fetch(`/catways/${catwayNumber}/reservations`, {
            method: "POST",
            headers: reservationHeaders,
            body: JSON.stringify({ clientName, boatName, startDate, endDate })
        });
        if (!res.ok) throw await res.json();
        fetchReservations();
        reservationForm.reset();
        reservationError.textContent = "";
    } catch (err) {
        reservationError.textContent = err.message || "Erreur lors de l'enregistrement";
    }
});

// Modifier réservation
window.editReservation = async (idR, catwayNum) => {
    const res = await fetch(`/catways/${catwayNum}/reservations/${idR}`, { headers: reservationHeaders });
    const r = await res.json();
    document.getElementById("catwayNumber").value = r.catwayNumber;
    document.getElementById("clientName").value = r.clientName;
    document.getElementById("boatName").value = r.boatName;
    document.getElementById("startDate").value = r.startDate.slice(0, 10);
    document.getElementById("endDate").value = r.endDate.slice(0, 10);
};

// Supprimer réservation
window.deleteReservation = async (idR, catwayNum) => {
    if (!confirm("Supprimer cette réservation ?")) return;
    await fetch(`/catways/${catwayNum}/reservations/${idR}`, { method: "DELETE", headers: reservationHeaders });
    fetchReservations();
};

// Initialisation
fetchReservations();