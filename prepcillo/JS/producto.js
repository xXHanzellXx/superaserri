//funcion para agregar productos
function addProduct(event) {
  event.preventDefault();

  const category = document.getElementById('product-category').value;
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const description = document.getElementById('product-description').value;
  const quantity = document.getElementById('product-quantity').value;
  const imageFile = document.getElementById('product-image').files[0];

  // verificar que se hayan ingresado todos los campos
  if (!category ||!name || !price || !description || !quantity || !imageFile) {
    alert("Por favor, ingrese todos los campos");
    return;
  }

  //convertir la imagen en base64 para guardarla
  const reader = new FileReader();
  reader.onload = function(event) {
    const imageDataUrl = event.target.result;

    //recuperar los productos del localstorage (o un arreglo vacio si no hay productos)
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // crear un nuevo producto
    const newProduct = {
      category,
      name,
      price,
      description,
      quantity,
      image: imageDataUrl, //guardar la imagen en base64
    };

    // agregar el nuevo producto al arreglo y guardarlo en el localstorage
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    // limpiar los campos del formulario
    alert("Producto agregado correctamente");
    document.getElementById('add-product-form').reset();
  };

  reader.readAsDataURL(imageFile); //lerr la imagen como base 64
}

// agregar el evento al formulario de productos

document.addEventListener('DOMContentLoaded', function() {
  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', addProduct);
  }
});

// al carcar la pagina de administrador verificamos si es admin
function checkAdminAccess() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  //verificar si el usuario esta logeado y si es admin
  if (!loggedInUser || loggedInUser !== 'admin') {
    alert(
      "Acceso denegado. Solo el administrador puede acceder a esta página."
    );
    window.location.href = '/index.html'; //redirige al index si no es el admin}
  }
}

//agregarl os event listeners en los formularios
document.addEventListener('DOMContentLoaded', function() {
  //si estamos en la pagina de administracion verificamos el acceso
  if (window.location.pathname.includes('admin.html')) {
    checkAdminAccess();
  }
});

//funcion para mostrar los productos en la pagina
function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ""; //limpiar el contenido anterior

  let product = JSON.parse(localStorage.getItem("products")) || [];

  if (product.length === 0) {
    productList.innerHTML = '<p>No hay productos disponibles</p>';
    return;
  }

  product.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add('product-item');

    productDiv.innerHTML = `
            <h2>${product.category}</h2
            <h3>${product.name}</h3>>
            <p>Precio: $${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Cantidad: ${product.quantity}</p>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100px;">
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Borrar</button>
    `;

    productList.appendChild(productDiv);
  });
}

//llamar la funcion para mostrar los productos cuando la pagina cargue
document.addEventListener("DOMContentLoaded", function() {
  displayProducts();
});

//funcion para eliminar un producto
function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  //Eliminar el producto del array
  products.splice(index, 1);

  // guardar el array en el local storage
  localStorage.setItem('products', JSON.stringify(products));

  // volver a mostrar los productos
  displayProducts();

  alert('Producto eliminado');
}

//funcion para editar un producto
function editProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  //cargar la informacion del prodycti en el formulario
  const product = products[index];
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-description').value = product.description;
  document.getElementById('product-quantity').value = product.quantity;

  //cambiar el comportamiento del boton  de agregar o actualizar
  const form = document.getElementById('add-product-form');
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.textContent = "Actualizar Producto";

  //quitar el evento anterior
  form.removeEventListener('submit', addproduct);

  //agregar el nuevo evento para actualizar el producto
  form.addEventListener('submit', function updateProduct(event) {
    event.preventDefault();

    //actualizar la informacion del producto
    const updatedProduct = {
      category: document.getElementById('product-category').value,
      name: document.getElementById('product-name').value,
      price: document.getElementById('product-price').value,
      description: document.getElementById('product-description').value,
      quantity: document.getElementById('product-quantity').value,
      image: product.image //mantener la imagen original
    };

    //actualizar el producto en el array
    products[index] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));

    alert('Producto actualizado');
    submitButton.textContent = 'Agregar Producto';

    //volver al formulario de agregar productos
    form.reset();

    form.removeEventListener('submit', updateProduct);
    form.addEventListener('submit', addProduct);

    //volver a mostrar los productos
    displayProducts();
  });
}

//Funcion para mostrar los productos en la pagina como targetas
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (products.length === 0) {
        productList.innerHTML = '<p>No hay productos disponibles</p>';
        return;
    }
    
    products.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    
    productDiv.innerHTML = `
        <h2>${product.category}</h2>
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <p>Cantidad: ${product.quantity}</p>
        <p>${product.description}</p>
        <button onclick="editProduct(${index})">editar</button>
        <button onclick="deleteProduct(${index})">eliminar</button>
        `;
        
        productList.appendChild(productDiv);
    });
}

//llamar a la funcion para mostrar los productos cuando la pagina cargue
document.addEventListener('DOMContentLoaded', function() {
  displayProducts;
});


  document.getElementById('hamburger-btn').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
});


