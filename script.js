async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
  async function displayProducts() {
    const container = document.getElementById('product-container');
    const apiUrl = 'https://dummyjson.com/products';
  
    const jsonData = await fetchData(apiUrl);
  
    if (!jsonData) {
      console.error('Failed to fetch data');
      return;
    }
  
    jsonData.products.forEach(product => {
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
  
      productDiv.appendChild(img);
      productDiv.appendChild(title);
      productDiv.appendChild(price);
      productDiv.appendChild(description);
  
      container.appendChild(productDiv);
    });
  }
  
  window.onload = displayProducts;
  