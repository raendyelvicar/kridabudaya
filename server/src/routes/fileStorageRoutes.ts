import { Router } from 'express';
import multer from 'multer';
import {
  create,
  deleteData,
  getAll,
  getById,
  update,
} from '../controllers/fileStorageController';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteData);

export default router;
