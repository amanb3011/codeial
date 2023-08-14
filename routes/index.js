const express = require('express')

const router = express.Router();
const homeController = require('../controllers/home_controllers');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));// kiya to hai require noob
router.use('/comments',require('./comments'));


//for any further routes , acess from here
// router.use('/routeName',require('./routerfile));

module.exports = router;