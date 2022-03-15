const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  gender: String,
  promo: String,
  speciality: String,
  password: String,
  notations: Number
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = Schema