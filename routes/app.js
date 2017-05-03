'use strict'

const express = require('express')
const api = express.Router()
const ProductCtrl = require('../controllers/product.js')
const auth = require('../middlewares/auth')

// Escucha de peticiones
api.get('/product', ProductCtrl.getProducts)
api.get('/product/:productId', ProductCtrl.getProducts)
api.post('/product', ProductCtrl.saveProduct)
api.put('/product/:productId', ProductCtrl.updateProduct)
api.delete('/product/:productId', ProductCtrl.deleteProduct)
api.get('private', auth.isAuth, function(req, res){
  res.status(200).send( {message: 'Tienes acceso'} )
})

module.exports = api