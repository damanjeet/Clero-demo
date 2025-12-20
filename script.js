function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showPanel(id) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const nav = document.querySelector(`[onclick="showPanel('${id}')"]`);
  if (nav) nav.classList.add("active");
}

function openStudentProfile() {
  showPanel("c-student-profile");
}

function openDrawer(title) {
  document.getElementById("drawer-title").innerText = title;
  document.getElementById("drawer").classList.add("open");
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
}
