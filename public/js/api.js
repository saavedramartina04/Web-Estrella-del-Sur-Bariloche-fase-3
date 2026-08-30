const URL_PRODUCTOS = "/api/productos"
const URL_CARRITO = "/api/carrito"
async function obtenerProductos() {
    const respuesta = await fetch(URL_PRODUCTOS)

    if (!respuesta.ok) {
        console.error("Error al obtener productos")
        return []
    }

    const datos = await respuesta.json()
    return datos.map(producto => ({ ...producto, id: producto._id }))
}

async function agregarProducto(producto) {
    const respuesta = await fetch(URL_PRODUCTOS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    })

    if (!respuesta.ok) throw new Error((await respuesta.json()).error || "No se pudo agregar el producto")
    return await respuesta.json()
}

async function actualizarProducto(id, producto) {
    const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    })
    if (!respuesta.ok) throw new Error((await respuesta.json()).error || "No se pudo actualizar el producto")
    return await respuesta.json()
}

async function guardarPedido(pedido) {
    const respuesta = await fetch(URL_CARRITO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido.productos)
    })

    if (!respuesta.ok) throw new Error((await respuesta.json()).error || "No se pudo guardar el pedido")
    return await respuesta.json()
}

async function eliminarProducto(id) {
  const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
    method: "DELETE"
  })

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el producto")
  }
}
