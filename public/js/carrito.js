let carrito = []

function agregarAlCarrito(producto) {
    if (!producto) return

    const existente = carrito.find(
        p => p.nombre === producto.nombre
    )

    if (existente) {
        existente.cantidad++
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        })
    }

    mostrarCarrito()
    mostrarMensajeCarrito(
        `${producto.nombre} se agregó al carrito`
    )
}

function mostrarCarrito() {
    const contenedor = document.querySelector("#items-carrito")
    const totalCarrito = document.querySelector("#total-carrito")

    if (!contenedor || !totalCarrito) return

    let html = ""
    let total = 0

    for (let producto of carrito) {
        const subtotal = producto.precio * producto.cantidad
        total += subtotal

        html += `
            <div class="item-carrito">
                <img src="${producto.foto}" alt="${producto.nombre}">
                <div>
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio}</p>
                    <div class="acciones-carrito">
                     <button onclick="restarCantidad('${producto.nombre}')">-</button>
                        <span>${producto.cantidad}</span>
                        <button onclick="sumarCantidad('${producto.nombre}')">+</button>
                        <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
                        </div>
                    <p>Subtotal: $${subtotal}</p>
                </div>
            </div>
        `
    }

    if (carrito.length === 0) {
        html = "<p>El carrito está vacío</p>"
    }

    contenedor.innerHTML = html
    totalCarrito.textContent = `Total: $${total}`
}

function abrirCerrarCarrito() {
    document.querySelector("#modal-carrito").classList.toggle("oculto")
}

function cerrarCarrito() {
    document.querySelector("#modal-carrito").classList.add("oculto")
}

document.querySelector("#boton-carrito").addEventListener("click", abrirCerrarCarrito)

document.querySelector("#cerrar-carrito").addEventListener("click", cerrarCarrito)

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        cerrarCarrito()
    }
})

document.querySelector("#modal-carrito").addEventListener("click", function(e) {
    if (e.target.id === "modal-carrito") {
        cerrarCarrito()
    }
})

function sumarCantidad(nombre) {
    const producto = carrito.find(p => p.nombre === nombre)
    producto.cantidad++
    mostrarCarrito()
}

function restarCantidad(nombre) {
    const producto = carrito.find(p => p.nombre === nombre)

    if (producto.cantidad > 1) {
        producto.cantidad--
    } else {
        eliminarDelCarrito(nombre)
    }

    mostrarCarrito()
}

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(p => p.nombre !== nombre)
    mostrarCarrito()
}


async function confirmarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío")
        return
    }

    const total = carrito.reduce((acum, producto) => {
        return acum + producto.precio * producto.cantidad
    }, 0)

    const pedido = {
        fecha: new Date().toLocaleString(),
        productos: carrito,
        total: total
    }

    await guardarPedido(pedido)

    carrito = []
    mostrarCarrito()
    cerrarCarrito()

    alert("Compra confirmada correctamente")
}


document
    .querySelector("#confirmar-compra")
    .addEventListener("click", confirmarCompra)

function mostrarMensajeCarrito(texto) {
    const mensaje = document.querySelector("#mensaje-carrito")

    mensaje.textContent = texto
    mensaje.classList.add("visible")

    setTimeout(() => {
        mensaje.classList.remove("visible")
    }, 2000)
}