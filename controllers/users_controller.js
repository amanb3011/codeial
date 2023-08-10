const User = require('../models/user');


module.exports.profile = async function(req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id).exec();

            if (user) {
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                });
            }

            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
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
module.exports.createSession = async function(req, res){

   try{
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        if(existingUser.password != req.body.password)
        {
            return res.redirect('back');
        }

        res.cookie('user_id' ,existingUser.id)
        return res.redirect('/users/profile');
    }
    else{
        return res.redirect('back');
    }
   }
   catch(err)
   {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Server Error' });
   }
}