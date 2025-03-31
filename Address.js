document.getElementById('address-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Basic validation
  const phone = document.getElementById('phone').value;
  if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
  }

  // If validation passes, submit the form
  this.submit();
  
  // For demo: Show confirmation (remove in production)
  alert('Address saved! Redirecting to payment...');
});