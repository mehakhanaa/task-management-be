import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import bcrypt from 'bcrypt';

export class AuthController {
  public static async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }

      const token = generateToken({ id: user._id, email: user.email });
      res.status(200).json({ message: 'Sign-In successful', token });
    } catch (error) {
      console.error('Sign-In Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async signUp(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = generateToken({ id: newUser._id, email: newUser.email });
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Sign-Up Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

