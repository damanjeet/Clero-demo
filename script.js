// basic state 
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');
const loginBtn = document.getElementById('login-btn');
const themeToggle = document.getElementById('theme-toggle');
const indicatorModal = document.getElementById('indicator-modal');
const modalClose = document.getElementById('modal-close');

const indicatorData = {
  technical: [
    { name: "Problem Solving", score: 8.5, desc: "Ability to break down complex problems.", sources: ["Peer reviews", "Project outcomes"] },
    { name: "System Design", score: 8.0, desc: "Designs scalable systems.", sources: ["Design docs", "Tech reviews"] },
    { name: "Code Quality", score: 7.8, desc: "Maintains clean, readable code.", sources: ["PR comments"] },
    { name: "Execution Speed", score: 8.2, desc: "Delivers features on time.", sources: ["Sprint reports"] },
    { name: "Product Understanding", score: 8.0, desc: "Understands product goals.", sources: ["PM feedback"] },
    { name: "Technical Communication", score: 7.5, desc: "Explains technical decisions clearly.", sources: ["Meeting notes"] },
    { name: "Mentorship", score: 7.9, desc: "Supports junior engineers.", sources: ["Peer feedback"] },
    { name: "Innovation / Experimentation", score: 8.4, desc: "Suggests improvements.", sources: ["Idea portal"] },
    { name: "Reliability / Debugging", score: 8.7, desc: "Resolves issues quickly.", sources: ["Incident reports"] },
    { name: "Technical Growth", score: 8.1, desc: "Keeps up with new tools.", sources: ["Learning logs"] },
  ],
  leadership: [
    { name: "Decision Making", score: 8.8, desc: "Makes informed decisions.", sources: ["Manager review"] },
    { name: "Team Influence", score: 9.0, desc: "Positively influences stakeholders.", sources: ["360 feedback"] },
    { name: "Strategic Thinking", score: 8.4, desc: "Thinks beyond immediate tasks.", sources: ["Manager review"] },
    { name: "Ownership & Accountability", score: 8.9, desc: "Takes responsibility.", sources: ["Project retros"] },
    { name: "Delegation", score: 8.0, desc: "Delegates effectively.", sources: ["Team feedback"] },
    { name: "Conflict Resolution", score: 7.9, desc: "Resolves team conflicts.", sources: ["HR notes"] },
    { name: "Coaching", score: 8.3, desc: "Develops team talent.", sources: ["Direct report feedback"] },
    { name: "Cross-functional Collaboration", score: 8.7, desc: "Works well with PM/Design.", sources: ["PM feedback"] },
    { name: "Vision Communication", score: 8.2, desc: "Communicates direction.", sources: ["Leadership review"] },
    { name: "Leading by Example", score: 9.1, desc: "Models desired behaviors.", sources: ["Manager review"] },
  ],
  communication: [
    { name: "Active Listening", score: 7.5, desc: "Shows understanding of others' points.", sources: ["Peer feedback"] },
    { name: "Verbal Clarity", score: 7.0, desc: "Explains topics clearly.", sources: ["Meeting notes"] },
    { name: "Written Communication", score: 7.3, desc: "Writes concise updates.", sources: ["Email reviews"] },
    { name: "Presentation Skills", score: 7.2, desc: "Presents to leadership.", sources: ["Stakeholder feedback"] },
    { name: "Stakeholder Management", score: 7.5, desc: "Manages expectations.", sources: ["PM feedback"] },
    { name: "Persuasion & Influence", score: 7.0, desc: "Drives alignment.", sources: ["Cross-team feedback"] },
    { name: "Feedback Delivery", score: 7.7, desc: "Delivers actionable feedback.", sources: ["Team feedback"] },
    { name: "Transparency in Updates", score: 7.6, desc: "Keeps everyone informed.", sources: ["Project updates"] },
    { name: "Cross-team Communication", score: 7.2, desc: "Works across org boundaries.", sources: ["Peer feedback"] },
    { name: "Executive Communication", score: 6.8, desc: "Needs more brevity.", sources: ["Leadership notes"] },
  ],
  innovation: [
    { name: "Creativity", score: 8.0, desc: "Proposes novel solutions.", sources: ["Idea board"] },
    { name: "Initiative Taking", score: 8.1, desc: "Acts without being asked.", sources: ["Manager review"] },
    { name: "Experimentation", score: 7.9, desc: "Tests new approaches.", sources: ["Project logs"] },
    { name: "Risk Assessment", score: 7.8, desc: "Balances impact and risk.", sources: ["Retros"] },
    { name: "Learning Agility", score: 8.2, desc: "Learns new domains quickly.", sources: ["Learning logs"] },
    { name: "Trend Awareness", score: 7.7, desc: "Follows market/tech trends.", sources: ["PM feedback"] },
    { name: "Continuous Improvement", score: 8.3, desc: "Improves processes.", sources: ["Team feedback"] },
    { name: "Collaborative Ideation", score: 8.1, desc: "Ideates with team.", sources: ["Workshop notes"] },
    { name: "Product Impact", score: 8.0, desc: "Ideas make it into roadmap.", sources: ["Product board"] },
    { name: "Innovation Culture", score: 8.0, desc: "Encourages others to innovate.", sources: ["Peer feedback"] },
  ]
};

const feedbackData = [
  {
    source: "Peer (Engineering)",
    date: "2025-10-01",
    text: "Raj provided timely guidance on the integration work and unblocked the team without escalation."
  },
  {
    source: "Manager",
    date: "2025-09-26",
    text: "Strong ownership on the Q3 deliverables. Could make activity updates more concise for senior forums."
  },
  {
    source: "PM Partner",
    date: "2025-09-20",
    text: "Collaboration has been very good. Appreciated the proactive identification of risks."
  },
  {
    source: "Design",
    date: "2025-09-15",
    text: "Would like to see Raj involve design earlier in technical scoping."
  }
];

const actionPlanData = {
  shortTerm: [
    {
      title: "Document weekly progress updates for leadership",
      indicator: "Communication → Executive Communication",
      due: "In 2 weeks",
      courses: ["Effective Exec Communication – LinkedIn Learning"]
    },
    {
      title: "Schedule 1:1 mentoring session for junior engineer",
      indicator: "Leadership → Coaching",
      due: "Next 10 days",
      courses: ["Coaching Skills for Leaders – Coursera"]
    },
  ],
  longTerm: [
    {
      title: "Lead cross-functional initiative for Q1",
      indicator: "Leadership → Cross-functional Collaboration",
      due: "Next quarter",
      courses: ["Strategic Leadership – Udemy"]
    },
    {
      title: "Publish internal design doc on new service",
      indicator: "Technical → System Design",
      due: "Next quarter",
      courses: ["Scalable System Design – Coursera"]
    }
  ]
};

const kanbanData = {
  todo: [
    "Enroll in exec communication micro-course",
    "Draft Q1 cross-functional project proposal"
  ],
  "in-progress": [
    "Mentorship session with junior engineer"
  ],
  done: [
    "Weekly status update template created"
  ]
};

// init function
function initDemo() {
  // growth sections
  const growthSections = document.getElementById('growth-sections');
  const sectionData = [
    { name: "Technical", score: 8.5, desc: "Consistent delivery and code quality.", page: "insight-technical" },
    { name: "Leadership", score: 8.8, desc: "Strong influence across teams.", page: "insight-leadership" },
    { name: "Communication", score: 7.2, desc: "Clear but can be more concise.", page: "insight-communication" },
    { name: "Innovation", score: 8.0, desc: "Regular contribution of new ideas.", page: "insight-innovation" },
  ];
  growthSections.innerHTML = "";
  sectionData.forEach(sec => {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.dataset.page = `insight-${sec.name.toLowerCase()}`;
    div.innerHTML = `
      <div class="section-card-title">${sec.name}</div>
      <div class="section-score">${sec.score}</div>
      <p class="muted small">${sec.desc}</p>
    `;
    div.addEventListener('click', () => navigateTo(`insight-${sec.name.toLowerCase()}`));
    growthSections.appendChild(div);
  });

  // fill indicators
  fillIndicators('technical-indicators', indicatorData.technical);
  fillIndicators('leadership-indicators', indicatorData.leadership);
  fillIndicators('communication-indicators', indicatorData.communication);
  fillIndicators('innovation-indicators', indicatorData.innovation);

  // fill feedback
  const fl = document.getElementById('feedback-list');
  fl.innerHTML = "";
  feedbackData.forEach(f => {
    const li = document.createElement('li');
    li.className = 'feedback-item';
    li.innerHTML = `
      <div class="feedback-meta">${f.source} • ${f.date}</div>
      <div>${f.text}</div>
    `;
    fl.appendChild(li);
  });

  // fill action plan
  const ap = document.getElementById('action-plan');
  ap.innerHTML = `
    <div>
      <div class="action-group-title">Short-term</div>
      ${actionPlanData.shortTerm.map(a => `
        <div class="action-item">
          <div><strong>${a.title}</strong></div>
          <div class="action-meta">${a.indicator}</div>
          <div class="action-meta">Due: ${a.due}</div>
          <div class="action-tag">Suggested course: ${a.courses[0]}</div>
        </div>
      `).join('')}
    </div>
    <div>
      <div class="action-group-title">Long-term</div>
      ${actionPlanData.longTerm.map(a => `
        <div class="action-item">
          <div><strong>${a.title}</strong></div>
          <div class="action-meta">${a.indicator}</div>
          <div class="action-meta">Due: ${a.due}</div>
          <div class="action-tag">Suggested course: ${a.courses[0]}</div>
        </div>
      `).join('')}
    </div>
  `;

  // fill kanban
  Object.keys(kanbanData).forEach(col => {
    const list = document.querySelector(`.kanban-list[data-col="${col}"]`);
    list.innerHTML = "";
    kanbanData[col].forEach(item => {
      const div = document.createElement('div');
      div.className = 'kanban-card';
      div.textContent = item;
      list.appendChild(div);
    });
  });
}

function fillIndicators(containerId, indicators) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  indicators.forEach(ind => {
    const div = document.createElement('div');
    div.className = 'indicator-card';
    const scoreClass = ind.score >= 8 ? "high" : ind.score >= 6 ? "mid" : "low";
    div.innerHTML = `
      <div class="indicator-card-header">
        <div class="indicator-name">${ind.name}</div>
        <div class="indicator-score ${scoreClass}">${ind.score.toFixed(1)}</div>
      </div>
      <div class="bench-bar" style="margin: 4px 0 6px 0;">
        <div class="bench-fill" style="width:${ind.score * 10}%"></div>
      </div>
      <div class="indicator-desc">${ind.desc}</div>
      <button class="info-btn" aria-label="More info">More info</button>
    `;
    const infoBtn = div.querySelector('.info-btn');
    infoBtn.addEventListener('click', () => openIndicatorModal(ind));
    container.appendChild(div);
  });
}

// navigation
function navigateTo(pageName) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${pageName}`);
  if (target) target.classList.add('active');

  navItems.forEach(n => n.classList.remove('active'));
  const btn = document.querySelector(`.nav-item[data-page="${pageName}"]`);
  if (btn) btn.classList.add('active');

  // page title
  const title = pageName
    .replace('insight-', 'Insight › ')
    .replace('feedback-', 'Feedback › ')
    .replace('actions-', 'Actions › ')
    .replace('growth', 'Growth Meter');
  pageTitle.textContent = title;
}

// modal
function openIndicatorModal(indicator) {
  indicatorModal.classList.remove('hidden');
  document.getElementById('modal-title').textContent = indicator.name;
  document.getElementById('modal-score').textContent = `Score: ${indicator.score.toFixed(1)} / 10`;
  document.getElementById('modal-desc').textContent = indicator.desc;
  const ul = document.getElementById('modal-sources');
  ul.innerHTML = "";
  indicator.sources.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    ul.appendChild(li);
  });
}

function closeModal() {
  indicatorModal.classList.add('hidden');
}

// theme toggle
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
  }
}

// login
loginBtn.addEventListener('click', () => {
  loginScreen.classList.add('hidden');
  mainApp.classList.remove('hidden');
});

// sidebar clicks
navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    navigateTo(page);
  });
});

// theme
themeToggle.addEventListener('click', toggleTheme);

// modal
modalClose.addEventListener('click', closeModal);
indicatorModal.addEventListener('click', (e) => {
  if (e.target === indicatorModal) closeModal();
});

// init
document.addEventListener('DOMContentLoaded', initDemo);