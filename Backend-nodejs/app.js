var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var {Strategy: GitHubStrategy} = require('passport-github2');
const session = require('express-session');
const env = require("dotenv").config();
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/event.route');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');
var usersRouter = require('./routes/user.route');


const mongoose = require("mongoose");
const {User} = require("./models/user.model");

mongoose.connect('mongodb://127.0.0.1/Back')
    .then(()=> console.log('db connected'))
    .catch((ex)=> console.log(ex));

var app = express();

app.get('/getData', (req,res)=>{
res.json({"statusCode":200})
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// ------ Configure swagger docs ------
var options = {
  swaggerDefinition: {
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API for Events!",
    },
  },
  apis: [path.join(__dirname, "/routes/*.js")],
};
var swaggerSpecs = swaggerJsdoc(options);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


var  Po = require("./controllers/postController");
var  Comm= require ("./controllers/commentController");

app.get("/posts/:id",Po.getAllComments );
app.post("/posts/create", Po.create);
app.get("/posts/like/:id", Po.Like);
app.get("/posts/dislike/:id", Po.Dislike);
app.post("/posts/rate/:id", Po.Rate);
app.get("/posts/search/:key", Po.Search);
app.get("/comments/search/:key",Comm.Search);
app.get("/comments/sarticle/:id",Comm.findCommentsbyarticle);
app.get("/comments/like/:id",Comm.Like);
app.get("/comments/dislike/:id",Comm.Dislike);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Allowing X-domain request
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);

passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/users/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);

      User.findOrCreate({ googleId: profile.id, email: profile.emails[0].value, username: profile.displayName}, function(err, user) {
        return cb(err, user);
      });
    }
));

passport.use(User.createStrategy());

passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://127.0.0.1:3000/users/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id, email: profile.emails[0].value, username: profile.displayName }, function (err, user) {
        return cb(err, user);
      });
    }
));

passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_APP_ID,
      clientSecret: process.env.GITHUB_APP_SECRET,
      callbackURL: "http://127.0.0.1:3000/users/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
