import React, { useEffect } from "react";
import ProductEditForm from "./ProductEditForm";
import { useState } from "react";

function ProductList({ products, getProducts }) {

    const [ showEditForm, setShowEditForm ] = useState(false);

    const handleClick = (e) => {
        setShowEditForm(true);
        
        console.log(e.target.id)
    }

    // useEffect(() => {
    //     getProducts()
    // }, [])


    function renderProducts() {
        return products.map( (product, i) => {
            return (
                <div key={i}>
                    
                    <li >{product.name}</li>
                    <li>Price: {product.stock[0].price}</li>
                    <li>Color: {product.stock[0].color}</li>
                    <button id={product._id} onClick={handleClick} >Edit</button>
                    {showEditForm && (
                        <ProductEditForm id={product._id} products={products} setShowEditForm={setShowEditForm} getProducts={getProducts}/>
                    )}
                </div>
            )
        })
    }

    return (
        <div>
            <ul>
                {renderProducts()}
            </ul>
        </div>
    )
}

export default ProductList;