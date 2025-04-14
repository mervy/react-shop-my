import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/produtRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

connectDB();

const allowedOrigins = [
    process.env.FRONTEND_URL?.replace(/\/$/, '') || '', // Remove trailing slash
    process.env.FRONTEND_URL_PRO?.replace(/\/$/, '') || '', // Also include PRO URL
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173'
].filter(Boolean); // Remove any empty strings

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log('Blocked by CORS:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use(express.json());

//Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
