//registro de usuarios
function registerUser(event) {
    event.preventDefault();
    
  const username = document.getElementById('register-username').value.trim();
const password = document.getElementById('register-password').value.trim();

if (!username || !password) {
    alert('Por favor, ingrese un usuario y contraseña válidos');
    return;
}

let users = JSON.parse(localStorage.getItem('users')) || [];

// Verificar si el usuario ya existe
const userExists = users.some(user => user.username === username);

if (userExists) {
    alert('El usuario ya existe. Por favor, elija otro nombre de usuario.');
    return;
}

// Si el usuario no existe, se agrega a la lista
users.push({ username, password });
localStorage.setItem('users', JSON.stringify(users));

// Confirmar el registro
alert('Registro exitoso. Puedes iniciar sesión ahora.');

// Limpiar los campos del formulario
document.getElementById('register-username').value = '';
document.getElementById('register-password').value = '';

    
    if (userExists) {
        alert('El usuario ya existe. Por favor, ingrese un nombre de usuario diferente');
        return;
    }
    
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('El usuario se ha registrado correctamente');
    document.getElementById('register-form').reset();
    window.location.href = '../html/login.html';
}

//agregar los event listener en los formularios
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }
});

document.getElementById('hamburger-btn').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');//activa o desactiva la clase "active " para mostrar / ocultar el menu
});