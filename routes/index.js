const routes = require("express").Router();

const passport = require("passport");



routes.use("/employees", require("./employees"));

routes.use("/services", require("./services"));

routes.get("/login", passport.authenticate("github"), (req, res) => {});

routes.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if(err) {return next(err); }
        res.redirect("/");
    });
});

module.exports = routes;