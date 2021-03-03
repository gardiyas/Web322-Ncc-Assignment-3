module.exports = {
    ensureLogin: function (req, res, next) {
        if (!req.session.user) {
            res.redirect("/login.html");
        } else {
            next();
        }
    },

    ensureLogin2: function (req, res, next) {
        if (req.session.user) {
            res.redirect("/dashboard");
        } else {
            next();
        }
    },
};