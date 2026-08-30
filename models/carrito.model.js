const { getDatabase } = require("../config/database")

async function guardar(productos) {
  const total = productos.reduce((suma, p) => suma + Number(p.precio) * Number(p.cantidad), 0)
  const pedido = { productos, total, fecha: new Date() }
  const resultado = await getDatabase().collection("pedidos").insertOne(pedido)
  return { ...pedido, _id: resultado.insertedId }
}

module.exports = { guardar }
