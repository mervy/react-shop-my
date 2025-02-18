import Product from '../models/ProductModel.js';

const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 8;
        const total = await Product.countDocuments({ active: true });

        const products = await Product.find({ active: true })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort('-createdAt');

        res.json({
            products,
            total,
            perPage,
            currentPage: page,
            totalPages: Math.ceil(total / perPage),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar produtos', error });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found by id' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error get product by id', error });
    }
}

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Server Error create product', error });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true            
    });

        if (!product) {
            return res.status(404).json({ message: 'Product not found for upadte' });
        }

        product.set(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Server Error in update product', error });
    }
}

const deleteProduct = async (req, res) => { 
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found for delete' });
        }
       
        res.json({ message: 'Product removed sucessfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error in delete product', error });
    }
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
