/**
 * @action Authorization route
 * @details : User can perfom the following actions
 *    - Register
 *    - Login
 *    - logout
 *    - UpdateAccount
 *    -getAccount
 *    forgotPassword,
 *    resetPassword,
 *    updateDetails,
 *    updatePassword
 *    
 * 
 *    //Bring in Auth Middleware to protect access to routes
 * 
 * 
 */
const router = require('express').Router();
// const userCtrl = require('../controllers/userController');
const {register, login, logout, getUserAccount, updateAccount, getUserId } = require('../controllers/authController');

//Serve views for these user pages
// router.get('/register', userCtrl.register)
// router.get('/login', userCtrl.login)
// router.get('/update', userCtrl.update)

//router.param('id', userCtrl.getUserId)
// router.get('/:id', userCtrl.update);
// router.post('/update/:id', userCtrl.update);
// router.delete('/delete/:id', userCtrl.delete)

router.post('/register', register); //returns token
router.post('/login', login); 

router.get('/logout', logout);
router.get('/account/:id', getUserAccount)

router.put('/update/:id', updateAccount)

router.param('id', getUserId)


module.exports = router;