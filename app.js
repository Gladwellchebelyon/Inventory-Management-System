// DOM Elements
const productTableBody = document.getElementById('productTableBody');
const stockValueElement = document.getElementById('stock-value');
const lowStockElement = document.getElementById('low-stock');
const outOfStockElement = document.getElementById('out-of-stock');
const productForm = document.getElementById('product-form');

// Data Storage
let products = [];

// Add Product
productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target.description.value.trim();
    const quantity = parseInt(event.target.quantity.value, 10);
    const price = parseFloat(event.target.price.value);

    if (!name || quantity <= 0 || price <= 0) {
        alert('Please enter valid product details.');
        return;
    }

    const date = new Date().toLocaleDateString();
    const product = {
        id: products.length + 1,
        name,
        quantity,
        price,
        date,
    };
    products.push(product);

    addProductToTable(product);
    updateDashboard();
    productForm.reset();
});

// Add Product to Table
function addProductToTable(product) {
    const row = document.createElement('tr');

    if (product.quantity === 0) row.classList.add('out-of-stock');
    else if (product.quantity < 5) row.classList.add('low-stock');

    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.date}</td>
        <td>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>
    `;

    productTableBody.appendChild(row);
}

// Update Dashboard
function updateDashboard() {
    const totalStockValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity < 5).length;
    const outOfStockCount = products.filter(p => p.quantity === 0).length;

    stockValueElement.textContent = totalStockValue.toFixed(2);
    lowStockElement.textContent = lowStockCount;
    outOfStockElement.textContent = outOfStockCount;
}

// Edit Product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newName = prompt('Enter new product name', product.name);
    const newQuantity = parseInt(prompt('Enter new quantity', product.quantity), 10);
    const newPrice = parseFloat(prompt('Enter new price', product.price));

    if (newName) product.name = newName;
    if (!isNaN(newQuantity)) product.quantity = newQuantity;
    if (!isNaN(newPrice)) product.price = newPrice;

    refreshTable();
    updateDashboard();
}

// Delete Product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    refreshTable();
    updateDashboard();
}

// Refresh Table
function refreshTable() {
    productTableBody.innerHTML = '';
    products.forEach(addProductToTable);
}
