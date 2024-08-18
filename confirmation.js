// JSON data
const data = {
    "checkout_id": "c456d2e7-45b3-492a-bdd3-8d8d234a670e",
    "created_at": "2024-08-13T12:34:56Z",
    "customer": {
        "customer_id": "123456",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "shipping_address": {
            "address_id": "654321",
            "first_name": "John",
            "last_name": "Doe",
            "company": "Example Corp",
            "address_line1": "123 Main St",
            "address_line2": "Apt 4B",
            "city": "New York",
            "state": "NY",
            "postal_code": "10001",
            "country": "USA"
        },
        "billing_address": {
            "address_id": "654322",
            "first_name": "John",
            "last_name": "Doe",
            "company": "Example Corp",
            "address_line1": "123 Main St",
            "address_line2": "Apt 4B",
            "city": "New York",
            "state": "NY",
            "postal_code": "10001",
            "country": "USA"
        }
    },
    "cart": {
        "items": [
            {
                "item_id": "prod_001",
                "product_name": "Wireless Headphones",
                "quantity": 2,
                "price": 99.99,
                "discount": {
                    "type": "percentage",
                    "value": 10,
                    "applied_value": 19.998
                },
                "tax": {
                    "type": "percentage",
                    "value": 8.875,
                    "applied_value": 14.135
                },
                "total_price": 194.122,
                "image_url": "https://m.media-amazon.com/images/I/71pGjUwrUlL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                "item_id": "prod_002",
                "product_name": "Bluetooth Speaker",
                "quantity": 1,
                "price": 149.99,
                "discount": {
                    "type": "fixed",
                    "value": 20.00,
                    "applied_value": 20.00
                },
                "tax": {
                    "type": "percentage",
                    "value": 8.875,
                    "applied_value": 11.496
                },
                "total_price": 141.486,
                "image_url": "https://www.zedsons.com/image/cache/catalog/journal3/pics/srs-550x550.jpg"
            }
        ],
        "sub_total": 294.991,
        "total_discount": 39.998,
        "total_tax": 25.631,
        "shipping_cost": 15.00,
        "grand_total": 295.624
    },
    "shipping_method": {
        "method_id": "ship_001",
        "method_name": "Standard Shipping",
        "cost": 15.00,
        "estimated_delivery": "2024-08-20T12:00:00Z"
    },
    "payment_method": {
        "method_id": "pay_001",
        "method_name": "Credit Card",
        "transaction_id": "txn_789012",
        "payment_status": "Authorized",
        "amount": 295.624,
        "currency": "USD"
    },
    "discounts_applied": [
        {
            "discount_id": "disc_001",
            "type": "percentage",
            "description": "Summer Sale - 10% off on Wireless Headphones",
            "value": 10,
            "applied_value": 19.998
        },
        {
            "discount_id": "disc_002",
            "type": "fixed",
            "description": "Loyalty Discount - $20 off on Bluetooth Speaker",
            "value": 20.00,
            "applied_value": 20.00
        }
    ],
    "tax_details": [
        {
            "tax_id": "tax_001",
            "type": "sales_tax",
            "description": "State Sales Tax",
            "rate": 8.875,
            "applied_value": 25.631
        }
    ],
    "order_notes": "Please leave the package at the front door.",
    "status": "Pending",
    "updated_at": "2024-08-13T12:45:00Z"
};

// Render order summary
function renderOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = '';

    // Render cart items
    data.cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'mb-4 flex items-center space-x-4';
        itemElement.innerHTML = `
            <img src="${item.image_url}" alt="${item.product_name}" class="w-16 h-16 object-cover rounded-md border-2 p-2">
            <div class="flex-1">
                <div class="flex justify-between">
                    <span class="font-medium">${item.product_name} (Qty: ${item.quantity})</span>
                    <span class="font-medium">$${item.total_price.toFixed(2)}</span>
                </div>
            </div>
        `;
        orderSummary.appendChild(itemElement);
    });

    // Render costs
    const costDetails = document.createElement('div');
    costDetails.className = 'border-t pt-4 space-y-2';
    costDetails.innerHTML = `
        <div class="flex justify-between">
            <p class="text-gray-700" id="subtotal">Subtotal</p>
            <p class="font-medium" id="subtotal-value">$${data.cart.sub_total.toFixed(2)}</p>
        </div>
        <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="font-medium" id="shipping-value">$${data.cart.shipping_cost.toFixed(2)}</p>
        </div>
        <div class="flex justify-between">
            <p class="text-gray-700">Total</p>
            <p class="text-xl font-semibold" id="total-value">$${data.cart.grand_total.toFixed(2)}</p>
        </div>
    `;
    orderSummary.appendChild(costDetails);
}

// Populate other details
function populateDetails() {
    document.getElementById('customer-name').textContent = `${data.customer.first_name} ${data.customer.last_name}`;
    document.getElementById('contact-email').textContent = data.customer.email;
    document.getElementById('contact-number').textContent = data.customer.phone;

    const shippingAddress = data.customer.shipping_address;
    document.getElementById('shipping-address').textContent = `
        ${shippingAddress.first_name} ${shippingAddress.last_name}, ${shippingAddress.address_line1}, ${shippingAddress.address_line2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postal_code}, ${shippingAddress.country}`;

    const billingAddress = data.customer.billing_address;
    document.getElementById('billing-address').textContent = `
        ${billingAddress.first_name} ${billingAddress.last_name}, ${billingAddress.address_line1}, ${billingAddress.address_line2}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.postal_code}, ${billingAddress.country}`;

    document.getElementById('last-four-digits').textContent = '1234'; // Example, should be replaced with the last 4 digits of the actual card
    document.getElementById('payment-amount').textContent = data.payment_method.amount.toFixed(2);
}

// Initialize the page
function initPage() {
    renderOrderSummary();
    populateDetails();
}

// Call the initialization function when the page loads
window.onload = initPage;