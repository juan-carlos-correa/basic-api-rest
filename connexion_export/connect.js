'use strict'

const mongoose = require('mongoose')
const app = require('../app.js')
const config = require('./config.js')

const connexion = mongoose.connect(config.db, (err, res) => {
  if (err) throw err
  console.log('Conexion a la DB establecida')
  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})

module.exports = connexion
