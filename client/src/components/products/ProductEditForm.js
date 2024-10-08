import React from "react";
import { useState } from "react";
import axios from "axios"

function ProductEditForm({ getProducts, id, products, setShowEditForm }) {

    // Need to get the original value
    const print = () => {
        console.log("hey")
        // const products = get;
        console.log("id", id);
        console.log(products)
    }
     
    const product = products.find( product => product._id === id)

    const [ productName, setProductName ] = useState(product.name);
    const [ productPrice, setProductPrice ] = useState(product.stock[0].price);
    const [ productColor, setProductColor ] = useState(product.stock[0].color)

    async function saveProduct(e) {
        e.preventDefault();

        try {
            const productData = {
                name: productName,
                price: productPrice,
                color: productColor
            }
            await axios.patch(`http://10.11.68.19:1075/product/${id}`, productData);
            // await axios.patch(`http://localhost:1075/product/${id}`, productData);
            getProducts(); 
            // we need this because the data wouldn't get updated dynamicly
            setShowEditForm(false);

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <>
            <form onSubmit={saveProduct}>
                <input 
                    type="text"
                    placeholder="Product name"
                    onChange={(e) => {
                        setProductName(e.target.value)
                    }}
                    value={productName}
                />

                <input 
                    type="text"
                    placeholder="Color"
                    onChange={(e) => {
                        setProductColor(e.target.value)
                    }}
                    value={productColor}
                />

                <input 
                    type="number"
                    placeholder="Price"
                    onChange={(e) => {
                        setProductPrice(e.target.value)
                    }}
                    value={productPrice}
                />
                <button type="submit">Submit Changes</button>

            </form>
                {/* <button onClick={print}>Print products</button> */}
        </>
    )
}

export default ProductEditForm;