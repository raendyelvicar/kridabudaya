import { Router } from 'express';
import multer from 'multer';
import {
  create,
  deleteData,
  getAll,
  getById,
  update,
} from '../controllers/catalogController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', upload.array('files'), create);
router.put('/:id', update);
router.delete('/:id', deleteData);

export default router;
