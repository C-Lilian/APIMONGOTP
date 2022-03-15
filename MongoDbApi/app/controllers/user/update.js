const UserModel = require('../../models/user.js');

const Update = class Update {
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
    this.app.put('/user/update/:id', (req, res) => {
      try {
        console.log(req.body);
        this.UserModel.findByIdAndUpdate(req.params.id, req.body, function(err) {
          if (err) {
            console.error(`[ERROR] user/delete/:id -> ${err}`);
          }
          return res.status(200).json({
            'code': 200,
            'message': `User ${req.params.id} has been UPDATED`
          })
        })
      } catch (error) {
        console.error(`[ERROR] user/update/:id -> ${error}`)

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

module.exports = Update;