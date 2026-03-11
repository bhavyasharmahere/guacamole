// day.js
// Edit the year here if you want a different year
const YEAR = 2026;

// Exam definitions
const exams = {
  math: { name: "Mathematics", date: new Date(`${YEAR}-05-15T09:00:00`) },
  science: { name: "Science", date: new Date(`${YEAR}-05-19T09:00:00`) },
  social: { name: "Social Science", date: new Date(`${YEAR}-05-22T09:00:00`) },
  language: { name: "Language Subject", date: new Date(`${YEAR}-05-26T09:00:00`) }
};

// DOM references
const examButtons = Array.from(document.querySelectorAll('.exam-btn'));
const examNameEl = document.getElementById('examName');
const examDateEl = document.getElementById('examDate');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const countdownCard = document.getElementById('countdownCard');
const compactToggle = document.getElementById('compactToggle');
const remindBtn = document.getElementById('remindBtn');
const copyBtn = document.getElementById('copyBtn');

let activeKey = 'math';
let timerId = null;

// Utility to format date nicely
function formatDate(d){
  return d.toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

// Set active exam
function setActive(key){
  activeKey = key;
  examButtons.forEach(btn => {
    const is = btn.dataset.key === key;
    btn.setAttribute('aria-selected', is ? 'true' : 'false');
  });
  const exam = exams[key];
  examNameEl.textContent = exam.name;
  examDateEl.textContent = formatDate(exam.date);
  update(); // immediate update
}

// Calculate and update countdown and progress
function update(){
  const now = new Date();
  const exam = exams[activeKey];
  const target = exam.date;
  const totalMs = target - now;

  if (totalMs <= 0){
    daysEl.textContent = '0';
    hoursEl.textContent = '0';
    minutesEl.textContent = '0';
    secondsEl.textContent = '0';
    progressFill.style.width = '100%';
    progressLabel.textContent = 'Exam time reached';
    return;
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2,'0');
  minutesEl.textContent = String(minutes).padStart(2,'0');
  secondsEl.textContent = String(seconds).padStart(2,'0');

  // Progress calculation from now until exam relative to start of year or previous milestone
  // We'll show progress from now until exam relative to the month start for a visual cue
  const startWindow = new Date(now.getFullYear(), now.getMonth(), 1);
  const windowTotal = target - startWindow;
  const windowPassed = now - startWindow;
  let pct = 0;
  if (windowTotal > 0) pct = Math.min(100, Math.max(0, (windowPassed / windowTotal) * 100));
  progressFill.style.width = pct + '%';
  progressLabel.textContent = `Progress ${Math.round(pct)}% of month window`;
}

// Wire up buttons
examButtons.forEach(btn => {
  btn.addEventListener('click', () => setActive(btn.dataset.key));
});

// Compact toggle
compactToggle.addEventListener('change', (e) => {
  if (e.target.checked) document.body.classList.add('compact');
  else document.body.classList.remove('compact');
});

// Reminder button behavior
remindBtn.addEventListener('click', () => {
  const exam = exams[activeKey];
  const text = `Reminder set for ${exam.name} on ${formatDate(exam.date)}`;
  // We cannot create system reminders from a static page; show a friendly in-page confirmation
  remindBtn.textContent = 'Reminder Saved';
  remindBtn.disabled = true;
  remindBtn.style.opacity = 0.9;
  setTimeout(() => {
    remindBtn.textContent = 'Set Reminder';
    remindBtn.disabled = false;
    remindBtn.style.opacity = 1;
  }, 2500);
  // Also show a small accessible announcement
  countdownCard.setAttribute('aria-live','polite');
  progressLabel.textContent = text;
});

// Copy date to clipboard
copyBtn.addEventListener('click', async () => {
  const exam = exams[activeKey];
  const txt = `${exam.name} — ${formatDate(exam.date)}`;
  try {
    await navigator.clipboard.writeText(txt);
    copyBtn.textContent = 'Copied';
    setTimeout(()=> copyBtn.textContent = 'Copy Date', 1500);
  } catch (e) {
    copyBtn.textContent = 'Copy Failed';
    setTimeout(()=> copyBtn.textContent = 'Copy Date', 1500);
  }
});

// Start timer
function startTimer(){
  if (timerId) clearInterval(timerId);
  update();
  timerId = setInterval(update, 1000);
}

// Initialize
setActive(activeKey);
startTimer();
