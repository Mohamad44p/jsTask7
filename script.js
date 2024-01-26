async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

let jsonData; 

async function displayProducts() {
  const container = document.getElementById('product-container');
  const loader = document.getElementById('loader'); 
  const apiUrl = 'https://dummyjson.com/products';

  // Show loader
  loader.style.display = 'block';

  jsonData = await fetchData(apiUrl);

  setTimeout(() => {
    loader.style.display = 'none';
    if (!jsonData) {
      console.error('Failed to fetch data');
      return;
    }
    filterProducts(); 
  }, 3000);
}

function filterProducts() {
  const container = document.getElementById('product-container');
  container.innerHTML = ''; 

  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();

  const filteredProducts = jsonData.products.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(searchInput);
    const categoryMatch = categoryFilter === '' || product.category.toLowerCase() === categoryFilter;
    return titleMatch && categoryMatch;
  });

  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;

    const title = document.createElement('div');
    title.className = 'product-title';
    title.textContent = product.title;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;

    const description = document.createElement('div');
    description.className = 'product-description';
    description.textContent = product.description;

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Details';
    detailsButton.addEventListener('click', () => {
      window.location.href = `product-details.html?id=${product.id}`;
    });

    productDiv.appendChild(img);
    productDiv.appendChild(title);
    productDiv.appendChild(price);
    productDiv.appendChild(description);
    productDiv.appendChild(detailsButton);

    container.appendChild(productDiv);
  });
}

window.onload = displayProducts;
