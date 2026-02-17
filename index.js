const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => displayProducts(data));
};

const displayProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  // sort by rating (highest first)
  products.sort((a, b) => b.rating.rate - a.rating.rate);

  let count = 0;

  products.forEach(product => {
    if (count < 3) {
      const card = document.createElement("div");

      card.innerHTML = `
        <div class=" bg-white shadow-md rounded-md">
          
          <div class="bg-gray-100 p-6 h-64 flex items-center justify-center">
            <img src="${product.image}"
                 alt="${product.title}"
                 class="h-full object-contain" />
          </div>

          <div class="p-6">
            <div class="flex justify-between items-center text-sm">
              <span class="px-3 py-1 border border-blue-600 text-blue-600 rounded-full text-xs font-medium">
                ${product.category}
              </span>
              <span class="text-yellow-500">
                <i class="fa-solid fa-star"></i>
                ${product.rating.rate} (${product.rating.count})
              </span>
            </div>

            <h3 class="font-semibold">
              ${product.title}
            </h3>

            <p class="text-lg font-bold">
              $${product.price}
            </p>

            <div class="flex gap-3 mt-4">
              <button class="btn btn-outline w-1/2">
                <i class="fa-regular fa-eye"></i>
                Details
              </button>
              <button class="btn btn-primary w-1/2">
                <i class="fa-solid fa-cart-plus"></i>
                Add
              </button>
            </div>
          </div>
        </div>
      `;

      productContainer.append(card);
      count++;
    }
  });
};

loadProducts();
