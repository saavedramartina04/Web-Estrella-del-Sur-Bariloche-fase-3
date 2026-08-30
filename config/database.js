const { MongoClient } = require("mongodb")
const config = require("./config")

let client
let database

async function connectDatabase() {
  if (database) return database

  if (!config.mongoUri) {
    throw new Error("Falta MONGODB_URI en el archivo .env")
  }

  client = new MongoClient(config.mongoUri)
  await client.connect()
  database = client.db(config.databaseName)
  await database.command({ ping: 1 })
  console.log(`MongoDB conectado: ${config.databaseName}`)
  return database
}

function getDatabase() {
  if (!database) throw new Error("La base de datos todavía no está conectada")
  return database
}

async function closeDatabase() {
  if (client) await client.close()
  client = undefined
  database = undefined
}

module.exports = { connectDatabase, getDatabase, closeDatabase }
