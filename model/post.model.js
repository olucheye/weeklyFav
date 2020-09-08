const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const postsSchema = new Schema({
   title: {
      type: String,
      required: [true, 'Please provide title'],
      minlength: 10,
      maxlength: 50,
   },
   section: String,
   description: {
      type: String,
      maxlength: 255,
      required: [true, 'Plese provide description']
   },
   link: {
      type: String,
      required:[true, 'Link to post is empty']
   },
   shareCount: Number,
   createdAt: {
      type: Date,
      default: Date.now
   },
   author: { //refrencing user that created the post
      type:  Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
},
{timestamps: true});

module.exports = mongoose.model('Post', postsSchema);