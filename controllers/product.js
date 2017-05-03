'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
 let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!product) return res.status(404).send({message: `El producto no existe :(`})

    res.status(200).send({product: product})
    // Equivale a res.status(200).send({product}) << en el send json, cuando la llave es = valor

  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!products) return res.status(404).send({message: `No existen productos :(`})

    res.send(200, {products})
  })
}

function saveProduct(req, res) {
  // bodyParser nos permite acceder al cuerpo más fácil
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({message: `Error al guardar en la DB: ${err}`})
    console.log(product)
    res.status(200).send({product: productStored})
  })
}

function updateProduct (req, res) {
 let productId = req.params.productId
   let update = req.body

   Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})

    res.status(200).send( { product: productUpdate} )
   })
}

function deleteProduct (req, res) {
let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!product) return res.status(404).send({message: `El producto no existe :(`})

    product.remove(err => {
      if (err) return res.status(500).send({message: `Error al borrar el producto: ${err}`})

      res.status(200).send({message: `El producto fue elimiando :c`})
    })
    
  })
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  saveProduct
}
