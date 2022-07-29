var express = require('express');
var router = express.Router();
const passport = require("passport");
const {User} = require("../models/user.model");
const url = require('url');
const jwt = require("jsonwebtoken");
const {updateUserByUsername,showOneUserByUsername ,createUser, showUsers, showOneUser, deleteUser, updateUser,
     getUserByEmail, updateUserTokens, getUserByResetToken, deleteResetTokens, updateProfile, BlockUser,
    deblockUser } = require("../controllers/user.controller");
const { ROLES } = require('../utils/roles');
const { promisify } = require('util');
const crypto = require('crypto');
const multer  = require('multer')
const path = require("path");
var fs = require('fs');
const nodemailer = require('nodemailer');


const DIR = './uploads';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage });
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'example@gmail.com',
        pass: '', // add your secret keyu
    },
});

transporter.verify().then(console.log).catch(console.error);


router.post("/add", isLoggedIn, isAdmin, createUser)
router.get("/list", isLoggedIn, isAdmin, showUsers)
router.get("/show/:id" , isLoggedIn, isAdmin, showOneUser)
router.get("/showByUsername/:username" , isLoggedIn, showOneUserByUsername )
router.delete('/delete/:id', isLoggedIn, isAdmin, deleteUser);
router.put("/update/:id" , isLoggedIn, isAdmin, updateUser);
router.put("/updatebyusername/:username" ,isLoggedIn , updateUserByUsername);
router.put("/blockuser/:id" ,isLoggedIn, isAdmin, BlockUser);
router.put("/deblockuser/:id" ,isLoggedIn, isAdmin, deblockUser);

router.get('/admin', isAdmin, function(req, res, next) {
    res.status(200).json({"statusCode" : 200 ,"status" : "works"});
});

router.post('/upload', upload.single('avatar'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        res.send({ success: false });
    } else {
        console.log(req.body);
        console.log(req.file);
        res.send({ success: true })
    }
});

router.get('/photo/:username', (req, res) => {
    var username = req.params.username;
    User.findOne({ 'username': username }, (err, result) => {
        if (err) return console.log(err)
        res.contentType('image/jpeg');
        res.send(result.img.data)
    })
})


router.post('/updateOneProfile', upload.single('avatar'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    ob = req.body;

    var finalImg = {
        contentType: req.file.mimetype,
        image: Buffer.from(encode_image, 'base64'),
        data: fs.readFileSync(path.join('./uploads/' + req.file.filename))
    };
    updateProfile(req.body.username, ob, finalImg);

})
router.get('/photo/:username', (req, res) => {
    var username = req.params.username;
    User.findOne({ 'username': username }, (err, result) => {
        if (err) return console.log(err)
        res.contentType('image/jpeg');
        res.send(result.image.buffer)
    })
})



router.get('/auth/google',
    passport.authenticate('google', { scope: ["profile", 'email'] }));

router.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        req.session.save();

        // res.status(200).json({"statusCode" : 200 ,"user" : req.user});
        const token = jwt.sign(
            { username: req.user._doc.username, email: req.user._doc.email, role: req.user._doc.role },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );


        res.redirect(url.format({
            pathname:"http://localhost:4200/login",
            query: {'token': token},
        }))
});

router.get('/auth/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        const token = jwt.sign(
            { username: req.user._doc.username, email: req.user._doc.email, role: req.user._doc.role },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        res.redirect(url.format({
            pathname:"http://localhost:4200/login",
            query: {'token': token},
        }))
    });

router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        const token = jwt.sign(
            { username: req.user._doc.username, email: req.user._doc.email, role: req.user._doc.role },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        res.redirect(url.format({
            pathname:"http://localhost:4200/login",
            query: {'token': token},
        }))
    });


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({"statusCode" : 200 ,"status" : "logged out"});
    });
})

router.post("/register", function(req, res) {
    User.register({ username: req.body.username, email: req.body.email, role: ROLES.User }, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                const token = jwt.sign(
                    { username: user.username, email: user.email, role: user.role },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                res.status(200).json(token);
                // res.redirect("/secrets")
            });
        }
    });
});


router.post("/login",isNotBlocked, function(req, res) {

    const user = new User({
        username: (req.body.username),
        password: (req.body.password),
    })

    req.login(user, function(err) {
        if (err) {
            console.log(err);
            res.sendStatus(401);
        } else {
            passport.authenticate("local")(req, res, function() {
                const token = jwt.sign(
                    { username: user.username, email: user.email, role: user.role },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                res.status(200).json(token);
                // res.redirect("/secrets");
            });
        }
    });
});

router.post('/loginjwt', function(req, res, next){
    if (req.body.token) {
        token = req.body.token
        var decodedClaims = jwt.verify(token, process.env.TOKEN_KEY);
        User.findOrCreate({ username: decodedClaims.username })
            .then((user) => {

                if (!user) {
                    res.status(401).json({ success: false, msg: "could not find user" });
                }
                else{

                    res.status(200).json({ token });

                }

            })
            .catch((err) => {
                next(err);
            });

    }
});

router.post('/forgot', async (req, res, next) => {
    const token = (await promisify(crypto.randomBytes)(20)).toString('hex');
    const user = await getUserByEmail(req.body.email);

    if (!user) {
        res.status(400).json("this email does not exist" );
        return
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await updateUserTokens(user.username, user);
    const resetEmail = {
        to: user.email,
        from: 'passwordreset@example.com',
        subject: 'Password Reset',
        text: `
      You are receiving this because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process:
      http://${req.headers.host}/reset/?token=${token}
      If you did not request this, please ignore this email and your password will remain unchanged.
    `,
    };

    await transporter.sendMail(resetEmail);
    res.status(200).json("An e-mail has been sent  with further instructions" );

    // res.json({'token': token});
});

router.post('/reset/:token', async (req, res) => {
    const user = await getUserByResetToken(req.params.token);

    if (!user) {
        res.status(200).json("Password reset token is invalid or has expired" );

    }

    delete user.resetPasswordToken;
    delete user.resetPasswordExpires;

    await deleteResetTokens(user);
    await user.setPassword(req.body.password);
    const updatedUser = await user.save();

    const resetEmail = {
        to: user.email,
        from: 'passwordreset@example.com',
        subject: 'Your password has been changed',
        text: `
      This is a confirmation that the password for your account "${user.email}" has just been changed.
    `,
    };

    await transporter.sendMail(resetEmail);

    res.status(200).json("Success! Your password has been changed" );
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated() || req.session){
        return next();
    }
    res.status(401).json("not logged in");
}

function isAdmin(req,res,next) {
    console.log("req.user")
    console.log(req.user)
    User.findById(req.user.id, function (err, docs) {
        if(docs.role === 'admin'){
            return next();
        }
        res.status(401).json("not authorized");

    });
}

function isNotBlocked(req, res, next) {
    User.findOne({username: req.body.username}, function (err, docs) {
        if (docs){
            if (docs.blocked == false) {
                return next();
            }
        res.status(401).json("blocked");
    }
    else{
            res.status(200).json("username does not exxis");

        }}
    );
}





module.exports = router;
