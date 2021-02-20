const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const URI = process.env.URI_DB_CONTACTS

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })
const contactsRouter = require("./routes/contacts.routes")
const usersRouter = require("./routes/users.routes")

const PORT = process.env.port || 8080

class Server {
  start() {
    this.server = express()
    this.initialMiddleware()
    this.initialRoutes()
    this.listen()
    this.initMongoose()
  }

  initialMiddleware() {
    this.server.use(express.json())
    this.server.use(
      cors({
        origin: "*",
      })
    )
    this.server.use(morgan("combined", { stream: accessLogStream }))
  }

  initialRoutes() {
    this.server.use("/api/contacts", contactsRouter)
    this.server.use("/", usersRouter)
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port: ", PORT)
    })
  }

  async initMongoose() {
    try {
      if (await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })) {
        console.log("Database connection successful")
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const server = new Server()
server.start()
