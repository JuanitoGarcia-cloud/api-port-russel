const usersTable = document.getElementById("usersTable").querySelector("tbody");
const userForm = document.getElementById("userForm");
const errorEl = document.getElementById("error");

const token = localStorage.getItem("token");
if (!token) window.location.href = "/";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
};

// Récupérer tous les utilisateurs
async function fetchUsers() {
    const res = await fetch("/users", { headers });
    const data = await res.json();
    usersTable.innerHTML = "";
    data.forEach(u => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.email}</td>
            <td>
                <button onclick="editUser('${u.email}')">Modifier</button>
                <button onclick="deleteUser('${u.email}')">Supprimer</button>
            </td>
        `;
        usersTable.appendChild(tr);
    });
}

// Ajouter ou modifier utilisateur
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("/users", {
            method: "POST",
            headers,
            body: JSON.stringify({ username, email, password })
        });
        if (!res.ok) throw await res.json();
        await fetchUsers();
        userForm.reset();
        errorEl.textContent = "";
    } catch (err) {
        errorEl.textContent = err.message || "Erreur lors de l'enregistrement";
    }
});

// Modifier utilisateur
window.editUser = async (email) => {
    const res = await fetch(`/users/${email}`, { headers });
    const u = await res.json();
    document.getElementById("username").value = u.username;
    document.getElementById("email").value = u.email;
    document.getElementById("password").value = "";
};

// Supprimer utilisateur
window.deleteUser = async (email) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await fetch(`/users/${email}`, { method: "DELETE", headers });
    fetchUsers();
};

// Initialisation
fetchUsers();
