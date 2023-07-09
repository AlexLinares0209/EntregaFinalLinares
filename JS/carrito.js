/* Funciones para guardar y cargar productos en el carrito */

const guardarCarritoLS = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem('carrito')) || []
}


const renderProductosCarrito = () => {
    let productos = cargarCarritoLS()
    let contenido = ''

    if (cantidadTotalProductos() > 0) {
        contenido += `
        <table class="table">
          <thead>
            <tr>
                <th><button class="btn bg-light btn-sm" onclick="vaciarCarrito()">Vaciar carrito</button></th>
            </tr>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
      `

        productos.forEach(producto => {
            contenido += `
          <tr>
            <td><img src="${producto.imagen}" width="60" alt="${producto.nombre}"></td>
            <td class="small">${producto.nombre}</td>
            <td class="small">
              <button class="btn btn-sm btn-secondary" onclick="disminuirCantidad(${producto.id})">-</button>
              ${producto.cantidad}
              <button class="btn btn-sm btn-secondary" onclick="aumentarCantidad(${producto.id})">+</button>
            </td>
            <td class="small">${producto.precio}</td>
            <td><i class="bi bi-trash3-fill  eliminar" onclick="eliminarProducto(${producto.id})"></i></td>
          </tr>
        `
        })

        contenido += `
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2"></td>
              <td>Total</td>
              <td class="small"><b>S/. ${sumaTotalProductos()}</b></td>
            </tr>
          </tfoot>
        </table>
        <button class="btn btn-primary" onclick="realizarCompra()">Pagar</button>
      `
    } else {
        contenido += `
        <div class="alert alert-success text-center" role="alert">
          No hay productos en el carrito.
        </div>
      `
    }

    document.getElementById('contenido-carrito').innerHTML = contenido
}