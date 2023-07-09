fetch('./JS/productos.json').then((respuesta) => respuesta.json())
    .then((productos) => {
        let contenidoProductos = ''
        productos.forEach(producto => {
            contenidoProductos += `
        <div class="col-md-3 mb-4">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text mb-1">${producto.descripcion}</p>
                    <p class="card-text">${producto.precio}</p>
                    <button type="button" class="btn btn-success" onclick="verProducto(${producto.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver Producto</button>
                </div>
            </div>
        </div>
        `
        })

        document.getElementById('contenido').innerHTML = contenidoProductos
    })



const renderBotonCarrito = () => {
    let botonCarrito = document.getElementById('botonCarrito')
    let contenido = `
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cantidadTotalProductos()}
    </span>
    `

    botonCarrito.innerHTML = contenido
}

renderBotonCarrito()

renderProductosCarrito()



// referencia al icono de carrito
const iconoCarrito = document.querySelector('.carrito')

iconoCarrito.addEventListener('click', renderProductosCarrito)

