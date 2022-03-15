const UserModel = require('../../models/user.js');

const Delete = class Delete {
  /**
   * @constructor
   * @param {Object} app 
   * @param {Object} config 
   */
  constructor (app, connect, config) {
    this.app = app;
    this.UserModel = connect.model('User', UserModel);
    this.run()
  }

  /**
   * Middleware
   */
  middleware() {
    this.app.delete('/user/delete/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndRemove(req.params.id, function(err) {
          if (err) {
            console.error(`[ERROR] user/delete/:id -> ${err}`);
          }
          return res.status(200).json({
            'code': 200,
            'message': `User ${req.params.id} has been DELETED`
          })
        })
      } catch (error) {
        console.error(`[ERROR] user/delete/:id -> ${error}`)

        res.status(400).json({
          'code': 400,
          'message': 'Bad request'
        })
      }
    })
  }

  /**
   * Run
   */
  run() {
    this.middleware()
  }
}

module.exports = Delete;