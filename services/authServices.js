/**
 * @action Authorization Services
 * @details : User can perfom the following actions
 *    - Register
 *    - Login
 *    - logout
 *    - getAccount
 *    - UpdateAccount
 *    forgotPassword,
 *    resetPassword,
 *    updateDetails,
 *    updatePassword
 * 
 * 
 */


const User = require('../model/user.model');
const CustomError = require('../utils/customError');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
// const exp = process.env.JWT_MaxAge;
const exp = "1h";

//helper function to generate token from jwt
const generateToken = (id) => {
   return jwt.sign({id}, secret, {expiresIn: exp})
}


/**
 * @desc: Services start from here
 * @method & @route  POST: /api/vi/users/register
 * @access: Public
 * @param: User data from request body
 *
*/

//creates user account if email doesn't exist in DB
exports.registerUser = async (data) => {

   const user = await User.findOne({email: data.email});

   if(user) {
      //if user exists, it throws the error
      throw new CustomError(`User exists`, 400);
   }

   //else a new user is created
   const newUser = new User(data);
   await newUser.save();
   const token = generateToken(newUser._id)
   //pass in token as cookie as well
   return {
      token,
      uid: newUser._id,
      username: newUser.username
   }

}


//Logs In User
exports.loginUser = async(data) => {
   //selecting password to join auth process as default is false.
   const user = await User.findOne({email: data.email}).select('+password');
   if(!user) throw new CustomError(`Invalid Credentials email`, 401)

   //authenticate user is called on the user data as a Schema method.
   if(!await user.authenticateUser(data.password.trim())){
      throw new CustomError(`Invalid Credentials password`, 401)
   }

   const token = generateToken(user._id);
   return {
      token,
      uid: user._id,
      username: user.username
   }
}

//Gets User by ID and return User object
exports.getUserById = async (id) => {
   const userId = await User.findById({_id:id})
   if(!userId) throw new CustomError(`Invalid User`, 400);
   if(userId === null) throw new CustomError(`Invalid User`, 400);
   return userId;
}

//Finds a user account and populate the posts field with all posts created.
exports.getAccount = async(data) => {
   const account = await User
                           .findById({_id: data.id})
                           .populate('posts');
   if(!account) throw new CustomError(`Can't get user`, 400);
   return account.posts;
}

exports.updateAccount = async(user, data) =>{
   const update = await User.findByIdAndUpdate(user._id, data, {new: true, runValidators: true})
   if(!update) throw new CustomError(`Invalid data`, 401);
   return update;
}