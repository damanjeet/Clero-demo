function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToScreenFromNav(el) {
  const screenId = el.getAttribute("data-screen");
  const parentSidebar = el.closest(".sidebar");
  parentSidebar.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  el.classList.add("active");
  goToScreen(screenId);
}

function openStudentProfile() {
  goToScreen("student-profile-screen");
}

let currentDetailType = null;

function openScoreDetail(type) {
  currentDetailType = type;
  const titleEl = document.getElementById("drawer-title");
  const bodyEl = document.getElementById("drawer-body");
  const trendMeta = document.getElementById("trend-meta");
  const trendSummary = document.getElementById("trend-summary");
  const notesSection = document.getElementById("counselor-notes-section");

  if (type === "system") {
    titleEl.textContent = "System readiness score — 6.7 / 10";
    bodyEl.textContent =
      "This score is generated automatically from academics, course rigor, extracurriculars, leadership, skills, consistency, and essays.";
    trendMeta.textContent = "Δ +0.3 in last 30 days · Δ +1.1 in last 6 months · Avg change +0.08 / month.";
    trendSummary.textContent =
      "AI view: Sara’s system score has improved steadily as academics and rigor strengthened, but further gains depend on leadership and essay quality.";
    notesSection.style.display = "none";
  } else if (type === "counselor") {
    titleEl.textContent = "Counselor readiness score — 6.4 / 10";
    bodyEl.textContent =
      "Your adjusted readiness score for Sara. Use this to reflect nuances the system may under- or over-weight.";
    trendMeta.textContent = "You might nudge this up or down over time as you see consistent behavior and context.";
    trendSummary.textContent =
      "AI summary (example): Your notes emphasize maturity and independence in real-world contexts that are not fully captured in the system inputs.";
    notesSection.style.display = "block";
  }

  document.getElementById("drawer").style.display = "flex";
}

function openSubscore(label, sysVal, counselVal) {
  currentDetailType = "subscore";
  const titleEl = document.getElementById("drawer-title");
  const bodyEl = document.getElementById("drawer-body");
  const trendMeta = document.getElementById("trend-meta");
  const trendSummary = document.getElementById("trend-summary");
  const notesSection = document.getElementById("counselor-notes-section");

  titleEl.textContent = `${label} — System ${sysVal}/10 · Counselor ${counselVal}/10`;
  bodyEl.textContent =
    `System score for ${label.toLowerCase()} is ${sysVal}/10, with your counselor view at ${counselVal}/10. ` +
    "In a full build, this panel would show GPA, coursework, activities, or essay evidence that drives this subscore.";

  trendMeta.textContent = `Example: ${label} improved slightly over the last term as new achievements were recorded.`;
  trendSummary.textContent =
    `AI interpretation placeholder for ${label}: where improvements have come from and what would move this closer to a 9 or 10.`;

  notesSection.style.display = "block";
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

function addActionItem() {
  const list = document.getElementById("action-list");
  const li = document.createElement("li");
  li.textContent = "New action item (placeholder) – e.g., ‘Add one deeper community project this term.’";
  list.appendChild(li);
}