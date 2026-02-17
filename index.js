const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

const displayProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.sort((a, b) => b.rating.rate - a.rating.rate);

  let count = 0;

  products.forEach((product) => {
    if (count < 3) {
      const card = document.createElement("div");

      card.innerHTML = `
        <div class="bg-white shadow-md rounded-md h-full flex flex-col">

          <div class="bg-gray-100 p-6 h-64 flex items-center justify-center">
            <img src="${product.image}"
                 alt="${product.title}"
                 class="h-full object-contain" />
          </div>

          <div class="p-6 flex flex-col flex-1">
            <div class="flex justify-between items-center text-sm">
              <span class="px-3 py-1 border border-blue-600 text-blue-600 rounded-full text-xs font-medium">
                ${product.category}
              </span>
              <span class="text-yellow-500">
                <i class="fa-solid fa-star"></i>
                ${product.rating.rate} (${product.rating.count})
              </span>
            </div>

            <h3 class="font-semibold mt-2 flex-1">
              ${product.title}
            </h3>

            <p class="text-lg font-bold mt-2">
              $${product.price}
            </p>

            <div class="flex gap-3 mt-4">
              <button onclick="showDetails(${product.id})" class="btn btn-outline w-1/2">
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

const showDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      const modalContent = document.getElementById("modal-content");

      modalContent.innerHTML = `
        <img src="${product.image}" class="w-40 mx-auto my-4" />

        <h3 class="text-lg font-bold mb-2">${product.title}</h3>

        <p class="text-sm text-gray-500 mb-3">${product.description}</p>

        <p class="text-xl font-bold text-indigo-600">$${product.price}</p>

        <p class="text-sm text-yellow-500 mt-1">
          <i class="fa-solid fa-star"></i>
          ${product.rating.rate} (${product.rating.count})
        </p>

        <div class="modal-action">
          <button class="btn btn-primary">Add to Cart</button>
          <button class="btn btn-neutral">Buy Now</button>
        </div>
      `;

      document.getElementById("product-modal").showModal();
    });
};

loadProducts();
