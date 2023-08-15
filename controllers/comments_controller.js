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


module.exports.destroy = async function(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.redirect('back'); // Handle the case when the comment is not found
        }
        if (comment.user == req.user.id) {

            await Post.findByIdAndUpdate(comment.post, { $pull: { comments: req.params.id }});

            await Comment.deleteOne({ _id: req.params.id });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
}



