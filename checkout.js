// JSON data (unchanged)
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
              "image_url": "https://m.media-amazon.com/images/I/513cKTorkwL._SX679_.jpg"
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
              "image_url": "https://m.media-amazon.com/images/I/81Dl7qzd40L._SX679_.jpg"
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

  // Render coupon code input and button
  const couponSection = document.createElement('div');
  couponSection.className = 'mt-6';
  couponSection.innerHTML = `
      <div class="flex space-x-1 md:space-x-4">
          <input type="text" id="coupon-code" placeholder="Enter coupon code" class="flex-1 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          <button id="verify-coupon" class="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">Apply</button>
      </div>
      <p id="coupon-message" class="text-red-500 text-sm mt-2"></p> <!-- For displaying coupon validation messages -->
  `;
  orderSummary.appendChild(couponSection);

  // Render costs
  const costDetails = document.createElement('div');
  costDetails.className = 'border-t pt-4 space-y-2';
  costDetails.innerHTML = `
      <div class="flex justify-between">
          <p class="text-gray-700" id="subtotal">Subtotal</p>
          <p class="text-gray-700" id="subtotal-value">$${data.cart.sub_total.toFixed(2)}</p>
      </div>
      <div class="flex justify-between">
          <p class="text-gray-700" id="discount">Total Discount</p>
          <p class="text-gray-700" id="discount-value">-$${data.cart.total_discount.toFixed(2)}</p>
      </div>
      <div class="flex justify-between">
          <p class="text-gray-700" id="taxes">Total Tax</p>
          <p class="text-gray-700" id="taxes-value">$${data.cart.total_tax.toFixed(2)}</p>
      </div>
      <div class="flex justify-between">
          <p class="text-gray-700" id="shipping">Shipping</p>
          <p class="text-gray-700" id="shipping-value">$${data.cart.shipping_cost.toFixed(2)}</p>
      </div>
      <div class="flex justify-between font-semibold pt-2 border-t text-lg">
          <p id="total-label">Total</p>
          <p id="total-value">$${data.cart.grand_total.toFixed(2)}</p>
      </div>
  `;
  orderSummary.appendChild(costDetails);
}

// Update payment button text
function updatePaymentButton() {
  const payButton = document.getElementById('pay-button');
  payButton.textContent = `Pay $ ${data.cart.grand_total.toFixed(2)}`;
}

// Validate form
function validateForm() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  if (paymentMethod === 'card') {
      const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
      const expiryDate = document.getElementById('expiry-date').value;
      const cvv = document.getElementById('cvv').value;

      // Validate card number (19 characters including spaces, 16 digits)
      if (!/^\d{16}$/.test(cardNumber)) {
          alert('Card number must be exactly 16 digits.');
          return false;
      }

      // Validate expiry date (MM/YY format)
      const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryDatePattern.test(expiryDate)) {
          alert('Please enter a valid expiration date in MM/YY format.');
          return false;
      }

      // Additional expiry date validation
      const [expMonth, expYear] = expiryDate.split('/').map(Number);
      const currentDate = new Date();
      const expDate = new Date(`20${expYear}`, expMonth - 1);

      if (expDate < currentDate || expMonth > 12 || expMonth < 1 || expYear < 0) {
          alert('Invalid expiry date.');
          return false;
      }

      // Validate CVV (exactly 3 numeric digits)
      if (!/^\d{3}$/.test(cvv)) {
          alert('CVV must be exactly 3 digits.');
          return false;
      }
  }

  // If validation passes, redirect to the confirmation page.
  // alert('Payment Successful!');
  window.location.href = 'confirmation.html';
  return false; // Prevent actual form submission since we're redirecting
}

// Toggle payment method display
function togglePaymentMethod(method) {
  const cardDetails = document.getElementById('card-details');
  const codDetails = document.getElementById('cod-details');

  if (method === 'card') {
      cardDetails.classList.remove('hidden');
      codDetails.classList.add('hidden');
  } else if (method === 'cod') {
      cardDetails.classList.add('hidden');
      codDetails.classList.remove('hidden');
  }
}


// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  updatePaymentButton();

  const cardNumberInput = document.getElementById('card-number');
  const expiryDateInput = document.getElementById('expiry-date');
  const cvvInput = document.getElementById('cvv');
  const verifyCouponButton = document.getElementById('verify-coupon');

  // Function to format card number input
  cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
      value = value.substring(0, 16); // Limit to 16 digits
      const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = formattedValue;
  });

  // Function to format expiry date input
  expiryDateInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
      if (value.length > 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value.substring(0, 5); // Limit to MM/YY
  });

  // Function to limit CVV input to 3 digits
  cvvInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
      e.target.value = value.substring(0, 3); // Limit to 3 digits
  });

  verifyCouponButton.addEventListener('click', verifyCoupon);
});