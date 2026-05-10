const products = [
  {
    id: "audio-pro",
    name: "AeroTune Wireless Headphones",
    category: "tech",
    price: 129,
    rating: "4.8",
    description: "Noise-reducing headphones with soft ear cups and all-day battery life.",
    initials: "AT",
    image: "assets/products/headphones.svg",
    imageAlt: "Illustration of green wireless headphones",
    colors: ["#23443c", "#176f5b"],
  },
  {
    id: "lamp",
    name: "GlowLine Desk Lamp",
    category: "home",
    price: 64,
    rating: "4.7",
    description: "Adjustable task lighting with warm and cool modes for focused work.",
    initials: "GL",
    image: "assets/products/lamp.svg",
    imageAlt: "Illustration of an adjustable desk lamp",
    colors: ["#d95d39", "#e8b84b"],
  },
  {
    id: "pack",
    name: "Nomad Daily Backpack",
    category: "style",
    price: 88,
    rating: "4.9",
    description: "Weather-resistant everyday carry with smart pockets and laptop storage.",
    initials: "ND",
    image: "assets/products/backpack.svg",
    imageAlt: "Illustration of a travel backpack",
    colors: ["#22272b", "#61706a"],
  },
  {
    id: "speaker",
    name: "Stone Mini Speaker",
    category: "tech",
    price: 49,
    rating: "4.6",
    description: "Compact Bluetooth speaker with crisp sound and a durable outer shell.",
    initials: "SM",
    image: "assets/products/speaker.svg",
    imageAlt: "Illustration of a compact Bluetooth speaker",
    colors: ["#176f5b", "#8fb9a8"],
  },
  {
    id: "throw",
    name: "Woven Cotton Throw",
    category: "home",
    price: 56,
    rating: "4.8",
    description: "Textured cotton throw for sofas, reading chairs, and bedroom layers.",
    initials: "WT",
    image: "assets/products/throw.svg",
    imageAlt: "Illustration of a woven cotton throw blanket",
    colors: ["#b85d42", "#f1c27d"],
  },
  {
    id: "watch",
    name: "PulseFit Smart Watch",
    category: "tech",
    price: 144,
    rating: "4.7",
    description: "Lightweight fitness watch with health tracking and phone notifications.",
    initials: "PF",
    image: "assets/products/watch.svg",
    imageAlt: "Illustration of a smart watch",
    colors: ["#263238", "#4f8f7d"],
  },
];

const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const cartButton = document.querySelector("#cartButton");
const closeCart = document.querySelector("#closeCart");
const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const summaryItems = document.querySelector("#summaryItems");
const cartCount = document.querySelector("#cartCount");
const subtotal = document.querySelector("#subtotal");
const shipping = document.querySelector("#shipping");
const total = document.querySelector("#total");
const drawerTotal = document.querySelector("#drawerTotal");
const checkoutButton = document.querySelector("#checkoutButton");
const drawerCheckout = document.querySelector("#drawerCheckout");

let cart = JSON.parse(localStorage.getItem("mercato-cart") || "{}");

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

function saveCart() {
  localStorage.setItem("mercato-cart", JSON.stringify(cart));
}

function getCartEntries() {
  return Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((item) => item.id === id),
      quantity,
    }))
    .filter((entry) => entry.product && entry.quantity > 0);
}

function renderProducts() {
  if (!productGrid || !searchInput || !categoryFilter) return;

  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesTerm =
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term);
    const matchesCategory = category === "all" || product.category === category;
    return matchesTerm && matchesCategory;
  });

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-media" style="--tile-a: ${product.colors[0]}; --tile-b: ${product.colors[1]}">
            <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" />
          </div>
          <div class="product-body">
            <div class="product-meta">
              <span>${product.category}</span>
              <span>${product.rating} stars</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-actions">
              <span class="price">${money(product.price)}</span>
              <button class="button primary" type="button" data-add="${product.id}">
                Add to cart
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  if (!filtered.length) {
    productGrid.innerHTML = `<p class="summary-empty">No products match your search.</p>`;
  }
}

function updateQuantity(productId, nextQuantity) {
  if (nextQuantity <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = nextQuantity;
  }

  saveCart();
  renderCart();
}

function addToCart(productId) {
  updateQuantity(productId, (cart[productId] || 0) + 1);
}

function renderCart() {
  const entries = getCartEntries();
  const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const cartSubtotal = entries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0
  );
  const shippingCost = cartSubtotal === 0 || cartSubtotal >= 75 ? 0 : 9;
  const cartTotal = cartSubtotal + shippingCost;

  if (cartCount) cartCount.textContent = itemCount;
  if (subtotal) subtotal.textContent = money(cartSubtotal);
  if (shipping) shipping.textContent = money(shippingCost);
  if (total) total.textContent = money(cartTotal);
  if (drawerTotal) drawerTotal.textContent = money(cartTotal);

  const cartMarkup = entries.length
    ? entries
        .map(
          ({ product, quantity }) => `
            <article class="cart-item">
              <div>
                <h3>${product.name}</h3>
                <p>${money(product.price)} each</p>
              </div>
              <div class="quantity-controls" aria-label="Quantity controls for ${product.name}">
                <button type="button" data-decrease="${product.id}" aria-label="Decrease ${product.name}">-</button>
                <strong>${quantity}</strong>
                <button type="button" data-increase="${product.id}" aria-label="Increase ${product.name}">+</button>
              </div>
            </article>
          `
        )
        .join("")
    : `<p class="summary-empty">Your cart is empty.</p>`;

  if (cartItems) cartItems.innerHTML = cartMarkup;
  if (summaryItems) summaryItems.innerHTML = cartMarkup;
}

function openCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function hideCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

if (productGrid) {
  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (!button) return;
    addToCart(button.dataset.add);
    openCart();
  });
}

document.addEventListener("click", (event) => {
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");

  if (increase) {
    updateQuantity(increase.dataset.increase, (cart[increase.dataset.increase] || 0) + 1);
  }

  if (decrease) {
    updateQuantity(decrease.dataset.decrease, (cart[decrease.dataset.decrease] || 0) - 1);
  }
});

if (cartButton) cartButton.addEventListener("click", openCart);
if (closeCart) closeCart.addEventListener("click", hideCart);
if (drawerCheckout) drawerCheckout.addEventListener("click", hideCart);
if (searchInput) searchInput.addEventListener("input", renderProducts);
if (categoryFilter) categoryFilter.addEventListener("change", renderProducts);

if (cartDrawer) {
  cartDrawer.addEventListener("click", (event) => {
    if (event.target === cartDrawer) {
      hideCart();
    }
  });
}

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    if (!getCartEntries().length) {
      alert("Add at least one product before checkout.");
      return;
    }

    alert("Demo checkout complete. Connect a payment provider before taking real orders.");
  });
}

const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    if (formNote) {
      formNote.textContent = "Thanks. Your demo message has been received.";
    }
  });
}

renderProducts();
renderCart();
