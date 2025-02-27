import express from 'express';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { adminAuth } from '../middleware/protect.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, active: true });
        if (!user && !(await bycrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Cria um novo usuário
        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/users', adminAuth, async (req, res) => {
    try {
        const newUser = new User(req.body);

        const newUserExists = await User.findOne({ email });
        if (newUserExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        await newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/users', adminAuth, async (req, res) => {
    try {
      const users = await User.find().select('-password'); //Esconde a password
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;
