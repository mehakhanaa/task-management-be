import { Request, Response } from 'express';
import { Task } from '../models/task.model';
import { TaskInput, ITask } from '../types/types';

export class TaskController {
  public static async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await Task.find({ userId: req.user._id });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching tasks', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  public static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const task = await Task.findOne({ 
        _id: req.params.taskId, 
        userId: req.user._id 
      });
      
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching task', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  public static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskInput: TaskInput = req.body;
      
      const task = new Task({
        ...taskInput,
        userId: req.user._id,
        status: taskInput.status || 'Pending',
        priority: taskInput.priority || 'Medium'
      });

      const savedTask = await task.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error creating task', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  public static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskInput: TaskInput = req.body;
      const task = await Task.findOneAndUpdate(
        { _id: req.params.taskId, userId: req.user._id },
        { $set: taskInput },
        { new: true }
      );

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error updating task', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  public static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await Task.findOneAndDelete({ 
        _id: req.params.taskId, 
        userId: req.user._id 
      });
      
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting task', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }
}