const countdown = document.getElementById('countdown');
const endDate = new Date('2025-07-31');
function updateCountdown() {
  const now = new Date();
  const days = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
  countdown.textContent = `${days} days left until GMAT day`;
}
updateCountdown();

const topics = [
  { title: 'Arithmetic Basics', video: 'DfoK59HOI2s', questions: 25 },
  { title: 'Word Problems', video: 'TbUfS98gGAA', questions: 20 },
  { title: 'Algebra', video: 'xEmQZTeo6hg', questions: 20 },
  { title: 'Data Sufficiency', video: 'ZWQTuCv8XMM', questions: 15 },
  { title: 'Geometry', video: 'DfoK59HOI2s', questions: 20 }
];

const start = new Date();
const todo = document.querySelector('[data-status="todo"]');

for (let i = 0; i < 30; i++) {
  const d = new Date(start);
  d.setDate(start.getDate() + i);
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const t = topics[i % topics.length];

  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-title', t.title);
  card.setAttribute('data-qs', t.questions);
  card.setAttribute('data-video', t.video);
  card.innerHTML = `<div><b>${dateStr}</b><br/>${t.title} – ${t.questions} Qs</div>`;
  card.setAttribute('draggable', 'true');
  card.addEventListener('click', showModal);
  todo.appendChild(card);
}

let dragCard = null;
document.addEventListener('dragstart', e => {
  if (e.target.classList.contains('card')) {
    dragCard = e.target;
    e.dataTransfer.setData('text/plain', null);
  }
});
document.addEventListener('dragend', () => dragCard = null);
document.querySelectorAll('.column').forEach(col => {
  col.addEventListener('dragover', e => e.preventDefault());
  col.addEventListener('drop', e => {
    e.preventDefault();
    if (dragCard) col.appendChild(dragCard);
    saveState();
  });
});

function saveState() {
  const state = {};
  document.querySelectorAll('.column').forEach(col => {
    const stat = col.getAttribute('data-status');
    state[stat] = Array.from(col.children)
      .filter(el => el.classList.contains('card'))
      .map(el => el.outerHTML);
  });
  localStorage.setItem('kanbanState', JSON.stringify(state));
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem('kanbanState'));
  if (!saved) return;
  Object.entries(saved).forEach(([status, cards]) => {
    const col = document.querySelector(`[data-status="${status}"]`);
    col.innerHTML = `<h2>${col.querySelector('h2').textContent}</h2>`;
    cards.forEach(html => {
      const div = document.createElement('div');
      div.outerHTML = html;
      const node = div.nextSibling;
      node.addEventListener('click', showModal);
      col.appendChild(node);
    });
  });
}
loadState();

function showModal(e) {
  const el = e.currentTarget;
  const title = el.getAttribute('data-title');
  const qs = el.getAttribute('data-qs');
  const video = el.getAttribute('data-video');

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = `Practice ${qs} questions on ${title}`;
  document.getElementById('modal-video').innerHTML =
    `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${video}" frameborder="0" allowfullscreen></iframe>`;
  document.getElementById('modal').classList.remove('hidden');
}

document.getElementById('modal-close')
  .addEventListener('click', () => document.getElementById('modal').classList.add('hidden'));

const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'dayGridMonth',
  events: Array.from(document.querySelectorAll('.card')).map((el, idx) => ({
    title: el.getAttribute('data-title'),
    start: new Date(start.getTime() + idx * 86400000).toISOString().split('T')[0]
  }))
});
calendar.render();
