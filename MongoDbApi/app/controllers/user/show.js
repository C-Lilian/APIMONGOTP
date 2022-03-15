const UserModel = require('../../models/user.js');

const Show = class Show {
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
    this.app.get('/user/show/:id', (req, res) => {
      try {
        // Regarder la méthode findOne 
        this.UserModel.findById(req.params.id).then(user => {
          res.status(200).json(user || {})
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal server error'
          })
        })
      } catch (error) {
        console.error(`[ERROR] users/show/:id -> ${error}`)

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

module.exports = Show;