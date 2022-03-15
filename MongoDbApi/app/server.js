// Dépendances
const express = require('express');
const mongoose = require('mongoose');

// Dépendances Middleware
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// Core
const config = require('./config.js');
const routes = require('./controllers/routes.js');

/**
 * Server
 */
module.exports = class Server {
  constructor () {
    this.app = express();
    this.config = config[process.argv[2]] || config.developpement
  }

  /**
   * db connect
   * Gérer les différents cas de connexion à la BD Mongo
   * @returns connect
   */
  dbConnect() {
    const host = this.config.mongodb;
    const connect = mongoose.createConnection(host);

    connect.on('error', (err) => {
      setTimeout(() => {
        console.log('[ERROR] users api dbConnect() -> mongodb error')
        this.connect = this.dbConnect(host);
      }, 5000)

      console.error(`[ERROR] users api dbConnect() -> ${err}`)
    })

    connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] users api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] users api dbConnect() -> close mongodb connection')
        process.exit(0)
      })
    })
    return connect
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.use(compression())
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ 'extended' : true }))
    this.app.use(bodyParser.json())
  }

  /**
   * Routes
   * Appels des différents fichiers qui vont être executé en fonction des routes.
   */
  routes () {
    // Routes for One User
    new routes.user.CreateOne(this.app, this.connect, this.config);
    new routes.user.DeleteOne(this.app, this.connect, this.config);
    new routes.user.ShowOne(this.app, this.connect, this.config);
    new routes.user.UpdateOne(this.app, this.connect, this.config);

    // Routes for Many User
    new routes.users.ShowMany(this.app, this.connect, this.config);

    // Si la route n'existe pas
    this.app.use((req, res) => {
      res.status(404).json({
        'code': 404,
        'message': 'Not Found'
      })
    })
  }

  /**
   * Security
   */
  security () {
    this.app.use(helmet());
    // Permet d'éviter de montrer sur quel os l'api est lancé. + autres données sur le header.
    this.app.disable('x-powered-by');
  }

  /**
   * Run
   */
  run () {
    try {
      this.connect = this.dbConnect()
      this.security();
      this.middleware();
      this.routes();
      this.app.listen(3000);
    } catch (error) {
      console.error(`[ERROR] Server -> ${error}`)
    }
    
  }
}