import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const protectMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token found');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = await User.findOne({ _id: decoded.id, active: true });

        if (!userFound) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

        req.token = token;
        req.user = userFound;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, sign-in please' });
    }
};

const adminAuth = async (req, res, next) => {
    await protectMiddleware(req, res, () => {
        if (req.user.role !== 'admin' && req.user.status !== 'active') {
            return res.status(403).json({ message: 'Not authorized as an admin ou not active user' });
        }
        next();
    });
};

export { protectMiddleware, adminAuth };
