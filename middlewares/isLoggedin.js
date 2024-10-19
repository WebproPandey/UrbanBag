let jwt =  require("jsonwebtoken")
const usermodel =  require("../models/user-models")

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "You need Login First");
        return res.redirect("/");
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        
        let user = await usermodel.findOne({ email: decoded.email });

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/");
        }

        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "Invalid token or something went wrong");
        res.redirect("/");
    }
}