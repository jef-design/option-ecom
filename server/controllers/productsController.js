const Products = require("../models/productsModel");
const Carts = require("../models/cartsModel");
const cloudinary = require("../utils/cloudinary");

const getAllProducts = async (req, res) => {
    const category = req.query;
    try {
        if (category.category === "All") {
            const products = await Products.find({}).sort({createdAt: -1});
            res.status(200).json({message: "get all products", products});
        } else {
            const products = await Products.find(category);
            res.status(200).json({message: "get filtered products", products});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const getProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Products.findOne({_id: id}).populate({
            path: "review.userId",
            select: "name"
        })
        res.status(200).json({message: "get product detail", product});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const addProduct = async (req, res) => {
    const {name, detail, price, stock, category, size} = req.body;
    const files = req.files;

    try {
        const imageUrls = [];

        for (const file of files) {
            const imageBase64 = file.buffer.toString("base64");

            const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, {
                folder: "product-images",
                resource_type: "auto",
            });

            imageUrls.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        const products = await Products.create({
            product_name: name,
            description: detail,
            price: price,
            stock: stock,
            category: category,
            size: size,
            images: imageUrls, // Assuming you have a field named 'images' to store the image data
        });

        res.status(200).json({message: "Product added successfully", products});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const addToCart = async (req, res) => {

    const { product_id, customer_id, quantity } = req.body;
    try {
        let cart = await Carts.findOne({ customer_id });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = await Carts.create({
                customer_id,
                items: [{ product_id, quantity }]
            });
        } else {
            // Update the existing cart
            cart = await Carts.findOneAndUpdate(
                { customer_id },
                {
                    $push: { items: { product_id, quantity } }
                },
                { new: true }
            );
        }

        res.status(200).json({ message: "added to cart", cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// const addToCart = async(req, res) => {
//   console.log(req.body)
//   const {product_id,customer_id, quantity} = req.body
//   try {
//       const product = await Carts.create({product_id,customer_id, quantity})
//       res.status(200).json({message: 'added to cart', product})

//   } catch (error) {
//       res.status(400).json({message: error.message})
//   }
// }
const getCart = async (req, res) => {
    const userID = req.user._id

    try {
        const products = await Carts.findOne({customer_id: userID}).sort({createdAt: -1}).populate({
            path: "items.product_id",
            select: "product_name price images",
        });

        res.status(200).json({message: "get all cart", products});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const deleteCart = async (req, res) => {

    const {customer_id, _id} = req.body
    const {id} = req.params;

    try {
        const result = await Carts.findByIdAndUpdate(
            id || customer_id,
            {
                $pull: { items: { product_id: _id} }
            },
            { new: true }
        );
    
        if (!result) {
            return res.status(404).json({ message: "Cart not found" });
        }
    
        res.status(200).json({ message: "Item deleted from cart", cart: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

const addPoductReview = async (req, res) => {

    const {userId, star, comment, product_id} = req.body
    console.log(req.body)
    try {
        const review = await Products.findByIdAndUpdate(
            {_id: product_id},
            {
                $push: { review: {userId: userId, star: star, comment: comment} }
            },
            { new: true }
        )
            console.log('message', review)
        res.status(200).json({message: 'review added', review})
    } catch (error) {
        
    }
}
module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    addToCart,
    getCart,
    deleteCart,
    addPoductReview
};
