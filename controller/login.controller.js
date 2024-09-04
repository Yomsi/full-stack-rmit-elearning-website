const User = require('../models/user');
module.exports = async function(req,resp){
    
    let {emailOrPhone,password} = req.body;
    let user = await User.findOne({email:emailOrPhone});
    if(!user){
        user = await User.findOne({phoneNumber:emailOrPhone});
    }
    if(user?.password==password){
        
        req.session.account = user;

        resp.redirect('/account.html');
    } else {
        resp.render('login',{error:'Incorrect username or password'
        });
    }
// resp.render('about_us',{members});
}