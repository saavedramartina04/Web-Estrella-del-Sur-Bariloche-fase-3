const Carrito = require("../models/carrito.model")

async function recibir(req, res, next) {
  try {
    const productos = Array.isArray(req.body) ? req.body : req.body.productos
    if (!Array.isArray(productos) || !productos.length) return res.status(400).json({ error: "Se debe enviar un array de productos" })
    console.log("Carrito recibido:", JSON.stringify(productos, null, 2))
    res.status(201).json({ mensaje: "Pedido recibido correctamente", pedido: await Carrito.guardar(productos) })
  } catch (e) { next(e) }
}
module.exports = { recibir }
