
//Import Authentication middleware to protect routes

const router = require('express').Router();
const {getPosts, createPost, getPost, updatePost, deletePost, postByID} = require('../controllers/postController');
// const userRouter = require('./authRouter');
const {authenticateUser} = require('../middlewares/authMiddleware');

router.get('/', authenticateUser, getPosts);
router.post('/create', authenticateUser, createPost);

router.get('/:id', getPost);
router.put('/:id', authenticateUser, updatePost);
router.delete('/:id', authenticateUser, deletePost);

//returns item if found by ID
router.param('id', postByID);


module.exports = router;