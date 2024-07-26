const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const tokenValidator = async (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        let user = await User.findOne({ _id: decoded.user_id });
        let admin = await Admin.findOne({ _id: decoded.user_id });

        if (user) {
            return { decoded, user };
        } else if (admin) {
            return { decoded, admin };
        } else {
            throw new Error("User or Admin not found");
        }
    } catch (error) {
        return null;
    }
};

const authUser = async (req, res, next) => {
    try {
        const session = req.session.auth;
        if (!session || !session.accessToken || !session.refreshToken || session.role === "admin") {
            req.flash("error", "Session expired. Please log in again.");
            req.session.destroy();
            return res.redirect("/login");
        }
        const result = await tokenValidator(session.accessToken, process.env.ACCESS_TOKEN_SECRET,session.refreshToken);
        if (!result || !result.user) {
            req.flash("error", "Invalid access token");
            req.session.destroy();
            return res.redirect("/login");
        }

        req.session.user = {
            user_id: result.user._id,
            username: result.user.username,
            email: result.user.email,
        };

        next();
    } catch (error) {
        console.error("AuthUser error:", error);
        req.flash("error", "Invalid access token");
        req.session.destroy();
        res.redirect("/login");
    }
};

const authAdmin = async (req, res, next) => {
    try {
        const session = req.session.auth;
        if (!session || !session.accessToken || session.role !== "admin") {
            req.flash("error", "Session expired. Please log in again.");
            req.session.destroy();
            return res.redirect("/login");
        }

        const result = await tokenValidator(session.accessToken, process.env.ACCESS_TOKEN_SECRET, session.refreshToken);
        if (!result || !result.admin) {
            req.flash("error", "Invalid access token");
            req.session.destroy();
            return res.redirect("/login");
        }

        req.session.admin = {
            user_id: result.admin._id,
            username: result.admin.username,
            email: result.admin.email,
            role: result.admin.role,
            via: result.admin.via
        }

        next();
    } catch (error) {
        console.error("AuthAdmin error:", error);
        req.flash("error", "Invalid access token");
        req.session.destroy();
        res.redirect("/login");
    }
};

const authAdminMaster = async (req, res, next) => {
    try {
        const session = req.session.auth;
        if (!session || !session.accessToken || session.role !== "admin") {
            req.flash("error", "Session expired. Please log in again.");
            req.session.destroy();
            return res.redirect("/login");
        }

        const result = await tokenValidator(session.accessToken, process.env.ACCESS_TOKEN_SECRET, session.refreshToken);
        if (!result || !result.admin) {
            req.flash("error", "Invalid access token");
            req.session.destroy();
            return res.redirect("/login");
        }

        // Check if the admin has master role
        if (result.admin.role !== "master") {
            req.flash("error", "Insufficient privileges");
            req.session.destroy();
            return res.redirect("/login");
        }

        req.session.admin = {
            user_id: result.admin._id,
            username: result.admin.username,
            email: result.admin.email,
            role: result.admin.role
        };

        next();
    } catch (error) {
        console.error("AuthAdminMaster error:", error);
        req.flash("error", "Invalid access token");
        req.session.destroy();
        res.redirect("/login");
    }
};


const isAuthenticated = (req, res, next) => {
    try {
        const session = req.session.auth;
        const sessionUser = req.session.user;
        const sessionAdmin = req.session.admin;

        if (!session || (!sessionUser && !sessionAdmin)) {
            return next();
        }

        if (sessionUser) {
            return res.redirect("/dashboard/user");
        } else if (sessionAdmin) {
            if (sessionAdmin.role === "admin") {
                return res.redirect("/dashboard/admin");
            } else if (sessionAdmin.role === "master") {
                return res.redirect("/dashboard/master");
            } else {
                next();
            }
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        next();
    }
};

module.exports = { authUser, isAuthenticated, authAdmin, authAdminMaster };
