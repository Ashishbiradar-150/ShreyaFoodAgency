function showForm(method) {
  // Hide all forms
  document.querySelectorAll(".payment-form").forEach(form => {
      form.style.display = "none";
  });

  // Show the selected form
  document.getElementById(method + "-form").style.display = "block";
}

function placeOrder() {
  alert("Order placed successfully! Thank you for shopping with us.");
  window.location.href = "Thanku.html"; // Redirect to thank you page
}