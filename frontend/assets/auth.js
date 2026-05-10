const API_BASE = window.location.port === "3000" ? "http://127.0.0.1:5000/api" : "/api";

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function setMessage(element, message, success = false) {
  if (!element) return;
  element.textContent = message || "";
  element.classList.toggle("success", success);
}

function clearErrors(form) {
  form.querySelectorAll(".field-error").forEach((error) => {
    error.textContent = "";
  });
}

function showFieldError(input, message) {
  const error = input.closest("label")?.querySelector(".field-error");
  if (error) error.textContent = message;
}

function validateAuthForm(form) {
  clearErrors(form);
  let valid = true;

  form.querySelectorAll("input[required]").forEach((input) => {
    if (!input.value.trim()) {
      showFieldError(input, "This field is required.");
      valid = false;
    }
  });

  const email = form.querySelector('input[type="email"]');
  if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
    showFieldError(email, "Enter a valid email address.");
    valid = false;
  }

  const password = form.querySelector('input[type="password"]');
  if (password && password.value && password.value.length < 6) {
    showFieldError(password, "Password must be at least 6 characters.");
    valid = false;
  }

  return valid;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}

function persistToken(data) {
  if (data.token) localStorage.setItem("mercato-auth-token", data.token);
}

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const forgotForm = document.querySelector("#forgotForm");
const resetForm = document.querySelector("#resetForm");
const logoutButton = document.querySelector("#logoutButton");
const welcomeCard = document.querySelector("#welcomeCard");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#loginMessage");
    if (!validateAuthForm(loginForm)) return;

    try {
      setMessage(message, "Signing in...");
      const payload = getFormData(loginForm);
      payload.rememberMe = Boolean(loginForm.elements.rememberMe.checked);
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      persistToken(data);
      setMessage(message, "Login successful. Redirecting...", true);
      window.location.href = "dashboard.html";
    } catch (error) {
      setMessage(message, error.message);
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#signupMessage");
    if (!validateAuthForm(signupForm)) return;

    try {
      setMessage(message, "Creating account...");
      const payload = getFormData(signupForm);
      payload.rememberMe = Boolean(signupForm.elements.rememberMe.checked);
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      persistToken(data);
      setMessage(message, "Account created. Redirecting...", true);
      window.location.href = "dashboard.html";
    } catch (error) {
      setMessage(message, error.message);
    }
  });
}

if (forgotForm) {
  forgotForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#forgotMessage");
    if (!validateAuthForm(forgotForm)) return;

    try {
      setMessage(message, "Sending reset link...");
      const data = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(getFormData(forgotForm)),
      });
      const resetHint = data.resetUrl ? ` Dev reset link: ${data.resetUrl}` : "";
      setMessage(message, `${data.message}${resetHint}`, true);
    } catch (error) {
      setMessage(message, error.message);
    }
  });
}

if (resetForm) {
  resetForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#resetMessage");
    if (!validateAuthForm(resetForm)) return;

    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setMessage(message, "Reset token is missing.");
      return;
    }

    try {
      setMessage(message, "Updating password...");
      const data = await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password: resetForm.elements.password.value }),
      });
      persistToken(data);
      setMessage(message, "Password updated. Redirecting...", true);
      window.location.href = "dashboard.html";
    } catch (error) {
      setMessage(message, error.message);
    }
  });
}

async function loadDashboard() {
  if (!welcomeCard) return;

  try {
    const token = localStorage.getItem("mercato-auth-token");
    const data = await apiRequest("/users/dashboard", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    welcomeCard.innerHTML = `
      <p class="eyebrow">Account</p>
      <h1>${data.dashboard.message}</h1>
      <p class="muted">${data.user.email} - signed in with ${data.user.provider}</p>
    `;
  } catch (_error) {
    window.location.href = "index.html";
  }
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST", body: "{}" });
    } finally {
      localStorage.removeItem("mercato-auth-token");
      window.location.href = "index.html";
    }
  });
}

loadDashboard();
