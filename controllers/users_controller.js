const User = require('../models/user');


module.exports.profile = async function(req, res){
    try{
    const  user_p = await User.findById(req.params.id);
    if(user_p)
    {
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user_p
    });
}
    }
    catch(err){
console.log('error');
    }
}

module.exports.update = async function(req, res){
    try{
    if(req.user.id == req.params.id)
    {
        const u = await User.findByIdAndUpdate(req.params.id, req.body)
        if(u)
        {
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}
catch(err)
{
    console.log('error');
}
}
// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            console.log('User already exists');
            return res.redirect('back');
        }

        const newUser = await User.create(req.body);

        console.log('User created:', newUser);
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ message: 'Server Error' });
        }
        return res.redirect('/');
    });
}