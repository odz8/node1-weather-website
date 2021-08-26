const path = require("path");
const { request } = require("express");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geoCode = require("./utils/geocode");
const weatherCode = require("./utils/forecast");

//argv
// const address = process.argv[2];
// console.log(process.argv);

//method get has 2 arguments: 1. route, 2.a function which specifies what will happen in the route
//function has 2 arguments: 1.object containing info about incoming request to server (req) 2. response which contains a number of methods

//DEFINE PATHS FOR EXPRESS CONFIG
//directory a call to app.use: it's a way to customize your server
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//handlebars set up for dynamic templates, AND VIEWS LOCATION
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

//hbs of main
app.get("", (req, res) => {
  //name of the view to render
  res.render("index", {
    //object that contains all values you want the view to access
    title: "Weather.",
    name: " Mikhail Odulio",
  });
});

//for about.hbs
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About creator",
    name: "Mikhail Odulio",
  });
});

//for help.hbs
app.get("/help", (req, res) => {
  res.render("help", {
    title: "frequently asked questions:",
    name: "Mikhail Odulio",
  });
});

//create two more html files.

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send(app.use(express.static(publicDirectoryHelp)));
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page:</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      //input of forecast will be from geocode
      weatherCode(latitude, longitude, (error, weatherData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: weatherData,
          address: req.query.address,
        });
      });
    }
  );
});

//HOW TO GET INFORMATION FROM CLIENT AT BROWSER: query string
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//app.com - imagine we own this domain and have these routes:
//app.com/help
//app.com/about

//start server up! use a method: app.listen
//arguments includeed in listen method: 1. part, 2.callback function (optional)

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404:",
    name: "Mikhail Odulio",
    errorMessage: "Help article not found.",
  });
});
//NOTE: * -match anything that hasnt been matched before

//404 handler
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404:",
    name: "Mikhail Odulio",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
