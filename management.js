// ── DATA ──
const stats = [
  { label: 'Total Fields',    val: '8',      sub: '120 Acres total',    color: '#2d6a4f' },
  { label: 'Active Crops',    val: '5',      sub: '3 near harvest',     color: '#52b788' },
  { label: 'Workers Today',   val: '24',     sub: '4 on leave',         color: '#f4a261' },
  { label: 'Revenue (Month)', val: '₹4.2L',  sub: '↑ 12% vs last month',color: '#0077b6' },
  { label: 'Expenses',        val: '₹1.8L',  sub: '↓ 5% vs last month', color: '#e63946' },
  { label: 'Yield (Qtl)',     val: '340',    sub: 'This season',        color: '#6a0dad' },
];

const cropRows = [
  { crop: '🌾 Wheat',    field: 'Field A', planted: '2024-11-10', harvest: '2025-03-20', status: 'Growing',   health: 85 },
  { crop: '🍚 Rice',     field: 'Field B', planted: '2025-06-01', harvest: '2025-10-15', status: 'Planted',   health: 70 },
  { crop: '🌽 Maize',    field: 'Field C', planted: '2025-05-15', harvest: '2025-09-10', status: 'Growing',   health: 90 },
  { crop: '🧅 Onion',    field: 'Field D', planted: '2024-12-01', harvest: '2025-04-30', status: 'Harvested', health: 100 },
  { crop: '🍅 Tomato',   field: 'Field E', planted: '2025-04-01', harvest: '2025-07-20', status: 'Flowering', health: 78 },
];

const inventory = [
  { item: 'Urea Fertilizer',  cat: 'Fertilizer', stock: 500,  unit: 'kg',    status: 'Good' },
  { item: 'DAP Fertilizer',   cat: 'Fertilizer', stock: 80,   unit: 'kg',    status: 'Low' },
  { item: 'Pesticide A',      cat: 'Pesticide',  stock: 25,   unit: 'liters',status: 'Low' },
  { item: 'Wheat Seeds',      cat: 'Seeds',      stock: 1200, unit: 'kg',    status: 'Good' },
  { item: 'Diesel',           cat: 'Fuel',       stock: 300,  unit: 'liters',status: 'Good' },
  { item: 'Irrigation Pipes', cat: 'Equipment',  stock: 5,    unit: 'units', status: 'Critical' },
];

const workers = [
  { name: 'Ramesh Singh',  role: 'Field Supervisor', field: 'Field A', status: 'Present' },
  { name: 'Suresh Kumar',  role: 'Tractor Operator', field: 'Field B', status: 'Present' },
  { name: 'Priya Devi',    role: 'Crop Inspector',   field: 'Field C', status: 'Leave' },
  { name: 'Mohan Lal',     role: 'Irrigation Tech',  field: 'Field D', status: 'Present' },
  { name: 'Anita Sharma',  role: 'Harvest Worker',   field: 'Field E', status: 'Present' },
  { name: 'Vijay Yadav',   role: 'Pesticide Sprayer',field: 'Field A', status: 'Leave' },
];

let tasks = [
  { text: 'Irrigate Field B',          priority: 'High',   due: '2025-06-05', done: false },
  { text: 'Apply fertilizer – Field C', priority: 'Medium', due: '2025-06-07', done: false },
  { text: 'Service tractor engine',    priority: 'Low',    due: '2025-06-10', done: true  },
  { text: 'Soil test – Field A',       priority: 'High',   due: '2025-06-04', done: false },
  { text: 'Order DAP fertilizer',      priority: 'Medium', due: '2025-06-06', done: false },
];

// ── HELPERS ──
function badgeClass(val) {
  if (['Good','Present','Growing','Flowering'].includes(val)) return 'badge-green';
  if (['Low','Leave','Planted'].includes(val))                return 'badge-yellow';
  return 'badge-red';
}

function renderBar(containerId, data, color) {
  const max = Math.max(...data.map(d => d.val));
  document.getElementById(containerId).innerHTML = data.map(d => `
    <div class="bar" style="height:${Math.round((d.val/max)*100)}%;background:${color || 'var(--light-green)'}">
      <span>${d.label}</span>
    </div>`).join('');
}

function renderTasks(listId, list) {
  document.getElementById(listId).innerHTML = list.map((t, i) => `
    <li>
      <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${i})">
      <span class="${t.done ? 'done' : ''}">${t.text}</span>
      <span class="badge ${t.priority === 'High' ? 'badge-red' : t.priority === 'Medium' ? 'badge-yellow' : 'badge-green'}">${t.priority}</span>
      <span style="margin-left:auto;font-size:.78rem;color:var(--gray)">📅 ${t.due}</span>
    </li>`).join('');
}

// ── INIT ──
function init() {
  // Stat cards
  document.getElementById('stat-cards').innerHTML = stats.map(s => `
    <div class="stat-card" style="border-left-color:${s.color}">
      <div class="s-label">${s.label}</div>
      <div class="s-val">${s.val}</div>
      <div class="s-sub">${s.sub}</div>
    </div>`).join('');

  // Charts
  renderBar('yield-chart', [
    {label:'Jan',val:40},{label:'Feb',val:55},{label:'Mar',val:80},{label:'Apr',val:65},
    {label:'May',val:90},{label:'Jun',val:70}
  ]);
  renderBar('revenue-chart', [
    {label:'Jan',val:3.2},{label:'Feb',val:2.8},{label:'Mar',val:4.5},{label:'Apr',val:3.9},
    {label:'May',val:4.2},{label:'Jun',val:3.6}
  ], '#f4a261');

  // Quick tasks (dashboard)
  renderTasks('quick-tasks', tasks.slice(0, 4));

  // Crop table
  document.getElementById('crop-table').innerHTML = cropRows.map(r => `
    <tr>
      <td>${r.crop}</td>
      <td>${r.field}</td>
      <td>${r.planted}</td>
      <td>${r.harvest}</td>
      <td><span class="badge ${badgeClass(r.status)}">${r.status}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:.5rem">
          <div class="progress-bar" style="width:80px">
            <div class="progress-fill" style="width:${r.health}%;background:${r.health>80?'var(--light-green)':r.health>60?'#ffc107':'#e63946'}"></div>
          </div>
          <span style="font-size:.8rem">${r.health}%</span>
        </div>
      </td>
    </tr>`).join('');

  // Inventory stats
  document.getElementById('inv-stats').innerHTML = [
    { label: 'Total Items',    val: inventory.length,                                  sub: 'In stock' },
    { label: 'Low Stock',      val: inventory.filter(i => i.status === 'Low').length,  sub: 'Need reorder' },
    { label: 'Critical',       val: inventory.filter(i => i.status === 'Critical').length, sub: 'Urgent' },
  ].map(s => `
    <div class="stat-card">
      <div class="s-label">${s.label}</div>
      <div class="s-val">${s.val}</div>
      <div class="s-sub">${s.sub}</div>
    </div>`).join('');

  document.getElementById('inv-table').innerHTML = inventory.map(i => `
    <tr>
      <td>${i.item}</td>
      <td>${i.cat}</td>
      <td>${i.stock}</td>
      <td>${i.unit}</td>
      <td><span class="badge ${badgeClass(i.status)}">${i.status}</span></td>
    </tr>`).join('');

  // Workers
  document.getElementById('worker-cards').innerHTML = workers.map(w => `
    <div class="card">
      <div class="icon">👤</div>
      <h3>${w.name}</h3>
      <p>${w.role}</p>
      <p style="margin-top:.3rem;font-size:.82rem;color:var(--gray)">${w.field}</p>
      <span class="badge ${badgeClass(w.status)}" style="margin-top:.5rem;display:inline-block">${w.status}</span>
    </div>`).join('');

  // All tasks
  renderTasks('all-tasks', tasks);

  // Reports
  document.getElementById('report-stats').innerHTML = [
    { label: 'Total Yield',    val: '340 Qtl', sub: 'This season' },
    { label: 'Water Used',     val: '18,400 L', sub: 'This month' },
    { label: 'Profit Margin',  val: '57%',     sub: 'Revenue – Expense' },
    { label: 'Crop Loss',      val: '2.3%',    sub: 'Due to pests' },
  ].map(s => `
    <div class="stat-card">
      <div class="s-label">${s.label}</div>
      <div class="s-val">${s.val}</div>
      <div class="s-sub">${s.sub}</div>
    </div>`).join('');

  renderBar('crop-yield-chart', [
    {label:'Wheat',val:120},{label:'Rice',val:80},{label:'Maize',val:60},
    {label:'Onion',val:50},{label:'Tomato',val:30}
  ]);
  renderBar('water-chart', [
    {label:'Wk1',val:4200},{label:'Wk2',val:3800},{label:'Wk3',val:5100},{label:'Wk4',val:5300}
  ], '#0077b6');
}

// ── SIDEBAR NAVIGATION ──
document.querySelectorAll('.sidebar ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const tab = link.dataset.tab;
    document.querySelectorAll('.sidebar ul li a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
  });
});

// ── INNER TABS (Crop Management) ──
document.querySelectorAll('[data-inner]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-inner]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.inner;
    document.getElementById('inner-crop-list').style.display = target === 'crop-list' ? 'block' : 'none';
    document.getElementById('inner-add-crop').style.display  = target === 'add-crop'  ? 'block' : 'none';
  });
});

// ── TASKS ──
function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks('all-tasks', tasks);
  renderTasks('quick-tasks', tasks.slice(0, 4));
}

function addTask() {
  const text = document.getElementById('new-task-input').value.trim();
  const priority = document.getElementById('task-priority').value;
  const due = document.getElementById('task-due').value || '2025-06-30';
  if (!text) return alert('Please enter a task name.');
  tasks.unshift({ text, priority, due, done: false });
  renderTasks('all-tasks', tasks);
  renderTasks('quick-tasks', tasks.slice(0, 4));
  document.getElementById('new-task-input').value = '';
}

init();
