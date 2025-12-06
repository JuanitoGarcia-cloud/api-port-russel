// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const res = await fetch("/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "/dashboard.html";
            } else {
                document.getElementById("error").textContent = data.message;
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    });
}

// Dashboard
if (document.getElementById("username")) {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";

    const payload = JSON.parse(atob(token.split(".")[1]));
    document.getElementById("username").textContent = payload.username;
    document.getElementById("email").textContent = payload.email;

    document.getElementById("date").textContent = new Date().toLocaleDateString();
}
