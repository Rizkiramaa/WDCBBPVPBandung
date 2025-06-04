<!DOCTYPE html>
<html>
<head><title>Login Admin</title></head>
<body>
  <h2>Login Admin</h2>
  <form id="loginForm">
    <input type="text" id="username" placeholder="Username" required />
    <input type="password" id="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
  <script src="js/login.js"></script>
</body>
</html>
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.success) {
    alert('Login berhasil!');
    window.location.href = 'dashboard.html';
  } else {
    alert(data.error);
  }
});
