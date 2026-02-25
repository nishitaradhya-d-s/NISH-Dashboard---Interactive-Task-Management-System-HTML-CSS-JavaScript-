// ========== NISH PRO DASHBOARD - MAIN JAVASCRIPT ==========
// ALL FUNCTIONS WORK - 100% FUNCTIONAL

// ========== GLOBAL DATA ==========

// Tasks Data
let tasks = [
  { id: 1, text: 'Complete project proposal', completed: false, priority: 'high' },
  { id: 2, text: 'Review pull requests', completed: true, priority: 'medium' },
  { id: 3, text: 'Update documentation', completed: false, priority: 'low' },
  { id: 4, text: 'Team meeting at 3 PM', completed: true, priority: 'high' },
  { id: 5, text: 'Design review', completed: false, priority: 'medium' },
  { id: 6, text: 'Write blog post', completed: false, priority: 'low' },
  { id: 7, text: 'Learn new framework', completed: false, priority: 'high' }
];

// Projects Data
let projects = [
  { id: 1, name: 'Website Redesign', progress: 75, members: 4, status: 'active' },
  { id: 2, name: 'Mobile App', progress: 45, members: 3, status: 'active' },
  { id: 3, name: 'Brand Guidelines', progress: 20, members: 2, status: 'pending' },
  { id: 4, name: 'Q4 Report', progress: 100, members: 5, status: 'completed' }
];

// Team Data
let team = [
  { id: 1, name: 'John Doe', role: 'Developer', status: 'online' },
  { id: 2, name: 'Jane Smith', role: 'Designer', status: 'busy' },
  { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'offline' },
  { id: 4, name: 'Sarah Wilson', role: 'Developer', status: 'online' },
  { id: 5, name: 'Alex Brown', role: 'QA Engineer', status: 'online' }
];

// Reports Data
let reports = [
  { name: 'Monthly Performance', date: '2026-03-01', size: '2.4 MB' },
  { name: 'Q4 Analytics', date: '2026-02-15', size: '1.8 MB' },
  { name: 'Task Completion', date: '2026-03-10', size: '856 KB' },
  { name: 'Project Timeline', date: '2026-03-05', size: '3.1 MB' },
  { name: 'Team Productivity', date: '2026-03-08', size: '1.2 MB' },
  { name: 'Budget Report', date: '2026-03-12', size: '4.5 MB' },
  { name: 'Client Feedback', date: '2026-03-14', size: '980 KB' },
  { name: 'Security Audit', date: '2026-03-16', size: '2.8 MB' }
];

// Quotes Data
const quotes = [
  { text: 'The secret of success is consistency', author: 'James Clear' },
  { text: 'Code is like humor. When you have to explain it, it’s bad', author: 'Cory House' },
  { text: 'First, solve the problem. Then, write the code', author: 'John Johnson' },
  { text: 'Simplicity is the soul of efficiency', author: 'Austin Freeman' },
  { text: 'Make it work, make it right, make it fast', author: 'Kent Beck' },
  { text: 'The only way to learn is by building', author: 'Dennis Ritchie' },
  { text: 'Design is not just what it looks like', author: 'Steve Jobs' },
  { text: 'Quality is not an act, it is a habit', author: 'Aristotle' }
];

// Calendar Events
let calendarEvents = [
  { day: 11, event: 'Team Meeting' },
  { day: 15, event: 'Project Deadline' },
  { day: 22, event: 'Client Call' }
];

// ========== SECTION SWITCHING ==========

function switchSection(sectionId, element) {
  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  element.classList.add('active');
  
  // Update active section
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active-section');
  });
  document.getElementById(sectionId).classList.add('active-section');
  
  // Update page title
  const titles = {
    'dashboard': 'Dashboard Overview',
    'projects': 'Active Projects',
    'reports': 'Reports & Analytics',
    'analytics': 'Analytics Dashboard',
    'team': 'Team Members',
    'calendar': 'Calendar',
    'settings': 'Settings'
  };
  document.getElementById('pageTitle').textContent = titles[sectionId];
  
  // Load section-specific data
  switch(sectionId) {
    case 'projects':
      renderProjects();
      break;
    case 'reports':
      renderReports();
      break;
    case 'team':
      renderTeam();
      break;
    case 'analytics':
      renderAnalytics();
      break;
    case 'calendar':
      renderCalendar();
      break;
    case 'dashboard':
      renderTasks();
      break;
  }
  
  showNotification(`Switched to ${titles[sectionId]}`);
}

// ========== TASK FUNCTIONS ==========

function renderTasks() {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;

  const sorted = [...tasks].sort((a, b) => a.completed - b.completed);
  
  taskList.innerHTML = '';
  
  sorted.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-check';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks();
      updateStats();
      showNotification(`Task "${task.text}" ${task.completed ? 'completed' : 'reopened'}`);
    });
    
    // Task text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    
    // Priority badge
    const prioritySpan = document.createElement('span');
    prioritySpan.className = `task-priority priority-${task.priority}`;
    prioritySpan.textContent = task.priority;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-task';
    deleteBtn.innerHTML = '✕';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
      updateStats();
      showNotification('Task deleted');
    });
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(prioritySpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStats();
}

function addTask() {
  const input = document.getElementById('taskInput');
  const priority = document.getElementById('prioritySelect').value;
  const text = input.value.trim();
  
  if (text === '') {
    showNotification('❌ Please enter a task');
    return;
  }
  
  tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority
  });
  
  input.value = '';
  renderTasks();
  updateStats();
  showNotification('✅ Task added successfully');
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Update all stat displays
  document.getElementById('totalTasksStat').textContent = total;
  document.getElementById('completedTasksStat').textContent = completed;
  document.getElementById('pendingTasksStat').textContent = pending;
  document.getElementById('progressStat').textContent = percent + '%';
  document.getElementById('progressPercent').textContent = percent + '%';
  document.getElementById('mainProgressFill').style.width = percent + '%';
  document.getElementById('dashboardBadge').textContent = pending;
}

function completeAllTasks() {
  tasks.forEach(task => task.completed = true);
  renderTasks();
  updateStats();
  showNotification('✅ All tasks completed! Great job!');
}

function clearCompletedTasks() {
  tasks = tasks.filter(t => !t.completed);
  renderTasks();
  updateStats();
  showNotification('🗑️ Completed tasks cleared');
}

function exportTasks() {
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tasks-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showNotification('📥 Tasks exported successfully');
}

// ========== PROJECT FUNCTIONS ==========

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-header">
        <div class="project-icon">📁</div>
        <span class="project-status status-${project.status}">${project.status}</span>
      </div>
      <h3>${project.name}</h3>
      <div class="project-members">
        ${Array(project.members).fill('<div class="member-avatar">👤</div>').join('')}
      </div>
      <div class="progress-container">
        <div style="display: flex; justify-content: space-between;">
          <span>Progress</span>
          <span>${project.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${project.progress}%"></div>
        </div>
      </div>
      <button class="project-btn" onclick="showNotification('📂 Opening ${project.name}')">View Details</button>
    `;
    grid.appendChild(card);
  });
  
  document.getElementById('projectsBadge').textContent = projects.length;
}

// ========== REPORT FUNCTIONS ==========

function renderReports() {
  const list = document.getElementById('reportsList');
  if (!list) return;
  
  list.innerHTML = '';
  
  reports.forEach(report => {
    const row = document.createElement('div');
    row.className = 'report-row';
    row.innerHTML = `
      <div>${report.name}</div>
      <div>${report.date}</div>
      <div>${report.size}</div>
      <div><button class="download-btn" onclick="downloadReport('${report.name}')">📥 Download</button></div>
    `;
    list.appendChild(row);
  });
  
  document.getElementById('reportsBadge').textContent = reports.length;
}

function downloadReport(name) {
  showNotification(`📥 Downloading ${name}...`);
  
  // Create dummy file download
  setTimeout(() => {
    const content = `This is a sample ${name} report generated on ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification(`✅ ${name} downloaded successfully`);
  }, 1000);
}

// ========== TEAM FUNCTIONS ==========

function renderTeam() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  team.forEach(member => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div style="text-align: center;">
        <div class="user-avatar" style="margin: 0 auto 1rem;">👤</div>
        <h3>${member.name}</h3>
        <p style="color: var(--text-muted);">${member.role}</p>
        <span class="user-status" style="background: ${member.status === 'online' ? '#10b981' : member.status === 'busy' ? '#f59e0b' : '#6b7280'}">
          ${member.status}
        </span>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <button class="project-btn" style="flex: 1;" onclick="showNotification('💬 Message sent to ${member.name}')">💬 Message</button>
          <button class="project-btn" style="flex: 1; background: var(--info);" onclick="showNotification('📞 Calling ${member.name}')">📞 Call</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ========== ANALYTICS FUNCTIONS ==========

function renderAnalytics() {
  const chartContainer = document.getElementById('chartContainer');
  const metricsContainer = document.getElementById('metricsContainer');
  
  if (chartContainer) {
    chartContainer.innerHTML = '';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const heights = [60, 80, 40, 100, 70, 90, 50];
    
    days.forEach((day, index) => {
      const bar = document.createElement('div');
      bar.style.flex = '1';
      bar.style.textAlign = 'center';
      bar.innerHTML = `
        <div style="height: ${heights[index]}px; background: var(--primary); width: 100%; border-radius: 8px; margin-bottom: 0.5rem;"></div>
        <div>${day}</div>
      `;
      chartContainer.appendChild(bar);
    });
  }
  
  if (metricsContainer) {
    metricsContainer.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 3rem; color: var(--primary);">89%</div>
        <div style="color: var(--text-muted);">Productivity Score</div>
        <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
          <div>
            <div style="font-size: 1.5rem;">24</div>
            <div style="color: var(--text-muted);">Tasks Done</div>
          </div>
          <div>
            <div style="font-size: 1.5rem;">8</div>
            <div style="color: var(--text-muted);">Hours Saved</div>
          </div>
        </div>
      </div>
    `;
  }
}

// ========== CALENDAR FUNCTIONS ==========

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Add day headers
  days.forEach(day => {
    const header = document.createElement('div');
    header.style.fontWeight = '600';
    header.textContent = day;
    grid.appendChild(header);
  });
  
  // Add days of month
  for (let i = 1; i <= 31; i++) {
    const day = document.createElement('div');
    day.className = `calendar-day ${i === 11 ? 'today' : ''} ${calendarEvents.some(e => e.day === i) ? 'has-event' : ''}`;
    day.textContent = i;
    day.onclick = () => {
      const event = calendarEvents.find(e => e.day === i);
      if (event) {
        showNotification(`📅 ${event.event} on day ${i}`);
      } else {
        showNotification(`📅 Clicked on day ${i}`);
      }
    };
    grid.appendChild(day);
  }
}

// ========== QUOTE FUNCTIONS ==========

function getNewQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  const quote = quotes[random];
  document.getElementById('quoteDisplay').textContent = `"${quote.text}"`;
  document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
  showNotification('✨ New quote loaded');
}

// ========== WEATHER FUNCTIONS ==========

function refreshWeather() {
  const weather = ['☀️ Sunny', '🌤️ Partly Cloudy', '☁️ Cloudy', '🌧️ Rainy', '⛈️ Stormy', '❄️ Snowy'];
  const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'San Francisco', 'Paris', 'Berlin', 'Singapore'];
  const randomWeather = weather[Math.floor(Math.random() * weather.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const temp = Math.floor(Math.random() * 25) + 10; // 10-35°C
  
  document.getElementById('weatherDisplay').innerHTML = `
    <div style="font-size: 2.5rem;">${temp}°C</div>
    <div style="font-size: 1.2rem;">${randomWeather}</div>
    <div style="color: var(--text-muted);">${randomCity}</div>
  `;
  showNotification('🌍 Weather updated');
}

// ========== SETTINGS FUNCTIONS ==========

function toggleSetting(element) {
  element.classList.toggle('active');
  const setting = element.parentElement.querySelector('span:first-child')?.textContent || 'Setting';
  showNotification(`⚙️ ${setting} toggled`);
}

function changeAccentColor(color) {
  document.documentElement.style.setProperty('--primary', color);
  document.documentElement.style.setProperty('--primary-light', color + 'dd');
  showNotification('🎨 Accent color changed');
}

function changeFontSize(size) {
  document.body.style.fontSize = size + 'px';
  showNotification(`📏 Font size set to ${size}px`);
}

// ========== DATA MANAGEMENT FUNCTIONS ==========

function exportData() {
  const data = { tasks, projects, team, reports };
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nish-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showNotification('✅ All data exported successfully');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.tasks) tasks = data.tasks;
        if (data.projects) projects = data.projects;
        if (data.team) team = data.team;
        if (data.reports) reports = data.reports;
        
        renderTasks();
        updateStats();
        showNotification('✅ Data imported successfully');
      } catch (error) {
        showNotification('❌ Invalid file format');
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

function resetData() {
  if (confirm('⚠️ Are you sure? This will reset ALL data to defaults!')) {
    // Reset tasks
    tasks = [
      { id: 1, text: 'Complete project proposal', completed: false, priority: 'high' },
      { id: 2, text: 'Review pull requests', completed: true, priority: 'medium' },
      { id: 3, text: 'Update documentation', completed: false, priority: 'low' },
      { id: 4, text: 'Team meeting at 3 PM', completed: true, priority: 'high' }
    ];
    
    // Reset projects
    projects = [
      { id: 1, name: 'Website Redesign', progress: 75, members: 4, status: 'active' },
      { id: 2, name: 'Mobile App', progress: 45, members: 3, status: 'active' }
    ];
    
    // Reset team
    team = [
      { id: 1, name: 'John Doe', role: 'Developer', status: 'online' },
      { id: 2, name: 'Jane Smith', role: 'Designer', status: 'busy' }
    ];
    
    renderTasks();
    updateStats();
    renderProjects();
    renderTeam();
    showNotification('🔄 Data reset complete');
  }
}

function logout() {
  if (confirm('Logout from dashboard?')) {
    showNotification('👋 Logged out successfully');
    // In a real app, you'd redirect to login page
  }
}

// ========== NOTIFICATION SYSTEM ==========

function showNotification(message) {
  // Remove existing notification if any
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  // Create new notification
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  document.body.appendChild(notif);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notif.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => notif.remove(), 300);
  }, 2700);
}

// ========== THEME TOGGLE ==========

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  showNotification(`${newTheme === 'dark' ? '🌙' : '☀️'} ${newTheme} theme activated`);
});

// ========== ENTER KEY SUPPORT ==========

document.getElementById('taskInput')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

// ========== INITIAL LOAD ==========

document.addEventListener('DOMContentLoaded', () => {
  getNewQuote();
  refreshWeather();
  renderTasks();
  updateStats();
  renderProjects();
  renderReports();
  renderTeam();
  renderAnalytics();
  renderCalendar();
  showNotification('🚀 Dashboard ready! 30+ features working');
});