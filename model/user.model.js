/**
 * @action 
 * 
 * @details : User can 
 *    - define schema
 *    - define methods - encryption and authentication
 *    - define pre('save') hook for password
 *    - Authorization??
 * 
 */

const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
   username: {
      type: String,
      required: [true, 'Username already exists'],
      unique: true,
      minlength:[6, 'Username cannot be less than 6 characters'],
      trim: true,
      lowercase: true
   },
   email: {
      type: String,
      trim: true,
      unique: [true, 'Email already exists'],
      //email validation must match regex else an error would be thrown
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: [true, 'Email is required'],
      lowercase: true
   },
   password: {
      type: String,
      required: "Password is required",
      select: false
   },
   bio: {
      type: String,
      maxlength: 50
   },
   picture: {
      type: String,
      // default: get default image value hosted on cloudinary
   },
   posts:[{
      type: Schema.Types.ObjectId,
      ref: 'Post'
      // unique: true
   }],
   createdAt: {
      type: Date,
      default: Date.now
   },
   updatedAt: {
      type: Date
   }
},
{
   timestamps: true
}
// {
//    toJSON: { virtuals: true },
//    toObject: { virtuals: true }
// }
);




/**
 * @action :Schema pre-hook to hash password before saving it to DB
 */

userSchema.pre('save', async function(next){
   if(!this.isModified('password')){
      next()
   }
   this.password = await this.encryptPassword(this.password.trim());
   next();
})


/**
 * @action :Schema methods to generate salt and password
 */
userSchema.methods = {
   //Encryption method for user password
   encryptPassword: async function(password){
      const salt = await this.makeSalt();
      return hash = await bcrypt.hash(password, salt); 
   },

   //Generates Salt to be used for password encryption
   makeSalt: async function(){
      return salt = await bcrypt.genSaltSync(10);
   },

   authenticateUser: async function(password){
      return await bcrypt.compare(password, this.password)
   }
}


// userSchema.virtual('posts', {
//    ref: 'Post',
//    localField: '_id',
//    foreignField: 'author',
//    justOne: false
// });


module.exports = mongoose.model('User', userSchema);