const Post = require('../models/post');

module.exports.home = async function(req,res){
   try{
   const posts = await Post.find({}).populate('user');
   if(posts)
   {
    return res.render('home',{
        title : "Codiel | home",
        posts : posts
    });
    }
    }
    catch(err)
    {
        console.log('error');
    }
    }