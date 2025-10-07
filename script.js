const backendURL = "https://my-diary-projectafd.onrender.com/";

async function saveEntry() {
  const text = document.getElementById("diaryText").value.trim();
  if (!text) return alert("Write something first!");

  await fetch(`${backendURL}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  document.getElementById("diaryText").value = "";
  loadEntries();
}

async function loadEntries() {
  const res = await fetch(`${backendURL}/entries`);
  const data = await res.json();
  const container = document.getElementById("entries");
  container.innerHTML = "";
  data.reverse().forEach((e) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <p>${e.text}</p>
      <small>${new Date(e.timestamp).toLocaleString()}</small>
    `;
    container.appendChild(div);
  });
}

window.onload = loadEntries;

