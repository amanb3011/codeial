const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
   try{
   const posts = await Post.find({}).populate('user').populate({
    path: 'comments',
    populate:{
        path: 'user'
    }
   }).exec();
   if(posts)
   {
    const users = await User.find({});
    if(users)
    {
    return res.render('home',{
        title : "Codiel | home",
        posts : posts,
        all_users: users
    });
    }
    }
    }
    catch(err)
    {
        console.log('error');
    }
    }