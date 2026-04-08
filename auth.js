// ── SESSION HELPERS ──
function getUsers()    { return JSON.parse(localStorage.getItem('agro_users') || '[]'); }
function saveUsers(u)  { localStorage.setItem('agro_users', JSON.stringify(u)); }
function setSession(u) { localStorage.setItem('agro_session', JSON.stringify(u)); }
function getSession()  { return JSON.parse(localStorage.getItem('agro_session') || 'null'); }
function clearSession(){ localStorage.removeItem('agro_session'); }

// Seed a default admin account on first load
(function seedDefaults() {
  const users = getUsers();
  if (!users.find(u => u.email === 'admin@agroconnect.in')) {
    users.push({ name: 'Admin', email: 'admin@agroconnect.in', phone: '', password: 'Admin@123', role: 'admin' });
    users.push({ name: 'Farm Manager', email: 'manager@agroconnect.in', phone: '', password: 'Manager@123', role: 'manager' });
    saveUsers(users);
  }
})();

// ── TAB SWITCH ──
function switchTab(tab) {
  document.getElementById('login-form').classList.toggle('active',  tab === 'login');
  document.getElementById('signup-form').classList.toggle('active', tab === 'signup');
  document.getElementById('tab-login-btn').classList.toggle('active',  tab === 'login');
  document.getElementById('tab-signup-btn').classList.toggle('active', tab === 'signup');
}

// ── SHOW / HIDE MESSAGES ──
function showError(id, msg)   { const el = document.getElementById(id); el.textContent = msg; el.style.display = 'block'; }
function hideMsg(id)          { document.getElementById(id).style.display = 'none'; }
function showSuccess(id, msg) { const el = document.getElementById(id); el.textContent = msg; el.style.display = 'block'; }

// ── PASSWORD TOGGLE ──
function togglePw(inputId, icon) {
  const inp = document.getElementById(inputId);
  if (inp.type === 'password') { inp.type = 'text';     icon.textContent = '🙈'; }
  else                         { inp.type = 'password'; icon.textContent = '👁️'; }
}

// ── PASSWORD STRENGTH ──
function checkStrength(val) {
  let score = 0;
  if (val.length >= 8)          score++;
  if (/[A-Z]/.test(val))        score++;
  if (/[0-9]/.test(val))        score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const colors = ['', '#e63946', '#f4a261', '#ffc107', '#52b788'];
  for (let i = 1; i <= 4; i++) {
    document.getElementById('s' + i).style.background = i <= score ? colors[score] : '#eee';
  }
}

// ── ROLE INFO ──
const roleDescriptions = {
  public:  'Access to public portal: crops, weather, market prices & news.',
  manager: 'Full access to management portal: crops, inventory, workers & reports.',
  admin:   'Complete system control including user management and all portals.',
};
function updateRoleInfo() {
  const role = document.getElementById('signup-role').value;
  document.getElementById('role-info').textContent = roleDescriptions[role];
}

// ── LOGIN ──
function handleLogin(e) {
  e.preventDefault();
  hideMsg('login-error');
  hideMsg('login-success');

  const email    = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const role     = document.getElementById('login-role').value;
  const users    = getUsers();

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showError('login-error', '❌ Invalid email or password. Please try again.');
    return;
  }
  if (user.role !== role) {
    showError('login-error', `❌ This account is registered as "${user.role}", not "${role}".`);
    return;
  }

  setSession(user);
  showSuccess('login-success', `✅ Welcome back, ${user.name}! Redirecting...`);

  setTimeout(() => {
    window.location.href = role === 'public' ? 'index.html' : 'management.html';
  }, 1000);
}

// ── SIGNUP ──
function handleSignup(e) {
  e.preventDefault();
  hideMsg('signup-error');
  hideMsg('signup-success');

  const name     = document.getElementById('signup-name').value.trim();
  const email    = document.getElementById('signup-email').value.trim().toLowerCase();
  const phone    = document.getElementById('signup-phone').value.trim();
  const role     = document.getElementById('signup-role').value;
  const password = document.getElementById('signup-password').value;
  const confirm  = document.getElementById('signup-confirm').value;

  if (password !== confirm) {
    showError('signup-error', '❌ Passwords do not match.');
    return;
  }
  if (password.length < 6) {
    showError('signup-error', '❌ Password must be at least 6 characters.');
    return;
  }

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showError('signup-error', '❌ An account with this email already exists.');
    return;
  }

  users.push({ name, email, phone, password, role });
  saveUsers(users);
  setSession({ name, email, phone, role });

  showSuccess('signup-success', `✅ Account created! Welcome, ${name}! Redirecting...`);
  setTimeout(() => {
    window.location.href = role === 'public' ? 'index.html' : 'management.html';
  }, 1200);
}

// ── SOCIAL LOGIN (demo) ──
function socialLogin(provider) {
  alert(`${provider} login is not connected in this demo. Please use email/password.`);
}

// ── LOGOUT (called from other pages) ──
function logout() {
  clearSession();
  window.location.href = 'login.html';
}
