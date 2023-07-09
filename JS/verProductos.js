/* modal */

const renderVerProducto = (producto) => {

    let contenidoVerProducto = `
    <div class="col-md-4">
        <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
    </div>
    <div class="col-md-6">  
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text mb-1">${producto.descripcion}</p>
        <p class="card-text">${producto.precio}</p>
        <p class="card-text">stock: ${producto.stock}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${producto.id})">Agregar</button>
    </div>
    `

    document.getElementById('contenido-producto').innerHTML = contenidoVerProducto
}

const verProducto = (id) => {
    fetch('./JS/productos.json').then((respuesta) => respuesta.json())
        .then((productos) => {
            let producto = productos.find(item => item.id == id)
            renderVerProducto(producto)
        })
}