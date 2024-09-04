const countries = require("../models/country");
const fs = require("fs");
const User = require("../models/user");

module.exports = async function (req, resp) {
  if (req.session.account) {
    resp.redirect("/account.html");
  }
  let form = {
    email: "name@email.com",
    phoneNumber: "0968436821",
    password: "password",
    retypePassword: "password",
    firstName: "Hello",
    lastName: "Last Name",
    address: "Address 1, register str, limited edition city",
    city: "hanoi",
    zipcode: "10000",
    country: "Vietnam",
    accountType: "Learner",
    schoolName: "",
    jobTitle: "",
  };
  let error = '';
  if (req.method == "POST") {
    form = req.body;
    //validate form data
    //insert form data to mongo -> user id
    let user = new User();
    user.email = form.email;
    user.phoneNumber = form.phoneNumber;
    user.password = form.password;
    user.retypePassword = form.retypePassword;
    user.firstName = form.firstName;
    user.lastName = form.lastName;
    user.address = form.address;
    user.city = form.city;
    user.zipcode = form.zipcode;
    user.country = form.country;
    user.accountType = form.accountType;
    user.schoolName = form.schoolName;
    user.jobTitle = form.jobTitle;
    try{
    await user.save();

    fs.writeFileSync("public/profile/" + user._id + ".png", req.file.buffer);
    }catch(e){
        console.error('Register',e);
        error = 'Error';
    }

    if (error) {
      resp.render("register", { error, form, countries });
    } else {
      resp.redirect("/account.html");
    }
  } else {
    resp.render("register", { error: "", form, countries });
  }
  /*
    let {emailOrPhone,password} = req.body;

    //Querry out user
    if(password=='123456'){
        let account = {
            email:'test@abc.com',
            phone:'09876543221',
            
        }
        req.session.account = account;

        resp.render('register',{account: req.session.account});
    } else {
        
    }*/
  // resp.render('about_us',{members});
};
