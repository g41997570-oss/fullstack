let records = [
    { name: "Anil", dept: "CSE", date: "2024-01-10" },
    { name: "Bhavya", dept: "ECE", date: "2024-02-15" },
    { name: "Charan", dept: "EEE", date: "2024-01-20" },
    { name: "Divya", dept: "CSE", date: "2024-03-01" }
];

function displayRecords(data) {
    let body = document.getElementById("tableBody");
    body.innerHTML = "";

    data.forEach(r => {
        body.innerHTML += `
            <tr>
                <td>${r.name}</td>
                <td>${r.dept}</td>
                <td>${r.date}</td>
            </tr>`;
    });

    showCount(data);
}

function sortByName() {
    records.sort((a, b) => a.name.localeCompare(b.name));
    displayRecords(records);
}

function sortByDate() {
    records.sort((a, b) => new Date(a.date) - new Date(b.date));
    displayRecords(records);
}

function filterByDept() {
    let dept = document.getElementById("deptFilter").value;
    let filtered = dept === "All"
        ? records
        : records.filter(r => r.dept === dept);

    displayRecords(filtered);
}

function showCount(data) {
    let count = {};
    data.forEach(r => {
        count[r.dept] = (count[r.dept] || 0) + 1;
    });

    let text = "Count per Department → ";
    for (let d in count) {
        text += `${d}: ${count[d]}  `;
    }
    document.getElementById("count").innerText = text;
}

displayRecords(records);