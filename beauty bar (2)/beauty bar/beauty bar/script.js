// Function to add product to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const productIndex = cart.findIndex(item => item.name === product.name);
    
    if (productIndex === -1) {
        // If not, add the product
        cart.push({...product, quantity: 1});
    } else {
        // If it exists, increase the quantity
        cart[productIndex].quantity++;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6">Your cart is empty!</td></tr>';
    } else {
        cart.forEach((item, index) => {
            const total = item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" width="100"></td>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td>₹${total}</td>
                    <td><button onclick="removeFromCart(${index})">Remove</button></td>
                </tr>
            `;
        });

        updateCartSummary();
    }
}

// Function to update cart summary (subtotal and total)
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = subtotal.toFixed(2); // Assuming free shipping
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (quantity < 1) quantity = 1; // Ensure quantity is at least 1
    cart[index].quantity = parseInt(quantity);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to remove a product from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.splice(index, 1); // Remove item by index
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to simulate checkout (placeholder)
function checkout() {
    alert('Proceeding to checkout...');
    // Here you would typically redirect to a checkout page or initiate a payment process
}

// Initializing the product page and cart page
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product-details');
            const productName = productElement.querySelector('h2').textContent;
            const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace('₹', ''));
            const productImage = productElement.previousElementSibling.querySelector('img').src;

            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            addToCart(product);
        });
    });

    // If on the cart page, display cart items
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
});


// Function to handle the checkout process
function checkout() {
    let paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    alert("You have chosen " + paymentMethod + " as your payment method.");
    
    // Proceed with payment method specific code here
    if (paymentMethod === 'cod') {
        processCashOnDelivery();
    } else if (paymentMethod === 'phonepe') {
        processPhonePePayment();
    } else if (paymentMethod === 'card') {
        processCardPayment();
    }
}

// Function to process cash on delivery
function processCashOnDelivery() {
    alert("Order placed successfully with Cash on Delivery.");
    // Implement your Cash on Delivery logic here
}

// Function to process PhonePe payment
function processPhonePePayment() {
    alert("Redirecting to PhonePe payment gateway...");
    // Implement your PhonePe payment integration here
}

// Function to process card payment
function processCardPayment() {
    alert("Redirecting to card payment gateway...");
    // Implement your Card payment integration here
}

// Function to track order based on order ID
function trackOrder() {
    let orderId = document.getElementById("order-id").value;
    
    if(orderId) {
        // Mock order status
        let mockStatus = "Your order #" + orderId + " is currently being processed.";
        document.getElementById("order-status").innerText = mockStatus;
    } else {
        alert("Please enter a valid order ID.");
    }
}

// Example function to update the cart and other functionalities
function updateCart() {
    // Your existing cart update functionality
}

// Call updateCart to initialize cart details
updateCart();
