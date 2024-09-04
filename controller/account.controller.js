var session = require('express-session')
module.exports = function(req,resp){
    if (req.session.account) {
        resp.render('account',{account: req.session.account});
      } else {
        resp.render('login',{error:''});
      }

}