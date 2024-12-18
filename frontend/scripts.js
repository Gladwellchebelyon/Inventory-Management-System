// Access the form and the table
const productForm = document.getElementById('product-form');
const productsTable = document.getElementById('products-table').getElementsByTagName('tbody')[0];

productForm.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent page refresh on form submit

  // Get the values from the form
  const productName = document.getElementById('product-name').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;

  // Add a new row to the table
  const newRow = productsTable.insertRow();
  newRow.innerHTML = `
    <td>${productName}</td>
    <td>${quantity}</td>
    <td>${price}</td>
  `;

  // Clear the form fields
  productForm.reset();
});
