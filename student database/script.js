console.log("Records script loaded");

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
            </tr>
        `;
    });

    countDepartments(data);
}

function sortByName() {
    records.sort((a, b) => a.name.localeCompare(b.name));
    displayRecords(records);
}

function sortByDate() {
    records.sort((a, b) => new Date(a.date) - new Date(b.date));
    displayRecords(records);
}

function filterDepartment() {
    let dept = document.getElementById("deptFilter").value;
    let filtered = dept === "All"
        ? records
        : records.filter(r => r.dept === dept);

    displayRecords(filtered);
}

function countDepartments(data) {
    let counts = {};
    data.forEach(r => {
        counts[r.dept] = (counts[r.dept] || 0) + 1;
    });

    let text = "";
    for (let d in counts) {
        text += `${d}: ${counts[d]}  `;
    }
    document.getElementById("count").innerText =
        "Count per Department → " + text;
}

// INITIAL LOAD
displayRecords(records);