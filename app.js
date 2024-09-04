const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var session = require('express-session');
var bodyParser = require('body-parser');
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// const Blog = require("./models/blog");
const aboutUsController = require("./controller/about_us.controller")
const accountController = require("./controller/account.controller");
const loginController = require("./controller/login.controller");
const logoutController = require("./controller/logout.controller");
const registerController = require("./controller/register.controller");
const addCourseController = require("./controller/add_course.controller");
const homeController = require("./controller/home.controller");


//connect to mongodb
const dbURI =
  "mongodb+srv://s3927046:Test1234@nodetuts.hxpet.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

// express app
const app = express();

app.listen('3000');

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

//Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));

// //mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New Blog",
//     snippet: "about my new blog",
//     body: "more about my blog",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })
console.log(aboutUsController);
app.get('/about-us.html',aboutUsController);
app.get('/account.html',accountController);
app.post('/account.html',loginController);
app.get('/logout.html', logoutController);
app.get('/register.html', registerController);
app.post('/register.html', upload.single('profilePicture'), registerController);
app.get('/add_course.html', addCourseController);
app.post('/add_course.html', upload.single('mainImage'), addCourseController);
app.get('/index.html', homeController);
app.get('/', homeController);


app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// app.get("/", (req, res) => {
//   const blogs = [
//     {
//       title: "Yoshi finds eggs",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//     {
//       title: "Mario finds stars",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//     {
//       title: "How to defeat bowser",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//   ];
//   res.render("index", { title: "Home", blogs });
// });

// app.get("/about", (req, res) => {
//   res.render("about", { title: "About" });
// });

// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// app.get("/blogs/create", (req, res) => {
//   res.render("create", { title: "Create a new blog" });
// });

// app.get("/blogs/create", (req, res) => {
//   res.render("about_us.html", { title: "Create a new blog" });
// });

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
