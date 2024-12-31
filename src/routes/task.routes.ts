import { Router } from 'express';
import { TaskController } from '../controllers/task.controller'; 
import { authMiddleware } from '../middlewares/auth.middleware'; 

const router = Router();

router.get('/', authMiddleware, TaskController.getAllTasks);
router.get('/:taskId', authMiddleware, TaskController.getTaskById);
router.post('/', authMiddleware, TaskController.createTask);
router.put('/:taskId', authMiddleware, TaskController.updateTask);
router.delete('/:taskId', authMiddleware, TaskController.deleteTask);

export default router;
