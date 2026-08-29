import { getProfile } from "./aipipe.js";
import { showUsage } from "./usage.js";

const { token, email } = getProfile();
if (!token) window.location = `login?redirect=${window.location.href}`;

const $usage = document.querySelector("#usage");

// Show usage. If the token expired, clear it before bouncing to login else login redirects straight back.
const refreshUsage = async () => {
  if (await showUsage($usage, token, email)) return;

  localStorage.removeItem("aipipe");
  window.location = `login?redirect=${window.location.href}`;
};

document.querySelector("#playground-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const model = document.querySelector("#model").value;
  const prompt = document.querySelector("#prompt").value;
  const responseEl = document.querySelector("#response");

  responseEl.textContent = "Generating...";

  try {
    const response = await fetch("openrouter/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    }).then((r) => r.json());

    responseEl.textContent = JSON.stringify(response, null, 2);
  } catch (error) {
    responseEl.textContent = `Error: ${error.message}`;
  }
  await refreshUsage();
});

await refreshUsage();
