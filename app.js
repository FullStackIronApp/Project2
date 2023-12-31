// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// For sessions
require('./config/session.config.js')(app);
// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "project2";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const loginRoutes = require("./routes/login.routes")
app.use("/", loginRoutes)

const signupRoutes = require("./routes/signup.routes")
app.use("/", signupRoutes)

const moviesRoutes = require("./routes/movies.routes")
app.use("/", moviesRoutes)

const profileRoutes = require("./routes/profile.routes")
app.use("/", profileRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


module.exports = app;
