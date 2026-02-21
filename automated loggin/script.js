/* ---------- DATABASE TABLES ---------- */

let employees = [];
let auditLogs = [];
let idCounter = 1;


/* ---------- TRIGGER FUNCTION ---------- */
/* Automatically logs INSERT or UPDATE */

function triggerLog(action, employeeName) {

    const log = {
        action: action,
        employee: employeeName,
        time: new Date().toLocaleString()
    };

    auditLogs.push(log);
    displayLogs();
}


/* ---------- INSERT (Trigger fires) ---------- */

function insertEmployee() {

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;

    if (!name || !role) return;

    const emp = {
        id: idCounter++,
        name,
        role
    };

    employees.push(emp);

    // TRIGGER
    triggerLog("INSERT", name);

    displayEmployees();
}


/* ---------- UPDATE (Trigger fires) ---------- */

function updateEmployee() {

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;

    const emp = employees.find(e => e.name === name);

    if (!emp) {
        alert("Employee not found");
        return;
    }

    emp.role = role;

    // TRIGGER
    triggerLog("UPDATE", name);

    displayEmployees();
}


/* ---------- DISPLAY EMPLOYEES ---------- */

function displayEmployees() {

    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    employees.forEach(e => {
        table.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.role}</td>
            </tr>`;
    });
}


/* ---------- DISPLAY LOGS ---------- */

function displayLogs() {

    const table = document.getElementById("logTable");
    table.innerHTML = "";

    auditLogs.forEach(log => {
        table.innerHTML += `
            <tr>
                <td>${log.action}</td>
                <td>${log.employee}</td>
                <td>${log.time}</td>
            </tr>`;
    });
}


/* ---------- VIEW (Daily Activity Report) ---------- */
/* Acts like SQL VIEW */

function showDailyReport() {

    const today = new Date().toDateString();

    const todayLogs = auditLogs.filter(log =>
        new Date(log.time).toDateString() === today
    );

    document.getElementById("dailyReport").innerText =
        `Today's Activity: ${todayLogs.length} operations performed`;
}