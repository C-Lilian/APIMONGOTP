// For One User
const ShowOne = require('./user/show.js')
const CreateOne = require('./user/create.js')
const DeleteOne = require('./user/delete.js')
const UpdateOne = require('./user/update.js')

// For Many Users
const ShowMany = require('./users/show.js')
/*const CreateMany = require('./users/create.js')
const DeleteMany = require('./users/delete.js')
const UpdateMany = require('./users/update.js')*/

module.exports = {
  users: {
    ShowMany
  },
  user: {
    CreateOne,
    DeleteOne,
    UpdateOne,
    ShowOne
  }
}