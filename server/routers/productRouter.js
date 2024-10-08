const router = require("express").Router();
const Product = require("../models/productModel");
const auth = require("../middleware/auth")


router.post("/", auth, async(req, res) => {
    
    try {
        
        const { name, price, color } = req.body;


        const newProduct = new Product({
            name,
            stock: [{ price, color }]
        })

        const savedProduct = await newProduct.save();

        res.json(savedProduct)
        
    } catch(err) {
        console.error(err);
        res.status(500).send()
    }
});

router.get("/", auth, async(reg, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    }catch(err) {
        console.error(err);
        res.status(500).send()
    }
})

// Add a patch route
router.patch("/:id", auth, async(req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, color } = req.body;

        const fileter = { _id: productId };
        
        const update = { name, 
            stock: [{ price, color }] 
        };

        // source: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        const updatedProduct = await Product.findOneAndUpdate(fileter, update, {
            new: true
        });

        res.json(updatedProduct)
       

    } catch(err) {
        console.error(err);
        res.status(500).send()
    }
})


module.exports = router