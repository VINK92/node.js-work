const express = require('express');
const cors = require('cors');
const contactsRouter = require('./routes/contacts.routes')

const PORT = process.env.port || 8080;

class Server {

  start() {
    this.server = express();
    this.initialMiddleware();
    this.initialRoutes();
    this.listen();
  }

  initialMiddleware() {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: '*'
    }))
  }
  
  initialRoutes() {
    this.server.use('/api/contacts', contactsRouter)
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log('Server is listening on port: ', PORT);
    })
  }

}

const server = new Server();
server.start();