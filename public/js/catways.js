const catwaysTable = document.getElementById("catwaysTable").querySelector("tbody");
const catwayForm = document.getElementById("catwayForm");
const catwayError = document.getElementById("error");

const tokenCatway = localStorage.getItem("token");
if (!tokenCatway) window.location.href = "/";

const catwayHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenCatway}`
};

// Récupérer tous les catways
async function fetchCatways() {
    const res = await fetch("/catways", { headers: catwayHeaders });
    const data = await res.json();
    catwaysTable.innerHTML = "";
    data.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.catwayNumber}</td>
            <td>${c.catwayType}</td>
            <td>${c.catwayState}</td>
            <td>
                <button onclick="editCatway(${c.catwayNumber})">Modifier</button>
                <button onclick="deleteCatway(${c.catwayNumber})">Supprimer</button>
            </td>
        `;
        catwaysTable.appendChild(tr);
    });
}

// Ajouter ou modifier catway
catwayForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const catwayNumber = parseInt(document.getElementById("catwayNumber").value);
    const catwayType = document.getElementById("catwayType").value;
    const catwayState = document.getElementById("catwayState").value;

    try {
        const res = await fetch("/catways", {
            method: "POST",
            headers: catwayHeaders,
            body: JSON.stringify({ catwayNumber, catwayType, catwayState })
        });
        if (!res.ok) throw await res.json();
        fetchCatways();
        catwayForm.reset();
        catwayError.textContent = "";
    } catch (err) {
        catwayError.textContent = err.message || "Erreur lors de l'enregistrement";
    }
});

// Modifier catway
window.editCatway = async (num) => {
    const res = await fetch(`/catways/${num}`, { headers: catwayHeaders });
    const c = await res.json();
    document.getElementById("catwayNumber").value = c.catwayNumber;
    document.getElementById("catwayType").value = c.catwayType;
    document.getElementById("catwayState").value = c.catwayState;
};

// Supprimer catway
window.deleteCatway = async (num) => {
    if (!confirm("Supprimer ce catway ?")) return;
    await fetch(`/catways/${num}`, { method: "DELETE", headers: catwayHeaders });
    fetchCatways();
};

// Initialisation
fetchCatways();
