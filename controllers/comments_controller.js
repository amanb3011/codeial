const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        console.log(req.body.post);
        const post = await Post.findById(req.body.post);

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            if (comment) {
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            }
        }
    } catch (err) {
        console.log('Error creating comment:', err);
        return res.status(500).json({ message: 'Error creating comment' });
    }
};






