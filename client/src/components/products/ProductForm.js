import React from "react";
import { useState } from "react";
import axios from "axios"

function ProductForm({ getProducts, showEditForm }) {

    const [ productName, setProductName ] = useState("");
    const [ productPrice, setProductPrice ] = useState(undefined);
    const [ productColor, setProductColor ] = useState("")

    async function saveProduct(e) {
        e.preventDefault();

        try {
            const productData = {
                name: productName,
                price: productPrice,
                color: productColor
            }
            await axios.post("http://10.11.68.19:1075/product", productData);
            // await axios.post("http://localhost:1075/product", productData);

        
            getProducts(); // we need this because the data wouldn't 
            

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
                <button type="submit">Save new product</button>
            </form>
        </>
    )
}

export default ProductForm;