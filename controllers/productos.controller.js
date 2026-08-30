const { ObjectId } = require("mongodb")
const Producto = require("../models/producto.model")

async function listar(req, res, next) { try { res.json(await Producto.obtenerTodos()) } catch (e) { next(e) } }
async function obtener(req, res, next) {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "ID inválido" })
    const producto = await Producto.obtenerPorId(req.params.id)
    return producto ? res.json(producto) : res.status(404).json({ error: "Producto no encontrado" })
  } catch (e) { next(e) }
}
async function crear(req, res, next) {
  try {
    const datos = Producto.normalizar(req.body), error = Producto.validar(datos)
    if (error) return res.status(400).json({ error })
    res.status(201).json(await Producto.crear(datos))
  } catch (e) { next(e) }
}
async function actualizar(req, res, next) {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "ID inválido" })
    const datos = Producto.normalizar(req.body), error = Producto.validar(datos)
    if (error) return res.status(400).json({ error })
    const producto = await Producto.actualizar(req.params.id, datos)
    return producto ? res.json(producto) : res.status(404).json({ error: "Producto no encontrado" })
  } catch (e) { next(e) }
}
async function eliminar(req, res, next) {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "ID inválido" })
    const producto = await Producto.eliminar(req.params.id)
    return producto ? res.json({ mensaje: "Producto eliminado", producto }) : res.status(404).json({ error: "Producto no encontrado" })
  } catch (e) { next(e) }
}
module.exports = { listar, obtener, crear, actualizar, eliminar }
