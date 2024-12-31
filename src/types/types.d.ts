import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
}

export interface TaskInput {
  title: string;
  description: string;
  priority?: 'Low' | 'Medium' | 'High';
  status?: 'Pending' | 'In Progress' | 'Completed';
}

export interface ITask extends Document {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
