const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/database")

const coleccion = () => getDatabase().collection("productos")

function normalizar(datos) {
  return {
    nombre: String(datos.nombre || "").trim(),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    marca: String(datos.marca || "").trim(),
    categoria: String(datos.categoria || "").trim(),
    descripcionCorta: String(datos.descripcionCorta || "").trim(),
    descripcionLarga: String(datos.descripcionLarga || "").trim(),
    edadDesde: Number(datos.edadDesde),
    edadHasta: Number(datos.edadHasta),
    foto: String(datos.foto || "").trim(),
    envio: Boolean(datos.envio)
  }
}

function validar(p) {
  const campos = ["nombre", "marca", "categoria", "descripcionCorta", "descripcionLarga", "foto"]
  const faltantes = campos.filter(campo => !p[campo])
  if (faltantes.length) return `Faltan campos obligatorios: ${faltantes.join(", ")}`
  if (!Number.isFinite(p.precio) || p.precio <= 0) return "El precio debe ser mayor que cero"
  if (!Number.isInteger(p.stock) || p.stock < 0) return "El stock debe ser un entero mayor o igual a cero"
  if (!Number.isInteger(p.edadDesde) || p.edadDesde < 0) return "La edad inicial no es válida"
  if (!Number.isInteger(p.edadHasta) || p.edadHasta < p.edadDesde) return "La edad final no es válida"
  return null
}

const obtenerTodos = () => coleccion().find({}).sort({ nombre: 1 }).toArray()
const obtenerPorId = id => coleccion().findOne({ _id: new ObjectId(id) })

async function crear(datos) {
  const producto = { ...normalizar(datos), creadoEn: new Date(), actualizadoEn: new Date() }
  const resultado = await coleccion().insertOne(producto)
  return { ...producto, _id: resultado.insertedId }
}

async function actualizar(id, datos) {
  return coleccion().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...normalizar(datos), actualizadoEn: new Date() } },
    { returnDocument: "after" }
  )
}

const eliminar = id => coleccion().findOneAndDelete({ _id: new ObjectId(id) })

module.exports = { normalizar, validar, obtenerTodos, obtenerPorId, crear, actualizar, eliminar }
