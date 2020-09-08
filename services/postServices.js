const Post = require('../model/post.model');
const CustomError = require('../utils/customError');
const {getUserById} = require('./authServices');
const User = require('../model/user.model');

//create a new post in the DB
exports.createPost = async (user, data) => {
   console.log(data);
   //checks if author has an exisiting post to prevent duplicate
   const isPost = await Post.findOne({title: data.title}); //verify this implementation works
   console.log(`:::> isPost ${isPost}  && ${user._id}`)

   if((isPost && isPost.author === user._id)) throw new CustomError('Duplicate post', 400);

   let post = new Post(data);
   //assign authenticated user_id to author field in post
   post.author = user._id;
   await post.save();

   //update Author's account with post created
   // const userUpdate = User.findByIdAndUpdate(post.author, post._id, {new: true, runValidators: true});
   const userUpdate = await getUserById(post.author)
   userUpdate.posts.push(post._id)

   return {
      p_id: post._id,
      title: post.title,
      desc: post.description,
      author: post.author
   };
}

//returns all the posts in the DB
exports.getPosts = async() => {
   let posts = await Post.find({}).sort({'_id': -1}).populate({path:'author', select: 'username picture'});

   if(!posts) throw new CustomError(`Cannot get posts`, 400)
   return posts;
}

//locates post by param search
exports.getPostById = async(id) => {

   let post = await Post.findById({_id:id});
   
   if(!post) throw new CustomError(`Post id is incorrect`, 400);
   if(post === null) throw new CustomError(`Post with the id doesn't exist`, 401);

   return post;
}

//update post
exports.updatePost = async(data) => {
// functionality not needed yet
}

//delete post
exports.deletePost = async(id) => {

   let post = await Post.deleteOne({_id:id});
   if(!post) throw new CustomError('Error occured', 401)
   return { title: post.title}
}