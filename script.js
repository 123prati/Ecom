const products = [
  {
    id: "audio-pro",
    name: "AeroTune Wireless Headphones",
    category: "tech",
    price: 129,
    originalPrice: 169,
    rating: 4.8,
    reviews: 842,
    stock: "In stock",
    delivery: "Free delivery by Wednesday",
    description: "Noise-reducing headphones with soft ear cups, deep bass, and all-day battery life.",
    details: [
      "Active noise reduction for travel and work",
      "Up to 34 hours of battery life",
      "Foldable frame with soft memory-foam ear cups",
      "Includes USB-C charging cable and travel pouch",
    ],
    image: "assets/products/headphones.jpg",
    imageAlt: "Realistic photo of wireless headphones",
    colors: [
      { name: "Forest", value: "#23443c" },
      { name: "Teal", value: "#176f5b" },
      { name: "Graphite", value: "#22272b" },
    ],
  },
  {
    id: "lamp",
    name: "GlowLine Desk Lamp",
    category: "home",
    price: 64,
    originalPrice: 79,
    rating: 4.7,
    reviews: 319,
    stock: "In stock",
    delivery: "Free delivery tomorrow",
    description: "Adjustable task lighting with warm and cool modes for focused work.",
    details: [
      "Three color-temperature settings",
      "Adjustable neck for precise lighting",
      "Compact base for small desks",
      "Low-heat LED panel for long sessions",
    ],
    image: "assets/products/lamp.jpg",
    imageAlt: "Realistic photo of a desk lamp",
    colors: [
      { name: "Terracotta", value: "#d95d39" },
      { name: "Brass", value: "#e8b84b" },
      { name: "Black", value: "#17211d" },
    ],
  },
  {
    id: "pack",
    name: "Nomad Daily Backpack",
    category: "style",
    price: 88,
    originalPrice: 118,
    rating: 4.9,
    reviews: 1104,
    stock: "In stock",
    delivery: "Free delivery by Friday",
    description: "Weather-resistant everyday carry with smart pockets and laptop storage.",
    details: [
      "Fits laptops up to 15 inches",
      "Water-resistant woven shell",
      "Separate front organizer pocket",
      "Padded back panel for commuting",
    ],
    image: "assets/products/backpack.jpg",
    imageAlt: "Realistic photo of a backpack",
    colors: [
      { name: "Charcoal", value: "#22272b" },
      { name: "Sage", value: "#61706a" },
      { name: "Clay", value: "#b85d42" },
    ],
  },
  {
    id: "speaker",
    name: "Stone Mini Speaker",
    category: "tech",
    price: 49,
    originalPrice: 69,
    rating: 4.6,
    reviews: 573,
    stock: "In stock",
    delivery: "Free delivery by Thursday",
    description: "Compact Bluetooth speaker with crisp sound and a durable outer shell.",
    details: [
      "Portable palm-size build",
      "Bluetooth wireless pairing",
      "Durable textured exterior",
      "Balanced sound for desks and small rooms",
    ],
    image: "assets/products/speaker.jpg",
    imageAlt: "Realistic photo of a Bluetooth speaker",
    colors: [
      { name: "Green", value: "#176f5b" },
      { name: "Mist", value: "#8fb9a8" },
      { name: "Slate", value: "#263238" },
    ],
  },
  {
    id: "throw",
    name: "Woven Cotton Throw",
    category: "home",
    price: 56,
    originalPrice: 72,
    rating: 4.8,
    reviews: 267,
    stock: "In stock",
    delivery: "Free delivery by Saturday",
    description: "Textured cotton throw for sofas, reading chairs, and bedroom layers.",
    details: [
      "Soft woven cotton feel",
      "Finished edge with subtle texture",
      "Ideal for sofa styling and layering",
      "Machine washable on gentle cycle",
    ],
    image: "assets/products/throw.jpg",
    imageAlt: "Realistic photo of a woven blanket",
    colors: [
      { name: "Clay", value: "#b85d42" },
      { name: "Honey", value: "#f1c27d" },
      { name: "Cream", value: "#f4ead7" },
    ],
  },
  {
    id: "watch",
    name: "PulseFit Smart Watch",
    category: "tech",
    price: 144,
    originalPrice: 199,
    rating: 4.7,
    reviews: 936,
    stock: "In stock",
    delivery: "Free delivery by Wednesday",
    description: "Lightweight fitness watch with health tracking and phone notifications.",
    details: [
      "Heart-rate and activity tracking",
      "Sleep insights and daily movement goals",
      "Bright display for outdoor use",
      "Lightweight band for all-day wear",
    ],
    image: "assets/products/watch.jpg",
    imageAlt: "Realistic photo of a smart watch",
    colors: [
      { name: "Black", value: "#263238" },
      { name: "Sage", value: "#4f8f7d" },
      { name: "Rose", value: "#c7837a" },
    ],
  },
  {
    id: "studio-headphones",
    name: "StudioLite Over-Ear Headphones",
    category: "tech",
    price: 96,
    originalPrice: 129,
    rating: 4.5,
    reviews: 421,
    stock: "Only 8 left",
    delivery: "Free delivery by Friday",
    description: "Comfortable over-ear headphones tuned for calls, music, and focused listening.",
    details: ["Clear microphone pickup", "Soft padded headband", "Wired and wireless modes", "Quick charge support"],
    image: "assets/products/headphones.jpg",
    imageAlt: "Realistic photo of over-ear headphones",
    colors: [
      { name: "Black", value: "#17211d" },
      { name: "Silver", value: "#c5cbc8" },
      { name: "Green", value: "#176f5b" },
    ],
  },
  {
    id: "task-lamp-pro",
    name: "ArcBeam Reading Lamp",
    category: "home",
    price: 74,
    originalPrice: 94,
    rating: 4.6,
    reviews: 188,
    stock: "In stock",
    delivery: "Free delivery tomorrow",
    description: "A taller lamp with soft directional light for bedside tables and study desks.",
    details: ["Wide light spread", "Weighted base", "Energy-efficient LEDs", "Simple one-touch control"],
    image: "assets/products/lamp.jpg",
    imageAlt: "Realistic photo of a reading lamp",
    colors: [
      { name: "Brass", value: "#e8b84b" },
      { name: "White", value: "#f4f8f5" },
      { name: "Graphite", value: "#22272b" },
    ],
  },
  {
    id: "weekender-pack",
    name: "TrailWeekender Pack",
    category: "style",
    price: 112,
    originalPrice: 148,
    rating: 4.8,
    reviews: 654,
    stock: "In stock",
    delivery: "Free delivery by Saturday",
    description: "A larger travel backpack with roomy storage for short trips and daily commutes.",
    details: ["Expandable main compartment", "Side bottle pocket", "Padded laptop sleeve", "Luggage-handle pass-through"],
    image: "assets/products/backpack.jpg",
    imageAlt: "Realistic photo of a travel backpack",
    colors: [
      { name: "Olive", value: "#61706a" },
      { name: "Black", value: "#17211d" },
      { name: "Tan", value: "#b89c72" },
    ],
  },
  {
    id: "room-speaker",
    name: "RoomWave Bluetooth Speaker",
    category: "tech",
    price: 82,
    originalPrice: 109,
    rating: 4.7,
    reviews: 782,
    stock: "In stock",
    delivery: "Free delivery by Thursday",
    description: "A stronger speaker for living rooms, workspaces, and weekend gatherings.",
    details: ["Richer bass response", "Pair two for stereo mode", "Long battery runtime", "USB-C charging"],
    image: "assets/products/speaker.jpg",
    imageAlt: "Realistic photo of a Bluetooth speaker",
    colors: [
      { name: "Slate", value: "#263238" },
      { name: "Green", value: "#176f5b" },
      { name: "Sand", value: "#d7c6a5" },
    ],
  },
  {
    id: "knit-throw",
    name: "CloudKnit Sofa Throw",
    category: "home",
    price: 68,
    originalPrice: 86,
    rating: 4.9,
    reviews: 512,
    stock: "In stock",
    delivery: "Free delivery by Friday",
    description: "A warmer throw blanket with a chunky knit feel for cozy room styling.",
    details: ["Heavier knit texture", "Generous sofa size", "Soft breathable cotton blend", "Great for gifting"],
    image: "assets/products/throw.jpg",
    imageAlt: "Realistic photo of a throw blanket",
    colors: [
      { name: "Cream", value: "#f4ead7" },
      { name: "Rust", value: "#b85d42" },
      { name: "Mustard", value: "#e8b84b" },
    ],
  },
  {
    id: "sport-watch",
    name: "PulseFit Sport Watch",
    category: "tech",
    price: 178,
    originalPrice: 229,
    rating: 4.8,
    reviews: 1346,
    stock: "In stock",
    delivery: "Free delivery by Wednesday",
    description: "A sport-focused smartwatch with stronger tracking tools and a rugged band.",
    details: ["Workout modes for running and cycling", "Water-resistant case", "GPS route tracking", "Two-day typical battery"],
    image: "assets/products/watch.jpg",
    imageAlt: "Realistic photo of a sport smart watch",
    colors: [
      { name: "Black", value: "#17211d" },
      { name: "Blue", value: "#2f5d7c" },
      { name: "Green", value: "#4f8f7d" },
    ],
  },
];

const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const productDetail = document.querySelector("#productDetail");
const similarProducts = document.querySelector("#similarProducts");
const returnProducts = document.querySelector("#returnProducts");
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
let selectedDetailColor = null;

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const discountPercent = (product) =>
  Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

function getCartItem(productId) {
  const value = cart[productId];
  if (typeof value === "number") {
    return { quantity: value, color: null };
  }
  return value || { quantity: 0, color: null };
}

function saveCart() {
  localStorage.setItem("mercato-cart", JSON.stringify(cart));
}

function getCartEntries() {
  return Object.entries(cart)
    .map(([id]) => {
      const item = getCartItem(id);
      return {
        product: products.find((product) => product.id === id),
        quantity: item.quantity,
        color: item.color,
      };
    })
    .filter((entry) => entry.product && entry.quantity > 0);
}

function productCard(product) {
  return `
    <article class="product-card">
      <a class="product-link" href="product.html?id=${product.id}" aria-label="View ${product.name}">
        <div class="product-media" style="--tile-a: ${product.colors[0].value}; --tile-b: ${product.colors[1].value}">
          <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" />
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span>${product.category}</span>
            <span>${product.rating} stars</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price-stack">
            <span class="price">${money(product.price)}</span>
            <span class="old-price">${money(product.originalPrice)}</span>
            <span class="discount">${discountPercent(product)}% off</span>
          </div>
        </div>
      </a>
      <div class="product-actions">
        <a class="button secondary" href="product.html?id=${product.id}">Details</a>
        <button class="button primary" type="button" data-add="${product.id}">Add to cart</button>
      </div>
    </article>
  `;
}

function renderProducts() {
  if (!productGrid || !searchInput || !categoryFilter) return;

  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesTerm =
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);
    const matchesCategory = category === "all" || product.category === category;
    return matchesTerm && matchesCategory;
  });

  productGrid.innerHTML = filtered.length
    ? filtered.map(productCard).join("")
    : `<p class="summary-empty">No products match your search.</p>`;
}

function updateQuantity(productId, nextQuantity, color = null) {
  const existing = getCartItem(productId);
  if (nextQuantity <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = {
      quantity: nextQuantity,
      color: color || existing.color || products.find((product) => product.id === productId)?.colors[0].name,
    };
  }

  saveCart();
  renderCart();
}

function addToCart(productId, color = null) {
  const current = getCartItem(productId);
  updateQuantity(productId, current.quantity + 1, color);
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
          ({ product, quantity, color }) => `
            <article class="cart-item">
              <div>
                <h3>${product.name}</h3>
                <p>${money(product.price)} each${color ? ` · ${color}` : ""}</p>
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
  renderReturnProducts();
}

function renderProductDetail() {
  if (!productDetail) return;

  const params = new URLSearchParams(window.location.search);
  const product = products.find((item) => item.id === params.get("id")) || products[0];
  selectedDetailColor = product.colors[0].name;
  document.title = `${product.name} | Mercato`;

  productDetail.innerHTML = `
    <section class="detail-layout">
      <div class="detail-gallery">
        <img src="${product.image}" alt="${product.imageAlt}" />
      </div>
      <div class="detail-info">
        <p class="eyebrow">${product.category}</p>
        <h1>${product.name}</h1>
        <div class="rating-line">
          <strong>${product.rating} stars</strong>
          <span>${product.reviews.toLocaleString()} reviews</span>
        </div>
        <p>${product.description}</p>
        <div class="price-stack detail-price">
          <span class="price">${money(product.price)}</span>
          <span class="old-price">${money(product.originalPrice)}</span>
          <span class="discount">Save ${discountPercent(product)}%</span>
        </div>
        <div class="option-panel">
          <strong>Color: <span id="selectedColor">${selectedDetailColor}</span></strong>
          <div class="swatches">
            ${product.colors
              .map(
                (color, index) => `
                  <button
                    class="swatch ${index === 0 ? "selected" : ""}"
                    type="button"
                    data-color="${color.name}"
                    style="--swatch: ${color.value}"
                    aria-label="Select ${color.name}"
                  ></button>
                `
              )
              .join("")}
          </div>
        </div>
        <ul class="detail-list">
          ${product.details.map((detail) => `<li>${detail}</li>`).join("")}
        </ul>
      </div>
      <aside class="buy-box">
        <strong>${money(product.price)}</strong>
        <span>${product.delivery}</span>
        <span>${product.stock}</span>
        <button class="button primary" type="button" data-detail-add="${product.id}">Add to cart</button>
        <a class="button secondary" href="checkout.html">Buy now</a>
        <a href="returns.html">Return policy and product support</a>
      </aside>
    </section>
  `;

  if (similarProducts) {
    similarProducts.innerHTML = products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
      .map(productCard)
      .join("");
  }
}

function renderReturnProducts() {
  if (!returnProducts) return;

  const entries = getCartEntries();
  returnProducts.innerHTML = entries.length
    ? entries
        .map(
          ({ product, quantity, color }) => `
            <label class="return-item">
              <input type="checkbox" name="returnProduct" value="${product.id}" />
              <img src="${product.image}" alt="${product.imageAlt}" />
              <span>
                <strong>${product.name}</strong>
                <small>${quantity} item${quantity > 1 ? "s" : ""}${color ? ` · ${color}` : ""}</small>
              </span>
            </label>
          `
        )
        .join("")
    : `<p class="summary-empty">Your cart is empty. Add products before starting a demo return.</p>`;
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

if (productGrid || similarProducts) {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (!button) return;
    addToCart(button.dataset.add);
    openCart();
  });
}

document.addEventListener("click", (event) => {
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const swatch = event.target.closest("[data-color]");
  const detailAdd = event.target.closest("[data-detail-add]");

  if (increase) {
    const current = getCartItem(increase.dataset.increase);
    updateQuantity(increase.dataset.increase, current.quantity + 1);
  }

  if (decrease) {
    const current = getCartItem(decrease.dataset.decrease);
    updateQuantity(decrease.dataset.decrease, current.quantity - 1);
  }

  if (swatch) {
    selectedDetailColor = swatch.dataset.color;
    document.querySelectorAll(".swatch").forEach((item) => item.classList.remove("selected"));
    swatch.classList.add("selected");
    const selectedColor = document.querySelector("#selectedColor");
    if (selectedColor) selectedColor.textContent = selectedDetailColor;
  }

  if (detailAdd) {
    addToCart(detailAdd.dataset.detailAdd, selectedDetailColor);
    openCart();
  }
});

if (cartButton) cartButton.addEventListener("click", openCart);
if (closeCart) closeCart.addEventListener("click", hideCart);
if (drawerCheckout) drawerCheckout.addEventListener("click", hideCart);
if (searchInput) searchInput.addEventListener("input", renderProducts);
if (categoryFilter) categoryFilter.addEventListener("change", renderProducts);

if (cartDrawer) {
  cartDrawer.addEventListener("click", (event) => {
    if (event.target === cartDrawer) hideCart();
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
const returnForm = document.querySelector("#returnForm");
const returnNote = document.querySelector("#returnNote");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    if (formNote) formNote.textContent = "Thanks. Your demo message has been received.";
  });
}

if (returnForm) {
  returnForm.addEventListener("submit", (event) => {
    event.preventDefault();
    returnForm.reset();
    if (returnNote) returnNote.textContent = "Return request created. A demo label would be emailed to the customer.";
  });
}

renderProducts();
renderProductDetail();
renderCart();
