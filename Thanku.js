function sendWhatsAppInvoice() {
  let customerName = document.getElementById("customer-name").value.trim();
  let phoneNumber = document.getElementById("phone-number").value.trim();
  if (!customerName || !phoneNumber) {
      alert("Please enter both customer name and phone number.");
      return;
  }

  // Retrieve cart data from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalAmount = 0;
  let productList = "";

  cart.forEach(item => {
      let itemTotal = (item.price * (item.quantity / 1000)).toFixed(2);
      totalAmount += parseFloat(itemTotal);
      productList += `- ${item.name} (${item.quantity}g) - ₹${itemTotal} %0A`;
  });

  let message = `Hi ${customerName}, %0A%0A`
      + `🛒 *Order Details:* %0A`
      + `- Company: Shreya Food Agency %0A`
      + `- Product List: %0A${productList}`
      + `- Total Amount: ₹${totalAmount.toFixed(2)} %0A%0A`
      + `Let me know if you have any questions. %0A`
      + `Thank you for the order! %0A`
      + `Visit Again! %0A%0A`
      + `*[Shreya Food Agency]*`;
  
  let whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappURL, '_blank');
}