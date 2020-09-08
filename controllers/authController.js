/**
 * @action Authorization Controller
 * @details : User can perfom the following actions
 *    - Register
 *    - Login
 *    - logout
 *    - getAccount
 *    - UpdateAccount
 *    -//- upload image to account
 *    forgotPassword,
 *    resetPassword,
 *    updateDetails,
 *    updatePassword
 * 
 * 
 */

const {registerUser, loginUser, getUserById, getAccount, updateAccount} = require('../services/authServices');

// const exp = process.env.JWT_MaxAge;

 class authController {

    /**
    * @desc: Creates a new User
    * @method & @route  POST: /api/vi/users/register
    * @access: Public
    *
   */
   async register(req, res){
      const data = await registerUser(req.body);
      //options: no tampering with cookies on frontend and expiry in milliseconds
      //Also returning cookies to access protected routes
      res.cookie('auth', data.token, {httpOnly: true, expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE + 24 * 60 * 60 * 1000 )})
      res.status(201).json({success:true, data});
   }

   /**
    * @desc: Logs In a User
    * @method & @route  POST: /api/vi/users/login
    * @access: Public
    *
   */
   async login(req, res){
      const data = await loginUser(req.body);
      //options: no tampering with cookies on frontend and expiry in milliseconds
      res.cookie('auth', data.token, {httpOnly: true, expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE + 24 * 60 * 60 * 1000)}) 
      res.status(200).json({success:true, data});
      // next();
   }

   /**
    * @desc: Logsout a User (Destroys cookies saved in browser)
    * @method & @route  GET: /api/vi/users/logout
    * @access: Private
    *
   */
   logout(req, res){
      res.clearCookie('auth');
      res.status(200).json({success:true, data:{}});
      // res.redirect() - redirect to home page
   }

   /**
    * @desc: Param Search to get a User by ID search
    * @method & @route  null
    * @access: null
    *
   */
   //finds user by ID
   async getUserId(req, res, next, id){
      const data = await getUserById(id);
      req.profile = data;
      next();
   }

   /**
    * @desc:Gets a User account details and post history
    * @method & @route  GET: /api/vi/users/account/:id
    * @access: Private
    *
   */
   async getUserAccount(req, res){
      const data = await getAccount(req.profile);
      res.status(200).json({success:true, data})
   }


   /**
    * @desc:Update a User account
    * @method & @route  PUT: /api/vi/users/account/:id
    * @access: Private
    *
   */
   async updateAccount(req, res){
      const data = await updateAccount(req.profile, req.body);
      res.status(200).json({success:true, data})
   }
 }

 module.exports = new authController();