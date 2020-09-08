const {createPost, getPosts, getPostById, deletePost} = require('../services/postServices');
const CustomError = require('../utils/customError');

class postCtrl {

   /**
    * @desc: Creates a Single Post
    * @method & @route  POST: /api/v1/posts/create
    * @access: Private
    *
   */
   async createPost (req, res){
      const data = await createPost(req.user._id, req.body);
      res.status(201).json(data);
   }

   /**
    * @desc: Get all posts
    * @method & @route  GET: /api/v1/posts/
    * @access: Public
    *
   */
   async getPosts(req, res, next){
      const data = await getPosts();
      res.status(200).json({success: true, count: data.length, data:data});
   }

   /**
    * @desc: Returns post if valid id is passed to param
    *        Post is attached to request body of the middleware
    * @method & @route  null
    * @access: null
    *
   */
   async postByID(req, res, next, id){
      const postExist = await getPostById(id);
      req.profile = postExist;
      next();
   }

   /**
    * @desc: Gets a single post
    * @method & @route  GET: /api/v1/posts/:id
    * @access: Public
    *
   */
   //get single post
   getPost(req, res){
      res.status(200).json(req.profile);  
   }

   /**
    * @desc: Updates a Single Post
    * @method & @route  PUT: /api/v1/posts/:id
    * @access: Private
    *
   */
   updatePost(req, res){
      // unnecessary for now
   }


    /**
    * @desc: Delete a Single Post
    * @method & @route  PUT: /api/v1/posts/:id
    * @access: Private
    *
   */
   async deletePost(req, res){
      let {id} = req.profile;
      let data = await deletePost(id);
      res.status(200).json({success: true, data: data});
   }
}

module.exports = new postCtrl();