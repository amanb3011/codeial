const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    async function(req,email,password,done){
        // find a user and establish identity
        try {
            const user = await User.findOne({ email: email });
        
            if (!user || user.password !== password) {
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
        
            return done(null, user);
        } catch (err) {
            req.flash('error',err);
        }
    }
));

//serializing to keep the user in cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});

//dese
passport.deserializeUser(async function(id,done){
    try {
        const user = await User.findById(id);
        if(user)
        {
            return done(null,user);
        }

    }
    catch(err)
    {
        console.log('Error in finding user -->passport');
        return done(err);
    }
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    else{
    // if the user is not signed in
    return res.redirect('/users/sign-in');
    }
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;