document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showAlert("Please fill out all fields.", "error");
    return;
  }

  if (!validateEmail(email)) {
    showAlert("Please enter a valid email address.", "error");
    return;
  }

  showAlert("Thank you for contacting us! We'll get back to you soon.", "success");
  
  // In a real app, you would submit the form to a server here
  // this.submit();
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.textContent = message;
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.left = '50%';
  alertDiv.style.transform = 'translateX(-50%)';
  alertDiv.style.padding = '15px 25px';
  alertDiv.style.borderRadius = '5px';
  alertDiv.style.zIndex = '1000';
  alertDiv.style.color = 'white';
  alertDiv.style.fontWeight = '600';
  
  if (type === 'error') {
    alertDiv.style.backgroundColor = '#EF4444';
  } else {
    alertDiv.style.backgroundColor = '#10B981';
  }
  
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}