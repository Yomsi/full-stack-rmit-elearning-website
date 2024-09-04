const fs = require("fs");
const Course = require("../models/course");

module.exports = async function (req, resp) {
  if (!(req.session.account?.accountType=='Instructor')) {
    resp.redirect("/account.html");
  }
  let form = {
   
  };
  let error = '';
  if (req.method == "POST") {
    form = req.body;
    //validate form data
    //insert form data to mongo -> course id
    let course = new Course();
    course.courseName = form.courseName;
    course.price = form.price;
    course.description = form.description;
    try{
    await course.save();

    fs.writeFileSync("public/course/" + course._id + ".png", req.file.buffer);
    }catch(e){
        error = 'Error';
    }

    if (error) {
      resp.render("add_course", { error, form });
    } else {
      resp.redirect("/account.html");
    }
  } else {
    resp.render("course/add_course", { error: "", form });
  }
  
};
