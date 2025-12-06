function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openSubscore(label, val) {
  document.getElementById("drawer-title").textContent = `${label} — ${val}/10`;
  document.getElementById("drawer-body").textContent =
    `This is where detailed breakdowns, counselor adjustments, and AI insights would appear for ${label}.`;
  document.getElementById("drawer").style.display = "flex";
}

function closeDrawer() {
  document.getElementById("drawer").style.display = "none";
}