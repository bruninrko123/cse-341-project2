const express = require("express");
require("dotenv").config();
const createError = require("http-errors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3020;
const { initializeDB } = require("./data/database");




//Oauht stuff
app
.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))
.use(passport.initialize())
.use(passport.session())
.use(cors({ 
  
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]}))
.use((req, res, next) =>{

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
})

  

.use("/", require("./routes"));


app.get("/", (req, res) =>{ res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});

app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs"}),
  (req, res) => {
    if(!req.user) {
      return res.redirect("/api-docs")
    }
    req.session.user = req.user;
    res.redirect("/");
  });



passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile)
}
));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});









//swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//404 handler
app.use((req, res, next) => {
  // res.status(404).json({error: "Route not found"});

  next(createError(404, "Route not found"));
});

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});




app.listen(port, () => {
  initializeDB();
  console.log(`Listening on port ${port}`);
});
