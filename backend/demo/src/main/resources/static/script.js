async function fetchProducts(){
    const res = await fetch('http://localhost:8080/api/products');
    const data = await res.json();

    const container = document.getElementById('products');
    data.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('col-md-4', 'mb-3');
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5>${product.name}</h5>
                    <p>${product.description}</p>
                    <p>₹${product.price}</p>
                    <button class="btn btn-success">Add to Cart</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

fetchProducts();
let allProducts = []; // store all products for filtering

fetch("/api/products")
    .then(response => response.json())
    .then(data => {
        allProducts = data; // save original
        displayProducts(allProducts);
    });

// Display products function
function displayProducts(products) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">₹ ${product.price}</div>
                <button onclick='addToCart(${JSON.stringify(product)})'>
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Search filter
document.getElementById("searchBox").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    displayProducts(filtered);
});

