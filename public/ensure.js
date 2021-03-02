/************************************************************************************
* WEB322 – Assignment 3 (Winter 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Emre Isik
* Student ID: 137524195
* Course: WEB322NCC
*
************************************************************************************/

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