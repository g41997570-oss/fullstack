/* ---------- TABLES (Database Simulation) ---------- */

// Customers Table
const customers = [
    { id: 1, name: "Gayathri" },
    { id: 2, name: "Arun" },
    { id: 3, name: "Priya" }
];

// Products Table
const products = [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Phone", price: 25000 },
    { id: 3, name: "Headphones", price: 2000 }
];

// Orders Table
const orders = [
    { id: 1, customerId: 1, productId: 1, quantity: 1 },
    { id: 2, customerId: 1, productId: 3, quantity: 2 },
    { id: 3, customerId: 2, productId: 2, quantity: 1 },
    { id: 4, customerId: 3, productId: 3, quantity: 5 },
    { id: 5, customerId: 1, productId: 2, quantity: 1 }
];


/* ---------- JOIN QUERY (Customers + Orders + Products) ---------- */

const joinedData = orders.map(order => {

    const customer = customers.find(c => c.id === order.customerId);
    const product = products.find(p => p.id === order.productId);

    return {
        customerName: customer.name,
        productName: product.name,
        price: product.price,
        quantity: order.quantity,
        total: product.price * order.quantity
    };
});


/* ---------- ORDER BY (Sort by Total DESC) ---------- */

joinedData.sort((a, b) => b.total - a.total);


/* ---------- DISPLAY TABLE ---------- */

const tableBody = document.querySelector("#orderTable tbody");

joinedData.forEach(data => {
    const row = `
        <tr>
            <td>${data.customerName}</td>
            <td>${data.productName}</td>
            <td>₹${data.price}</td>
            <td>${data.quantity}</td>
            <td>₹${data.total}</td>
        </tr>
    `;
    tableBody.innerHTML += row;
});


/* ---------- SUBQUERY 1: Highest Value Order ---------- */

const highestOrder = joinedData.reduce((max, order) =>
    order.total > max.total ? order : max
);

document.getElementById("highestOrder").innerText =
    `💰 Highest Order: ${highestOrder.customerName} - ₹${highestOrder.total}`;


/* ---------- SUBQUERY 2: Most Active Customer ---------- */

const orderCount = {};

orders.forEach(order => {
    orderCount[order.customerId] =
        (orderCount[order.customerId] || 0) + 1;
});

let maxOrders = 0;
let activeCustomerId = null;

for (let id in orderCount) {
    if (orderCount[id] > maxOrders) {
        maxOrders = orderCount[id];
        activeCustomerId = id;
    }
}

const activeCustomer =
    customers.find(c => c.id == activeCustomerId);

document.getElementById("activeCustomer").innerText =
    `⭐ Most Active Customer: ${activeCustomer.name} (${maxOrders} orders)`;