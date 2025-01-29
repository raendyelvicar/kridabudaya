import { Router } from 'express';
import multer from 'multer';
import {
  create,
  deleteData,
  getAll,
  getById,
  update,
} from '../controllers/teamMemberController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', upload.single('file'), create);
router.put('/:id', upload.single('file'), update);
router.delete('/:id', deleteData);

export default router;
