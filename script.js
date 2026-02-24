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

// --- Fyll cart med dummydata om tom ---
if (cartItems.length === 0) {
    cartItems = [
        { id: 1, name: "Motorolla RAZR 3", price: 675, quantity: 1 },
        { id: 3, name: "Samsung e330", price: 750, quantity: 2 },
    ];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

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

// --- Kör rätt funktion beroende på sida ---
const currentPage = window.location.pathname;

if (currentPage.includes("catalog.html")) {
    displayCatalog();
}

if (currentPage.includes("check-out.html")) {
    // Lägg till submit på checkout-form
    const form = document.querySelector(".checkout-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            // Get cart data
            const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
            if (cart.length === 0) {
                orderDetails.innerHTML = "<p>No items purchased.</p>";
            } else {
                orderDetails.innerHTML = cart
                    .map(
                        (item) => `
                        <div class="order-item">
                            <p><strong>${item.name}</strong> x ${item.quantity}</p>
                            <p>Price: $${item.price}</p>
                        </div>
                        `,
                    )
                    .join("");
            }

            // Show modal
            document.getElementById("orderModalToggle").checked = true;
        });
    }
}
