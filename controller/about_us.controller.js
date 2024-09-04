module.exports = function(req,resp){
    let members = [
        {
            name:'A',
            role:'R'
        },
        {
            name:'B',
            role:'R2'
        },
    ]
resp.render('about_us',{members});
}