const Post = require('../models/post')
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
         let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){ // add hogye hai database me but home screeen pe nhi dikhenge jab tak refresh na karo coz return kargye is function se
           post = await Post.findById(post._id).populate('user','name').exec();
           
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created"
            });
        }
        if (post) {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({ message: 'Error creating post' });
    }
};

module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {

            await Post.deleteOne({ _id: req.params.id });//remove function is depricated

            await Comment.deleteMany({ post: req.params.id });

            
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted"
                });
            }

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
}




