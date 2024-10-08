// Función para agregar productos
function addProduct(event) {
    event.preventDefault();

    const category = document.getElementById('product-category').value;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const quantity = document.getElementById('product-quantity').value;
    const imageFile = document.getElementById('product-image').files[0];

    // Verificar que se hayan ingresado todos los campos
    if (!category || !name || !price || !description || !quantity || !imageFile) {
        alert("Por favor, ingrese todos los campos");
        return;
    }

    // Convertir la imagen en base64 para guardarla
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageDataUrl = event.target.result;

        // Recuperar los productos del localStorage (o un arreglo vacío si no hay productos)
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Crear un nuevo producto
        const newProduct = {
            category,
            name,
            price,
            description,
            quantity,
            image: imageDataUrl, // Guardar la imagen en base64
        };

        // Agregar el nuevo producto al arreglo y guardarlo en el localStorage
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        // Limpiar los campos del formulario
        alert("Producto agregado correctamente");
        document.getElementById('add-product-form').reset();
        displayProducts(); // Actualizar la lista de productos
    };

    reader.readAsDataURL(imageFile); // Leer la imagen como base64
}

// Función para mostrar los productos en la página
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ""; // Limpiar el contenido anterior

    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        productList.innerHTML = '<p>No hay productos disponibles</p>';
        return;
    }

    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add('product-item');

        productDiv.innerHTML = `
            <h2>${product.category}</h2>
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover;">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Cantidad: ${product.quantity}</p>
            <p>${product.description}</p>
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Borrar</button>
        `;

        productList.appendChild(productDiv);
    });
}

// Función para eliminar un producto
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1); // Eliminar el producto del array
    localStorage.setItem('products', JSON.stringify(products)); // Guardar el array en el localStorage
    displayProducts(); // Volver a mostrar los productos
    alert('Producto eliminado');
}

// Función para editar un producto
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    // Cargar la información del producto en el formulario
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-quantity').value = product.quantity;

    // Cambiar el comportamiento del botón de agregar o actualizar
    const form = document.getElementById('add-product-form');
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = "Actualizar Producto";

    // Quitar el evento anterior
    form.removeEventListener('submit', addProduct);

    // Agregar el nuevo evento para actualizar el producto
    form.addEventListener('submit', function updateProduct(event) {
        event.preventDefault();

        // Actualizar la información del producto
        const updatedProduct = {
            category: document.getElementById('product-category').value,
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            description: document.getElementById('product-description').value,
            quantity: document.getElementById('product-quantity').value,
            image: product.image // Mantener la imagen original
        };

        // Actualizar el producto en el array
        products[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));

        alert('Producto actualizado');
        submitButton.textContent = 'Agregar Producto';

        // Volver al formulario de agregar productos
        form.reset();
        form.removeEventListener('submit', updateProduct);
        form.addEventListener('submit', addProduct);

        // Volver a mostrar los productos
        displayProducts();
    });
}

// Verificar el acceso de administrador
function checkAdminAccess() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Verificar si el usuario está logueado y si es admin
    if (!loggedInUser || loggedInUser !== 'admin') {
        alert("Acceso denegado. Solo el administrador puede acceder a esta página.");
        window.location.href = '/index.html'; // Redirigir al index si no es el admin
    }
}

// Agregar el evento al formulario de productos
document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', addProduct);
    }

    // Si estamos en la página de administración, verificar el acceso
    if (window.location.pathname.includes('admin.html')) {
        checkAdminAccess();
    }

    displayProducts(); // Mostrar productos al cargar
});

// Manejador para el botón de menú hamburguesa
document.getElementById('hamburger-btn').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
});
