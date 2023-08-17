const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await Comment.findById(comment._id).populate('user', 'name').exec();

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }
     catch (err) {
        console.log('Error creating comment:', err);
        return res.status(500).json({ message: 'Error creating comment' });
    }
};


module.exports.destroy = async function(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.redirect('back'); // Handle the case when the comment is not found
        }
        if (comment.user == req.user.id) {

            await Post.findByIdAndUpdate(comment.post, { $pull: { comments: req.params.id }});

            await Comment.deleteOne({ _id: req.params.id });

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
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



