/**
 * @action Authenticate Users to access protected routes
 *         Authorize Users to view restricted routes
 *         Validate user and return user details for frontend consumption
 */

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const CustomError = require('../utils/customError');
const User = require('../model/user.model');



exports.authenticateUser =  async (req, res, next) => {

   const userToken = req.cookies.auth;
   
   if(!userToken) throw new CustomError(`User unauthenticated`, 400);
    //redirect to homepage

   const decoded = await jwt.verify(userToken, secret);
   if(!decoded) throw new CustomError(`Cannot authenticate user`, 400);
   //redirect to home page

   req.user = await User.findById(decoded.id); //assign user to the request body
   next();
}

//check currently logged in user
exports.currentUser = async(req, res, next) => {
   const token = req.cookies.auth;
   console.log(`:::> 1 Gotten User`);

   if(token){
   const decoded = await jwt.verify('token', secret);
   if(!decoded) throw new CustomError();
   console.log(`:::> 2 Gotten User`);
   next();

   let user = await User.findById({_id:decoded._id})
   res.locals.user = user;
   console.log(`:::> 3 Gotten User`);
   next()
   }

   // res.locals.user = null; :- for when I add a frontend
   next();
}

//authorize User to access certain routes
exports.authorizeUser = (...roles) => {
   return (req, res, next) => {
      if(!roles.includes(req.user.role)) throw new CustomError(`Not authorized to view page`, 403);
      next();
   }
}