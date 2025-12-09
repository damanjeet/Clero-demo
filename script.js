// Basic screen routing
function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add("active");
}

// Role panel switching (counselor, student, parent)
function switchRolePanel(navEl, role, panelId) {
  const screenId =
    role === "counselor" ? "counselor-screen" :
    role === "student"   ? "student-screen"   :
    role === "parent"    ? "parent-screen"    : null;

  if (!screenId) return;

  const screen = document.getElementById(screenId);
  if (!screen) return;

  // Update nav active within this sidebar
  const sidebar = navEl.closest(".sidebar");
  if (sidebar) {
    sidebar.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item === navEl);
    });
  }

  // Update panels within this screen
  screen.querySelectorAll(".role-panel").forEach(p => {
    const id = p.getAttribute("data-panel-id");
    p.classList.toggle("active", id === panelId);
  });
}

// COUNSELOR: open student profile (for now just opens detail drawer)
function openStudentProfile() {
  // In a richer version you'd navigate into a full student profile.
  // For this prototype we just open the drawer on the dashboard context.
  openScoreDetail("counselor");
}

// COUNSELOR: dashboard snapshot toggle
function setSnapshotMode(mode) {
  // Toggle tab active
  document.querySelectorAll("#counselor-screen .score-tabs .score-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-mode") === mode);
  });

  const numEl   = document.getElementById("snapshot-score-number");
  const labelEl = document.getElementById("snapshot-score-label");
  const descEl  = document.getElementById("snapshot-score-desc");
  const cardEl  = document.querySelector("#counselor-screen .snapshot-card");

  if (!numEl || !labelEl || !descEl || !cardEl) return;

  if (mode === "counselor") {
    numEl.textContent   = "6.4";
    labelEl.textContent = "Counselor score";
    descEl.textContent  = "Your adjusted view of Sara’s readiness. AI baseline currently 6.7.";
  } else {
    numEl.textContent   = "6.7";
    labelEl.textContent = "AI system score";
    descEl.textContent  = "Derived from academics, rigor, ECs, leadership, skills and essays. Counselor currently at 6.4.";
  }

  cardEl.setAttribute("data-mode", mode);
}

// COUNSELOR: dashboard -> drawer
function openSnapshotScore() {
  const cardEl = document.querySelector("#counselor-screen .snapshot-card");
  const mode = cardEl ? (cardEl.getAttribute("data-mode") || "counselor") : "counselor";
  openScoreDetail(mode === "system" ? "system" : "counselor");
}

function openSnapshotSubscore(label, sysVal, counselVal) {
  openSubscore(label, sysVal, counselVal);
}

// COUNSELOR: drawer logic
function openScoreDetail(type) {
  const titleEl = document.getElementById("drawer-title");
  const bodyEl  = document.getElementById("drawer-body");
  const trendMeta    = document.getElementById("trend-meta");
  const trendSummary = document.getElementById("trend-summary");
  const notesSection = document.getElementById("counselor-notes-section");
  const drawer       = document.getElementById("drawer");

  if (!titleEl || !bodyEl || !trendMeta || !trendSummary || !notesSection || !drawer) return;

  if (type === "system") {
    titleEl.textContent = "System readiness score — 6.7 / 10";
    bodyEl.textContent =
      "This score is generated automatically from academics, course rigor, extracurriculars, leadership, skills, consistency, and essays.";
    trendMeta.textContent =
      "Δ +0.3 in last 30 days · Δ +1.1 in last 6 months · Avg change +0.08 / month.";
    trendSummary.textContent =
      "AI view: Sara’s system score has improved steadily as academics and rigor strengthened, but further gains depend on leadership and essay quality.";
    notesSection.style.display = "none";
  } else {
    titleEl.textContent = "Counselor readiness score — 6.4 / 10";
    bodyEl.textContent =
      "Your adjusted readiness score for Sara. Use this to reflect nuances the system may under- or over-weight.";
    trendMeta.textContent =
      "Example: You’ve held the score slightly below the system level while you wait for more consistent leadership and follow-through.";
    trendSummary.textContent =
      "AI summary (example): Your notes emphasize real-world maturity and independence that aren’t fully captured in the system inputs.";
    notesSection.style.display = "block";
  }

  drawer.style.display = "flex";
}

function openSubscore(label, sysVal, counselVal) {
  const titleEl = document.getElementById("drawer-title");
  const bodyEl  = document.getElementById("drawer-body");
  const trendMeta    = document.getElementById("trend-meta");
  const trendSummary = document.getElementById("trend-summary");
  const notesSection = document.getElementById("counselor-notes-section");
  const drawer       = document.getElementById("drawer");

  if (!titleEl || !bodyEl || !trendMeta || !trendSummary || !notesSection || !drawer) return;

  titleEl.textContent =
    `${label} — System ${sysVal}/10 · Counselor ${counselVal}/10`;
  bodyEl.textContent =
    `System score for ${label.toLowerCase()} is ${sysVal}/10, with your counselor view at ${counselVal}/10. `
    + "In a full build, this panel would show GPA, coursework, activities, or essay evidence that drives this subscore.";
  trendMeta.textContent =
    `Example: ${label} has improved slightly over the last term as new achievements were recorded.`;
  trendSummary.textContent =
    `AI interpretation placeholder for ${label}: where improvements have come from and what would move this closer to a 9 or 10.`;
  notesSection.style.display = "block";

  drawer.style.display = "flex";
}

function closeDrawer() {
  const drawer = document.getElementById("drawer");
  if (drawer) drawer.style.display = "none";
}

// STUDENT: score toggle (dashboard + readiness panel)
function setStudentScoreMode(mode, detailOnly) {
  // Toggle tabs in whichever panel is visible
  document.querySelectorAll("#student-screen .score-tabs .score-tab").forEach(tab => {
    const m = tab.getAttribute("data-mode");
    if (!detailOnly) {
      tab.classList.toggle("active", m === mode);
    } else {
      // If called from detail panel "only", we only update tabs in that panel
      const panel = tab.closest(".role-panel");
      if (panel && panel.getAttribute("data-panel-id") === "s-readiness") {
        tab.classList.toggle("active", m === mode);
      }
    }
  });

  const aiScore = 6.7;
  const counselorScore = 6.4;

  // Dashboard card
  if (!detailOnly) {
    const dashNum   = document.getElementById("student-score-number");
    const dashLabel = document.getElementById("student-score-label");
    const dashDesc  = document.getElementById("student-score-desc");
    if (dashNum && dashLabel && dashDesc) {
      if (mode === "counselor") {
        dashNum.textContent   = counselorScore.toFixed(1);
        dashLabel.textContent = "Counselor readiness";
        dashDesc.textContent  =
          "This is your counselor’s view, based on their experience and everything they know about you.";
      } else {
        dashNum.textContent   = aiScore.toFixed(1);
        dashLabel.textContent = "AI readiness";
        dashDesc.textContent  =
          "This score is based on your grades, courses, activities, leadership, skills and essays so far.";
      }
    }
  }

  // Readiness detail card
  const detailNum   = document.getElementById("student-score-number-detail");
  const detailLabel = document.getElementById("student-score-label-detail");
  const detailDesc  = document.getElementById("student-score-desc-detail");
  if (detailNum && detailLabel && detailDesc) {
    if (mode === "counselor") {
      detailNum.textContent   = counselorScore.toFixed(1);
      detailLabel.textContent = "Counselor readiness";
      detailDesc.textContent  =
        "This is the counselor’s score, taking into account context the AI might not fully see.";
    } else {
      detailNum.textContent   = aiScore.toFixed(1);
      detailLabel.textContent = "AI readiness";
      detailDesc.textContent  =
        "This is the AI’s score, based purely on the data in your profile.";
    }
  }
}