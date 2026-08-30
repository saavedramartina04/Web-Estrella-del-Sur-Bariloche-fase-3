function rutaNoEncontrada(req, res) { res.status(404).json({ error: "Ruta no encontrada" }) }
function manejarError(error, req, res, next) {
  console.error(error)
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" })
}
module.exports = { rutaNoEncontrada, manejarError }
