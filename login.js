// Store user data (for demo purposes - in real apps, use a backend!)
const users = [];

// Toggle between Login and Signup Forms
const loginToggle = document.getElementById('login-toggle');
const signupToggle = document.getElementById('signup-toggle');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginToggle.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginToggle.classList.add('active');
  signupToggle.classList.remove('active');
});

signupToggle.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  signupToggle.classList.add('active');
  loginToggle.classList.remove('active');
});

// Signup: Save user data
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;

  // Check if user already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    alert('User already exists! Please login.');
    return;
  }

  // Save user (in real apps, send to backend)
  users.push({ name, email, password });
  alert('Signup successful! Redirecting...');
  window.location.href = 'index.html';
});

// Login: Validate credentials
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Find user
  const user = users.find(user => user.email === email);
  
  if (!user) {
    alert('User not found! Please sign up.');
    return;
  }

  // Check password
  if (user.password !== password) {
    alert('Incorrect password!');
    return;
  }

  alert('Login successful! Redirecting...');
  window.location.href = 'index.html';
});