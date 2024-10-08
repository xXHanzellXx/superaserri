//Inicio de sesioon con verificacion de administrador
function loginUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    //verificacion del administrador
    if (username === 'admin' && password === '1234') {
        alert(`Bienvenido, administrador`);
        console.log("Administrador logueado");
        localStorage.setItem('loggedInUser', 'admin');// guardar en el localstorage
        window.location.href = '../HTML/admin.html';
        return;
    }
    
    //verificacion del usuario normal
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        alert(`Bienvenido, ${user.username}`);
        localStorage.setItem('loggedInUser', 'username');// guardar en el nombre de usuario logeado
        window.location.href = '/index.html';//redurigir a la pagina principal
    } else {
        alert('Usuario o contraseña incorrectos')
    }
}

//agregar los event listeners en los formularios
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
});

document.getElementById('hamburger-btn').addEventListener(`click`, function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
});

