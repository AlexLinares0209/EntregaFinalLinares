const buscarProducto = async (id) => {
    return fetch('./JS/productos.json')
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            let producto = productos.find(item => item.id === id)
            return producto
        })
}

const renderProductosEncontrados = (productos) => {

    let contenidoProductosEncontrados = ''

    if (productos.length > 0) {

        productos.forEach(producto => {
            contenidoProductosEncontrados += `
            <div class="col-md-3">
              <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">${producto.precio}</p>
                  <button type="button" class="btn btn-success" onclick="verProducto(${producto.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver Producto</button>
                </div>
              </div>
            </div>
            `
        })

    }

    else {
        contenidoProductosEncontrados += `
        <div class="container">
            <div class="alert alert-success text-center" role="alert">
                No se encontraron resultados
            </div>
      
            <a href="index.html" class="btn btn-success">Volver</a>

            <div class="container d-flex justify-content-center">
                <img src="./images/noEncontrado.svg" class="no-encontrado">
            </div
        </div>
        `
    }

    document.getElementById('contenido').innerHTML = contenidoProductosEncontrados
}

const buscarProductos = () => {
    const textoBusqueda = document.getElementById('inputBusqueda').value.toLowerCase()

    fetch('./JS/productos.json')
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            const productosEncontrados = productos.filter(producto =>
                producto.tipo.toLowerCase().includes(textoBusqueda)
            )

            // Renderiza los productos encontrados
            renderProductosEncontrados(productosEncontrados)
        })
}


btnBuscar.addEventListener('click', buscarProductos)