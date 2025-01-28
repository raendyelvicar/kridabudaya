import express from 'express';
import {
  register,
  login,
  getUser,
  getRefreshToken,
} from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', getRefreshToken);

export default router;
