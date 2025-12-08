function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

function goToScreenFromNav(el) {
  const screenId = el.getAttribute("data-screen");
  const navKey = el.getAttribute("data-nav");

  // Clear active from all nav items globally
  document.querySelectorAll(".nav-item").forEach(n => {
    if (n.getAttribute("data-nav")) n.classList.remove("active");
  });

  // Mark all nav items with the same navKey as active
  if (navKey) {
    document.querySelectorAll(`.nav-item[data-nav="${navKey}"]`).forEach(n => n.classList.add("active"));
  }

  goToScreen(screenId);
}

function openStudentProfile() {
  goToScreen("student-profile-screen");
}

/* DASHBOARD SNAPSHOT TOGGLE & CLICK-THROUGH (COUNSELOR) */

function setSnapshotMode(mode) {
  // Toggle tabs
  document.querySelectorAll("#dashboard-screen .score-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-mode") === mode);
  });

  // Update score display
  const numEl = document.getElementById("snapshot-score-number");
  const labelEl = document.getElementById("snapshot-score-label");
  const descEl = document.getElementById("snapshot-score-desc");
  const cardEl = document.querySelector("#dashboard-screen .snapshot-card");

  if (!numEl || !labelEl || !descEl || !cardEl) return;

  if (mode === "counselor") {
    numEl.textContent = "6.4";
    labelEl.textContent = "Counselor score";
    descEl.textContent = "Your adjusted view of Sara’s readiness. AI baseline currently 6.7.";
  } else {
    numEl.textContent = "6.7";
    labelEl.textContent = "AI system score";
    descEl.textContent = "Derived from academics, rigor, ECs, leadership, skills and essays. Counselor currently at 6.4.";
  }

  cardEl.setAttribute("data-mode", mode);
}

function openSnapshotScore() {
  const cardEl = document.querySelector("#dashboard-screen .snapshot-card");
  const mode = cardEl ? (cardEl.getAttribute("data-mode") || "counselor") : "counselor";
  goToScreen("student-profile-screen");
  setTimeout(() => {
    openScoreDetail(mode === "system" ? "system" : "counselor");
  }, 60);
}

function openSnapshotSubscore(label, sysVal, counselVal) {
  goToScreen("student-profile-screen");
  setTimeout(() => {
    openSubscore(label, sysVal, counselVal);
  }, 60);
}

/* READINESS TAB TOGGLE (COUNSELOR) */

function setReadinessMode(mode) {
  // Toggle tabs inside readiness tab
  document.querySelectorAll("#tab-readiness .score-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-mode") === mode);
  });

  // Toggle which hero card is visible
  document.querySelectorAll("#tab-readiness .readiness-card").forEach(card => {
    card.classList.toggle("active", card.getAttribute("data-mode") === mode);
  });
}

/* DRAWER / SCORE DETAILS (COUNSELOR) */

let currentDetailType = null;

function openScoreDetail(type) {
  currentDetailType = type;
  const titleEl = document.getElementById("drawer-title");
  const bodyEl = document.getElementById("drawer-body");
  const trendMeta = document.getElementById("trend-meta");
  const trendSummary = document.getElementById("trend-summary");
  const notesSection = document.getElementById("counselor-notes-section");

  if (!titleEl || !bodyEl || !trendMeta || !trendSummary || !notesSection) return;

  if (type === "system") {
    titleEl.textContent = "System readiness score — 6.7 / 10";
    bodyEl.textContent =
      "This score is generated automatically from academics, course rigor, extracurriculars, leadership, skills, consistency, and essays.";
    trendMeta.textContent =
      "Δ +0.3 in last 30 days · Δ +1.1 in last 6 months · Avg change +0.08 / month.";
    trendSummary.textContent =
      "AI view: Sara’s system score has improved steadily as academics and rigor strengthened, but further gains depend on leadership and essay quality.";
    notesSection.style.display = "none";
  } else if (type === "counselor") {
    titleEl.textContent = "Counselor readiness score — 6.4 / 10";
    bodyEl.textContent =
      "Your adjusted readiness score for Sara. Use this to reflect nuances the system may under- or over-weight.";
    trendMeta.textContent =
      "Example: You have held the score slightly below system level while you wait for more consistent leadership and follow-through.";
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

  if (!titleEl || !bodyEl || !trendMeta || !trendSummary || !notesSection) return;

  titleEl.textContent = `${label} — System ${sysVal}/10 · Counselor ${counselVal}/10`;
  bodyEl.textContent =
    `System score for ${label.toLowerCase()} is ${sysVal}/10, with your counselor view at ${counselVal}/10. ` +
    "In a full build, this panel would show GPA, coursework, activities, or essay evidence that drives this subscore.";

  trendMeta.textContent =
    `Example: ${label} has improved slightly over the last term as new achievements were recorded.`;
  trendSummary.textContent =
    `AI interpretation placeholder for ${label}: where improvements have come from and what would move this closer to a 9 or 10.`;

  notesSection.style.display = "block";
  document.getElementById("drawer").style.display = "flex";
}

function closeDrawer() {
  const d = document.getElementById("drawer");
  if (d) d.style.display = "none";
}

/* TABS (COUNSELOR STUDENT PROFILE) */

function switchTab(tabEl) {
  const container = tabEl.closest(".main-content");
  if (!container) return;

  container.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tabEl.classList.add("active");

  const tabId = tabEl.getAttribute("data-tab");
  container.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById("tab-" + tabId);
  if (panel) panel.classList.add("active");
}

/* ACTION PLAN EDITING (COUNSELOR) */

function addActionItem() {
  const list = document.getElementById("action-list");
  if (!list) return;

  const li = document.createElement("li");
  li.className = "action-item";
  li.innerHTML = `
    <span class="action-text">New action item (placeholder) – e.g., “Add one deeper community project this term.”</span>
    <span class="action-controls">
      <button class="action-btn" onclick="markActionDone(this)">Done</button>
      <button class="action-btn" onclick="removeActionItem(this)">Remove</button>
    </span>
  `;
  list.appendChild(li);
}

function markActionDone(btn) {
  const item = btn.closest(".action-item");
  if (!item) return;
  const text = item.querySelector(".action-text");
  if (text) text.classList.toggle("done");
}

function removeActionItem(btn) {
  const item = btn.closest(".action-item");
  if (item) item.remove();
}