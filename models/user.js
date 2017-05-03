'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const userSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String, //url donde se almacena
  password: { type: String, select:false } // para que al hacer consultas no lo envíe al cliente
  signupDate: { type: Date, default: Date.now() }
  lastLogin: Date
})

// Función que se ejecuta antes de que se guarde
userSchema.pre('save', (next) => {
  let user = this 
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next(err)

      user.password = hash

      next()
    })
  })

})

userSchema.methods.gravatar = function () {
  if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')

  return `https://gravatar.com/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', userSchema)





