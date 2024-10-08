import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthContext from "./context/AuthContext";
import Products from "./components/products/Products";
import ProductEditForm from "./components/products/ProductEditForm";

function Router() {
    const { loggedIn } = useContext(AuthContext)

    return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            {/* <Route path="/" element={<Home />}/> */}
            {
                loggedIn === false && (
                    <>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/login" element={<Login />}/>
                    </>
                )
            }
            {
                loggedIn === true && (
                    <>
                        <Route path="/product" element={<Products />}/>
                        <Route path="/product/edit/:id" element={<ProductEditForm />}/>
                    </>
                )
            }
            
        </Routes>
    </BrowserRouter>

    )
}

export default Router;