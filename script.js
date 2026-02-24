// --- Produktlista ---
const products = [
    { id: 1, name: "Motorolla RAZR 3", price: 675 },
    { id: 2, name: "Nokia 3310", price: 850 },
    { id: 3, name: "Samsung e330", price: 750 },
    { id: 4, name: "Brick phone", price: 1500 },
    { id: 5, name: "Rotary dial phone", price: 2000 },
    { id: 6, name: "Rotary wire phone", price: 999 },
];

// --- Hämta cart från localStorage ---
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// --- Spara cart i localStorage ---
function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// --- Funktion för katalogen ---
function displayCatalog() {
    const container = document.querySelector(".products-container");
    products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        container.appendChild(div);
    });

    // Lägg till event på knappar
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
        btn.addEventListener("click", () => {
            const product = products.find((p) => p.id == btn.dataset.id);
            cartItems.push(product);
            saveCart(); // spara i localStorage
            alert(`${product.name} added to cart!`);
        });
    });
}

// --- Funktion för checkout / order summary ---
function updateOrderSummary() {
    const summary = document.querySelector(".order-summary");
    if (!summary) return; // Om det inte finns på sidan

    summary.innerHTML = "<h2>Your Order</h2>";
    let total = 0;

    if (cartItems.length === 0) {
        summary.innerHTML += "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.forEach((item) => {
        total += item.price;
        summary.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });

    summary.innerHTML += `<p><strong>Total: $${total}</strong></p>`;
}

// --- Kör rätt funktion beroende på sida ---
const currentPage = window.location.pathname;

if (currentPage.includes("catalog.html")) {
    displayCatalog();
}

if (currentPage.includes("checkout.html")) {
    updateOrderSummary();

    // Lägg till submit på checkout-form
    const form = document.querySelector(".checkout-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (cartItems.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            alert("Order complete! Thank you for shopping Zero Scroll 😎");
            cartItems = [];
            saveCart();
            updateOrderSummary();
            form.reset();
        });
    }
}
