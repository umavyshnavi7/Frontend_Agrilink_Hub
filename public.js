const crops = [
  { icon: '🌾', name: 'Wheat',      season: 'Rabi',   soil: 'Loamy',   tip: 'Sow Oct–Nov, harvest Mar–Apr' },
  { icon: '🌽', name: 'Maize',      season: 'Kharif', soil: 'Sandy',   tip: 'Needs well-drained soil' },
  { icon: '🍚', name: 'Rice',       season: 'Kharif', soil: 'Clayey',  tip: 'Requires standing water' },
  { icon: '🫘', name: 'Soybean',    season: 'Kharif', soil: 'Loamy',   tip: 'Fix nitrogen naturally' },
  { icon: '🥔', name: 'Potato',     season: 'Rabi',   soil: 'Sandy',   tip: 'Cool climate preferred' },
  { icon: '🧅', name: 'Onion',      season: 'Rabi',   soil: 'Loamy',   tip: 'Avoid waterlogging' },
  { icon: '🍅', name: 'Tomato',     season: 'Zaid',   soil: 'Loamy',   tip: 'Needs staking support' },
  { icon: '🌻', name: 'Sunflower',  season: 'Kharif', soil: 'Loamy',   tip: 'Drought tolerant crop' },
];

const marketData = [
  { crop: '🌾 Wheat',     price: 2275, change: '+45',  dir: 'up',   market: 'Ludhiana' },
  { crop: '🍚 Rice',      price: 3100, change: '-20',  dir: 'down', market: 'Patna' },
  { crop: '🌽 Maize',     price: 1890, change: '+30',  dir: 'up',   market: 'Indore' },
  { crop: '🫘 Soybean',   price: 4500, change: '+80',  dir: 'up',   market: 'Nagpur' },
  { crop: '🥔 Potato',    price: 1200, change: '-50',  dir: 'down', market: 'Agra' },
  { crop: '🧅 Onion',     price: 2800, change: '+120', dir: 'up',   market: 'Nashik' },
];

const schemes = [
  { icon: '💰', name: 'PM-KISAN',          desc: '₹6000/year direct income support to farmers' },
  { icon: '🛡️', name: 'Fasal Bima Yojana', desc: 'Crop insurance against natural calamities' },
  { icon: '💧', name: 'Pradhan Mantri KSY', desc: 'Irrigation scheme – Har Khet Ko Pani' },
  { icon: '🌱', name: 'Soil Health Card',   desc: 'Free soil testing & nutrient recommendations' },
];

const news = [
  { emoji: '🌧️', bg: '#d1ecf1', title: 'IMD predicts above-normal monsoon for 2025', date: 'June 2, 2025' },
  { emoji: '💰', bg: '#d4edda', title: 'MSP for Kharif crops hiked by 5% this season', date: 'May 28, 2025' },
  { emoji: '🤖', bg: '#fff3cd', title: 'AI-powered drones now available for crop monitoring', date: 'May 20, 2025' },
  { emoji: '🌿', bg: '#fde8e8', title: 'Organic farming area doubles in Punjab & Haryana', date: 'May 15, 2025' },
  { emoji: '🚜', bg: '#e8d5f5', title: 'Subsidy on farm equipment extended till Dec 2025', date: 'May 10, 2025' },
  { emoji: '📊', bg: '#d1ecf1', title: 'Wheat export touches record 10 million tonnes', date: 'May 5, 2025' },
];

// Render crops
document.getElementById('crop-cards').innerHTML = crops.map(c => `
  <div class="card">
    <div class="icon">${c.icon}</div>
    <h3>${c.name}</h3>
    <p><strong>Season:</strong> ${c.season}</p>
    <p><strong>Soil:</strong> ${c.soil}</p>
    <p style="margin-top:.4rem">${c.tip}</p>
  </div>`).join('');

// Render market
document.getElementById('market-table').innerHTML = marketData.map(m => `
  <tr>
    <td>${m.crop}</td>
    <td>₹${m.price}</td>
    <td class="${m.dir}">${m.dir === 'up' ? '▲' : '▼'} ${m.change}</td>
    <td>${m.market}</td>
  </tr>`).join('');

// Render schemes
document.getElementById('scheme-cards').innerHTML = schemes.map(s => `
  <div class="card">
    <div class="icon">${s.icon}</div>
    <h3>${s.name}</h3>
    <p>${s.desc}</p>
  </div>`).join('');

// Render news
document.getElementById('news-grid').innerHTML = news.map(n => `
  <div class="news-card">
    <div class="news-img" style="background:${n.bg}">${n.emoji}</div>
    <div class="news-body">
      <h4>${n.title}</h4>
      <span>📅 ${n.date}</span>
    </div>
  </div>`).join('');

// Simulate live weather update
setInterval(() => {
  document.getElementById('temp').textContent = (26 + Math.floor(Math.random() * 5)) + '°C';
  document.getElementById('humidity').textContent = (60 + Math.floor(Math.random() * 15)) + '%';
}, 5000);
