// DOM Elements
const productTableBody = document.getElementById('productTableBody');
const incomeElement = document.getElementById('income');
const expensesElement = document.getElementById('expenses');
const balanceElement = document.getElementById('balance');
const transactionForm = document.getElementById('transaction-form');

// Data Storage
let products = [];

// Add Product
transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const productName = event.target.description.value;
    const quantity = parseInt(event.target.amount.value, 10);
    const price = parseFloat(event.target.price.value);

    const date = new Date().toLocaleDateString(); // Add the current date

    // Add to products array
    const product = {
        id: products.length + 1,
        name: productName,
        quantity,
        price,
        date,
    };
    products.push(product);

    // Update UI
    addProductToTable(product);
    updateDashboard();

    // Clear form
    event.target.reset();
});

// Add Product to Table
function addProductToTable(product) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.date}</td>
        <td>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>
    `;

    productTableBody.appendChild(row);
}

// Update Dashboard Metrics
function updateDashboard() {
    // Total Stock Value
    const totalStockValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    // Total Products
    const totalProducts = products.length;

    // Out-of-Stock Products
    const outOfStockProducts = products.filter(product => product.quantity === 0).length;

    // Low Stock Alerts (Threshold: Quantity < 5)
    const lowStockAlerts = products.filter(product => product.quantity < 5).length;

    // Average Price per Product
    const averagePrice = products.length > 0
        ? products.reduce((sum, product) => sum + product.price, 0) / totalProducts
        : 0;

    // Update Dashboard UI
    document.getElementById('totalStockValue').textContent = totalStockValue.toFixed(2);
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('outOfStockProducts').textContent = outOfStockProducts;
    document.getElementById('lowStockAlerts').textContent = lowStockAlerts;
    document.getElementById('averagePrice').textContent = averagePrice.toFixed(2);

// Edit Product
function editProduct(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newName = prompt('Enter new product name', product.name);
    const newQuantity = parseInt(prompt('Enter new quantity', product.quantity), 10);
    const newPrice = parseFloat(prompt('Enter new price', product.price));

    product.name = newName || product.name;
    product.quantity = newQuantity || product.quantity;
    product.price = newPrice || product.price;

    // Refresh Table
    refreshProductTable();
    updateDashboard();
}

// Delete Product
function deleteProduct(id) {
    products = products.filter((product) => product.id !== id);

    // Refresh Table
    refreshProductTable();
    updateDashboard();
}

// Refresh Table
function refreshProductTable() {
    productTableBody.innerHTML = '';
    products.forEach(addProductToTable);
}
function addProductToTable(product) {
    const row = document.createElement('tr');

    // Highlight low-stock products
    if (product.quantity < 5) {
        row.style.backgroundColor = 'red';
        row.style.color = 'white';
    }

    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.date}</td>
        <td>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>
    `;

    productTableBody.appendChild(row);
}

