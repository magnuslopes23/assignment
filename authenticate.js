const passport = require('passport')

const LocalStratergy = require('passport-local').Strategy;
const JwtStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
var config = require('./config');
const User = require('./models/user');

exports.local = passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {expiresIn: 3600})
}

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtStratergy = passport.use(new JwtStratergy(opts, (jwt_payload, done) =>{
    console.log("jwt payload:", jwt_payload);
    User.findOne({_id:req.jwt_payload._id}, (err,user) =>{
        if(err){
            return done(err, false);
        }
        else if(user){
            return done(null, user);
        }
        else{
            return done(null, false)
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt', {session:false});


exports.verifyAdmin = passport.authenticate('jwt', {session:false}),((user)=>{
    if(req.user.admin){
        next()
    }
    else{
        var err = new Error("not an admin")
        err.status = 403;
        next(err)
    }
})




    
