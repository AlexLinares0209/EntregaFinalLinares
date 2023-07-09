const estaEnElCarrito = (id) => {
    const carrito = cargarCarritoLS()
    return carrito.some(item => item.id === id)
}


const agregarProducto = (id) => {
    const carrito = cargarCarritoLS()

    if (estaEnElCarrito(id)) {
        let pos = carrito.findIndex(item => item.id === id)
        carrito[pos].cantidad += 1
    } else {

        fetch('./JS/productos.json')
            .then((respuesta) => respuesta.json())
            .then((productos) => {
                const producto = productos.find(item => item.id == id)
                producto.cantidad = 1
                carrito.push(producto)
                guardarCarritoLS(carrito)
                renderBotonCarrito()

                // Mostrar la alerta de toast

                Toastify({
                    text: 'Producto agregado al carrito',
                    duration: 3000, 
                    gravity: 'bottom',
                    position: 'left', 
                    backgroundColor: '#198754',
                    stopOnFocus: true
                }).showToast()

            })
    }

    guardarCarritoLS(carrito)
    renderBotonCarrito()
}


const limpiarAlertaStock = () => {
    const alertaStock = document.getElementById('alerta-stock')
    if (alertaStock) {
        alertaStock.innerHTML = ''
    }
}

const eliminarProducto = (id) => {
    const carrito = cargarCarritoLS()
    const nuevoCarrito = carrito.filter(item => item.id != id)
    guardarCarritoLS(nuevoCarrito)
    renderBotonCarrito()
    renderProductosCarrito()

    // Elimina el alert de stock si no hay productos
    limpiarAlertaStock()

}

const vaciarCarrito = () => {
    localStorage.removeItem('carrito')
    renderBotonCarrito()
    renderProductosCarrito()

    // Elimina el alert de stock al vaciar el carrito
    limpiarAlertaStock()

}

const cantidadTotalProductos = () => {
    const carrito = cargarCarritoLS()
    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0)
}

const sumaTotalProductos = () => {
    const carrito = cargarCarritoLS()
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad * parseFloat(item.precio.replace('S/.', '')), 0)
}


const aumentarCantidad = async (id) => {
    const carrito = cargarCarritoLS()
    const producto = await buscarProducto(id)
    let contenido = ''

    const pos = carrito.findIndex(item => item.id === id)

    if (pos !== -1) {
        const cantidadDisponible = producto.stock
        const cantidadDeseada = 1
        const cantidadTotal = carrito[pos].cantidad + cantidadDeseada

        if (cantidadTotal <= cantidadDisponible) {
            carrito[pos].cantidad = cantidadTotal
            producto.stock -= cantidadDeseada
            guardarCarritoLS(carrito)
            renderProductosCarrito()
        } else {
            contenido += `
            <div class="alert alert-danger text-center my-2" role="alert">
                No hay suficiente stock disponible para agregar más productos
            </div>
            `
            document.getElementById('alerta-stock').innerHTML = contenido
        }
    }
}


const disminuirCantidad = (id) => {
    const carrito = cargarCarritoLS()
    const pos = carrito.findIndex(item => item.id === id)

    if (pos !== -1) {
        if (carrito[pos].cantidad > 1) {
            carrito[pos].cantidad--
        } else {
            carrito.splice(pos, 1)
        }

        guardarCarritoLS(carrito)
        renderProductosCarrito()

        // Elimina el alert de stock si disminuye la cantidad según el stock
        limpiarAlertaStock()


    }
}


const realizarCompra = () => {

    const carrito = cargarCarritoLS()

    
        // lista de productos comprados
        let listaProductos = ''

        carrito.forEach((producto) => {
            listaProductos += `${producto.nombre} - ${producto.descripcion} - ${producto.cantidad} ud. <br>`
        })

        // alerta de SweetAlert con la lista de productos comprados
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada con éxito',
            html: `¡Gracias por tu compra! <br> ${listaProductos} <br> Recibirá un correo en breve.`,
            confirmButtonText: 'Aceptar'
        })
    

    vaciarCarrito()

}