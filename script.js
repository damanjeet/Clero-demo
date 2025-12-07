function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToScreenFromNav(el) {
  const screenId = el.getAttribute("data-screen");
  // reset nav active state for that screen group
  const parentSidebar = el.closest(".sidebar");
  parentSidebar.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  el.classList.add("active");
  goToScreen(screenId);
}

// from dashboard or students list
function openStudentProfile() {
  goToScreen("student-profile-screen");
}

function openSubscore(label, val) {
  document.getElementById("drawer-title").textContent = `${label} — ${val}/10`;
  document.getElementById("drawer-body").textContent =
    `Here you’d see how the ${label.toLowerCase()} score was calculated, the evidence, ` +
    `and AI-suggested ways to move it from ${val}/10 to a higher score.`;
  document.getElementById("drawer").style.display = "flex";
}

function closeDrawer() {
  document.getElementById("drawer").style.display = "none";
}

function switchTab(tabEl) {
  const container = tabEl.closest(".main-content");
  container.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tabEl.classList.add("active");

  const tabId = tabEl.getAttribute("data-tab");
  container.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.getElementById("tab-" + tabId).classList.add("active");
}