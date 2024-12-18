document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
  
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, quantity, price })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Product added:', data);
      loadProducts(); // Reload products
    })
    .catch(error => console.error('Error adding product:', error));
  });
  
  // Fetch products from the backend
  function loadProducts() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        const productsList = document.getElementById('products');
        productsList.innerHTML = ''; // Clear the list before adding new items
        data.forEach(product => {
          const li = document.createElement('li');
          li.textContent = `${product.name} - ${product.quantity} - $${product.price}`;
          productsList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  }
  
  // Load products on page load
  loadProducts();
  
