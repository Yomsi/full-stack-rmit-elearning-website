module.exports = function(req,resp){
    req.session.account = null;
    resp.redirect('/account.html');
}