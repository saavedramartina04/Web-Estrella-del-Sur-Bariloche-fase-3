require("dotenv").config()

const config = {
  port: Number(process.env.PORT) || 8080,
  mongoUri: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DB || "web_estrella"
}

module.exports = config
