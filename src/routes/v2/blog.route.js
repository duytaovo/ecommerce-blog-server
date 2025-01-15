import { Router } from 'express';
import { isAdmin, isAdminOrStaff } from '../../middlewares/jwt-auth.js';
import { createPost, deletePost, getPosts, updatePost } from '../../controllers/post.controller.js';

const router = Router();

/**
 * Authorization
 * Get all posts         : any user
 * Create, update, delete: authorized user (via verifyToken)
 */

router.get('/getposts', getPosts);
router.post('/create', isAdminOrStaff, createPost);
router.patch('/updatepost/:postId/:userId', isAdminOrStaff, updatePost);
router.delete('/deletepost/:postId/:userId', isAdmin, deletePost);

export default router;
