const {body} = require("express-validator");
const {user} = require("../prisma/db");
const {compare, hash} = require("bcrypt");

module.exports = {
    isAuth: function (req, res, next) {
        if (req.session.user) {
            return next();
        }
        return res.redirect("/login");
    },
    isGuest: function (req, res, next) {
        if (!req.session.user) {
            return next();
        }
        return res.redirect("/");
    },
    isPremium: function (req,res,next){
        console.log(req.session.user);
        if(req.session.user.premium){
            return next()
        }
        return res.redirect("/premium");
    },
    isNotPremium: function (req,res,next){
        if(!req.session.user.premium){
            return next()
        }
        return res.redirect("back");
    },
    required: {
        fullname: body("fullname")
            .notEmpty()
            .withMessage("Nama Lengkap harus diisi"),
        username: body("username").notEmpty().withMessage("Username harus diisi"),
        email: body("email").notEmpty().withMessage("Email harus diisi"),
        password: body("password").notEmpty().withMessage("Password harus diisi"),
    },
    struct: {
        username: body("username")
            .isString()
            .withMessage("Username harus string")
            .isLength({min: 8})
            .withMessage("Username minimal 8 karakter"),
        email: body("email").isEmail().withMessage("Email tidak valid"),
        password: body("password")
            .isLength({min: 8})
            .withMessage("Password minimal 8 karakter")
            .isAlphanumeric()
            .withMessage("Password harus terdiri dari huruf dan angka"),
        address: body("address").isString().withMessage("Alamat harus berbentuk String"),
        phone: body("phone").optional({checkFalsy: true}).isLength({max: 14}).isMobilePhone("id-ID").withMessage("Nomor tidak valid"),
        birthdate: body("birthdate")
            .optional({checkFalsy: true})
            .isISO8601('yyyy-mm-dd')
            .withMessage("Tanggal tidak valid")
    },
    encrypt: {
        password: async function (req, _, next) {
            req.body.password = await hash(req.body.password, process.env.SALT);
            next();
        }
    },
    match: {
        userPassword: body("password").custom(async (password, {req}) => {
            if (req.User) {
                const pwValid = await compare(password, req.User.password);
                console.log(password);
                if (!pwValid) {
                    throw new Error("Password salah");
                }
            }
        }),
    },
    exist: {
        username: body("username").custom(async (username, {req}) => {
            req.User = await user.findFirst({
                where: {
                    username,
                },
                include: {
                    role: true,
                    Kedai_Profile: true,
                    profile: true
                }
            });
            if (!req.User) {
                throw new Error("Username tidak terdaftar");
            }
        }),
        email: body("email").custom(async (email, {req}) => {
            req.User = await user.findFirst({
                where: {
                    email,
                },
            });
            if (!req.User) {
                throw new Error("Email tidak ditemukan");
            }
        }),
    },
    notExist: {
        username: body("username").custom(async (username) => {
            const User = await user.findFirst({
                where: {
                    username,
                },
            });
            if (User) {
                throw new Error("Username sudah terdaftar");
            }
        }),
        email: body("email").custom(async (email) => {
            const User = await user.findFirst({
                where: {
                    email,
                },
            });
            if (User) {
                throw new Error("Email sudah terdaftar");
            }
        }),
    },
};
