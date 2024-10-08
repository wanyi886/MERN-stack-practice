import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import axios from "axios";

function Products() {

    const [ products, setProducts ] = useState([]);

    async function getProducts() {
        const productRes = await axios.get("http://10.11.68.19:1075/product");
        // const productRes = await axios.get("http://localhost:1075/product");
        setProducts(productRes.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <ProductForm getProducts={getProducts}/>
            <ProductList products={products} getProducts={getProducts} />
        </>
    )
}

export default Products