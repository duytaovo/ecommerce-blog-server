import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
} from '../../controllers/comments-blog.controller.js';
import { Router } from 'express';
import { isAuthorized } from '../../middlewares/jwt-auth.js';

const router = Router();

router.post('/add', isAuthorized, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', isAuthorized, likeComment);
router.put('/editComment/:commentId', isAuthorized, editComment);
router.delete('/deleteComment/:commentId', isAuthorized, deleteComment);
router.get('/', isAuthorized, getcomments);

export default router;
