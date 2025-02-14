import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/produtRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

connectDB();

const cors = require('cors');
app.use(cors({ origin: 'https://my-shops-with-react.onrender.com' }));

app.use(express.json());

//Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
