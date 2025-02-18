import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/produtRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

connectDB();

const allowedOrigins =
    process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL_PROD]
        : [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'];

console.log("FRONTEND_URL: ", process.env.FRONTEND_URL);
console.log("FRONTEND_URL_PROD: ", process.env.FRONTEND_URL_PROD);

app.use(
    cors({
        origin: (origin, callback) => {
            // Permite requisições sem origem (ex: mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
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
