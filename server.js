const app = require("./app")
const config = require("./config/config")
const { connectDatabase, closeDatabase } = require("./config/database")

async function iniciar() {
  await connectDatabase()
  const servidor = app.listen(config.port, () => console.log(`Servidor disponible en http://localhost:${config.port}`))
  async function cerrar() {
    servidor.close(async () => { await closeDatabase(); process.exit(0) })
  }
  process.on("SIGINT", cerrar)
  process.on("SIGTERM", cerrar)
}

iniciar().catch(error => { console.error("No se pudo iniciar el servidor:", error.message); process.exit(1) })
