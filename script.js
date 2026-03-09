// ────────────────────────────────────────────────
// CO3 → Data structures: arrays of objects
// ────────────────────────────────────────────────
const subjects = [
    { name: "Mathematics", teacher: "Mr. Rajesh", progress: 80 },
    { name: "Science", teacher: "Mrs. Priya", progress: 75 },
    { name: "English", teacher: "Ms. Anjali", progress: 92 },
    { name: "Social Science", teacher: "Mr. Vikram", progress: 68 }
];

const notices = [
    "Parent-Teacher Meeting on 25 Feb 2026",
    "Sports Day registration open – last date 15 Feb",
    "Mid-term result declared",
    "Annual function practice starts 10 Feb"
];

const attendanceData = [
    { date: "01 Feb", status: "Present", color: "text-green-400" },
    { date: "02 Feb", status: "Present", color: "text-green-400" },
    { date: "03 Feb", status: "Absent", color: "text-red-400" },
    { date: "04 Feb", status: "Present", color: "text-green-400" },
    { date: "05 Feb", status: "Present", color: "text-green-400" }
];

// ────────────────────────────────────────────────
// CO4 → DOM manipulation + array methods (.forEach)
// ────────────────────────────────────────────────
function renderNotices() {
    const ul = document.getElementById('notices-list');
    ul.innerHTML = '';
    notices.forEach(notice => {
        const li = document.createElement('li');
        li.className = 'flex gap-4';
        li.innerHTML = `<span class="text-green-400">•</span> ${notice}`;
        ul.appendChild(li);
    });
}

function renderAttendance() {
    const tbody = document.getElementById('attendance-body');
    tbody.innerHTML = '';
    attendanceData.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-white/10';
        tr.innerHTML = `<td class="py-4">${item.date}</td><td class="${item.color}">${item.status}</td>`;
        tbody.appendChild(tr);
    });
}

function renderSubjects() {
    const container = document.getElementById('subjects-container');
    container.innerHTML = '';
    subjects.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'glass rounded-3xl p-8';
        div.innerHTML = `
            <div class="flex justify-between font-bold">
                <span>${subject.name}</span>
                <span class="text-blue-300">${subject.teacher}</span>
            </div>
            <div class="h-2 bg-white/20 rounded-full mt-6">
                <div class="h-2 bg-green-400 rounded-full" style="width: ${subject.progress}%"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

// ────────────────────────────────────────────────
// CO4 → Page navigation + dynamic content loading
// ────────────────────────────────────────────────
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    
    document.getElementById('page-title').textContent =
        page === 'dashboard' ? 'Dashboard' :
        page === 'profile' ? 'My Profile' :
        page === 'attendance' ? 'Attendance' :
        page === 'subjects' ? 'My Subjects' : 'Contact';

    // Trigger rendering when switching to relevant pages
    if (page === 'dashboard') renderNotices();
    if (page === 'attendance') renderAttendance();
    if (page === 'subjects') renderSubjects();
}

// ────────────────────────────────────────────────
// CO4 + CO5 → Form submission handling + basic validation
// ────────────────────────────────────────────────
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const roll = document.getElementById('roll').value.trim();
    const pass = document.getElementById('pass').value.trim();
    
    if (roll === '101' && pass === '1234') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        showPage('dashboard');
    } else {
        alert('Wrong Roll or Password!\nTry: 101 / 1234');
    }
});

// ────────────────────────────────────────────────
// CO4 → Logout + mobile sidebar toggle
// ────────────────────────────────────────────────
function logout() {
    if (confirm('Logout?')) {
        location.reload();
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = sidebar.style.transform === 'translateX(-100%)' ? 'translateX(0)' : 'translateX(-100%)';
}

document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 1024 && 
        !sidebar.contains(e.target) && 
        !e.target.closest('button[onclick="toggleSidebar()"]')) {
        sidebar.style.transform = 'translateX(-100%)';
    }
});