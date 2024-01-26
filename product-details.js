async function fetchProductDetails(productId) {
  const apiUrl = `https://dummyjson.com/products/${productId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

async function displayProductDetails() {
  const container = document.getElementById('product-details-container');

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    console.error('Product ID not found in the URL');
    return;
  }

  const productDetails = await fetchProductDetails(productId);

  if (!productDetails) {
    console.error('Failed to fetch product details');
    return;
  }

  const card = document.createElement('div');
  card.classList.add('product-card');

  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = productDetails.thumbnail;
  thumbnailImg.alt = productDetails.title;
  card.appendChild(thumbnailImg);

  const textContainer = document.createElement('div');

  const detailsList = document.createElement('ul');

  const detailsToDisplay = [
    'id',
    'title',
    'description',
    'discountPercentage',
    'rating',
    'stock',
    'category',
    'brand',
  ];

  detailsToDisplay.forEach((detail) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${detail}:</strong> ${productDetails[detail]}`;
    detailsList.appendChild(listItem);
  });

  textContainer.appendChild(detailsList);

  card.appendChild(textContainer);

  container.appendChild(card);
}

window.onload = displayProductDetails;