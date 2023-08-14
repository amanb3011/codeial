const express = require('express')

const router = express.Router();
const homeController = require('../controllers/home_controllers');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));



//for any further routes , acess from here
// router.use('/routeName',require('./routerfile));

module.exports = router;