// Cart Data
let cart = [];
let cartTotal = 0;

// Function to update price based on quantity
function updatePrice(selectElement) {
    const priceElement = selectElement.parentElement.querySelector(".dynamic-price");
    const basePrice = parseFloat(selectElement.closest(".vegetable-item").querySelector(".add-button").getAttribute("data-price"));
    const quantity = parseFloat(selectElement.value);
    
    if (selectElement.querySelector("option").textContent.includes("piece") || 
        selectElement.querySelector("option").textContent.includes("bundle") || 
        selectElement.querySelector("option").textContent.includes("box")) {
        const newPrice = (basePrice * quantity).toFixed(2);
        priceElement.textContent = newPrice;
    } 
    else if (selectElement.querySelector("option").textContent.includes("kg")) {
        const newPrice = (basePrice * (quantity / 1000)).toFixed(2);
        priceElement.textContent = newPrice;
    }
    else {
        const newPrice = (basePrice * quantity).toFixed(2);
        priceElement.textContent = newPrice;
    }
}

// Function to add item to cart
function addToCart(name, price, quantity) {
    const item = { name, price, quantity };
    cart.push(item);
    
    if (document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("piece") || 
        document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("bundle") || 
        document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("box")) {
        cartTotal += price * quantity;
    } 
    else if (document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("kg")) {
        cartTotal += price * (quantity / 1000);
    }
    else {
        cartTotal += price * quantity;
    }
    
    renderCart();
    showAddedToCartMessage();
}

// Function to render cart
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = cart.map(item => {
        let displayText;
        if (item.name === "Giloy Stick (Gulvel Kadi)") {
            displayText = `${item.name} - ${item.quantity}g - ₹${(item.price * (item.quantity / 1000)).toFixed(2)}`;
        } 
        else if (item.quantity === 1 || item.quantity === 2 || item.quantity === 3) {
            if (document.querySelector(`.add-button[data-name="${item.name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("piece")) {
                displayText = `${item.name} - ${item.quantity} piece${item.quantity > 1 ? 's' : ''} - ₹${(item.price * item.quantity).toFixed(2)}`;
            } 
            else if (document.querySelector(`.add-button[data-name="${item.name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("bundle")) {
                displayText = `${item.name} - ${item.quantity} bundle${item.quantity > 1 ? 's' : ''} - ₹${(item.price * item.quantity).toFixed(2)}`;
            }
            else if (document.querySelector(`.add-button[data-name="${item.name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("box")) {
                displayText = `${item.name} - ${item.quantity} box${item.quantity > 1 ? 'es' : ''} - ₹${(item.price * item.quantity).toFixed(2)}`;
            }
            else {
                displayText = `${item.name} - ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`;
            }
        }
        else {
            displayText = `${item.name} - ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`;
        }
        
        return `
            <div class="cart-item flex justify-between items-center">
                <p class="text-sm text-[#393E46]">${displayText}</p>
                <button class="remove-item bg-[#FF0000] text-[#FFFFFF] py-1 px-2 rounded-md text-xs font-semibold hover:bg-[#CC0000] transition-colors duration-200" data-name="${item.name}">Remove</button>
            </div>
        `;
    }).join("");
    
    document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
    document.getElementById("cart-count").textContent = cart.length;
}

// Function to show "Added to Cart" message
function showAddedToCartMessage() {
    const message = document.getElementById("added-to-cart-message");
    message.classList.remove("hidden");
    setTimeout(() => message.classList.add("hidden"), 2000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Update price on quantity change
    document.querySelectorAll(".quantity-select").forEach(select => {
        select.addEventListener("change", () => updatePrice(select));
        // Initialize prices
        updatePrice(select);
    });

    // Add to cart
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const quantity = parseFloat(button.closest(".vegetable-item").querySelector(".quantity-select").value);
            addToCart(name, price, quantity);
        });
    });

    // Toggle cart sidebar
    document.getElementById("cart-toggle").addEventListener("click", () => {
        const cartSidebar = document.getElementById("cart-sidebar");
        cartSidebar.classList.toggle("translate-x-full");
    });

    // Clear cart
    document.getElementById("clear-cart").addEventListener("click", () => {
        cart = [];
        cartTotal = 0;
        renderCart();
    });

    // Remove item from cart
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const name = e.target.getAttribute("data-name");
            const itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex > -1) {
                const item = cart[itemIndex];
                if (document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("piece") || 
                    document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("bundle") || 
                    document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("box")) {
                    cartTotal -= item.price * item.quantity;
                } 
                else if (document.querySelector(`.add-button[data-name="${name}"]`).closest(".vegetable-item").querySelector(".quantity-select option").textContent.includes("kg")) {
                    cartTotal -= item.price * (item.quantity / 1000);
                }
                else {
                    cartTotal -= item.price * item.quantity;
                }
                cart.splice(itemIndex, 1);
                renderCart();
            }
        }
    });

    // Proceed to Address Page
    document.getElementById("pay-button").addEventListener("click", () => {
        window.location.href = "Address.html";
    });
});