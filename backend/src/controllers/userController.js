// controllers/userController.js
import User from '../models/UserModel.js';

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const total = await User.countDocuments();
        const users = await User.find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort('-createdAt');

        res.json({
            users,
            total,
            perPage,
            currentPage: page,
            totalPages: Math.ceil(total / perPage),
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
};

export { getUsers };