const Post = require('../models/post')

module.exports.create = async function(req, res) {
    try {
        const created = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (created) {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({ message: 'Error creating post' });
    }
};
