import React, { useContext } from "react";
import axios from 'axios'
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const { getLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate()
    
    
    async function login(e) {
        e.preventDefault();

        try {
            const loginData = {
                email, password
            }
            
            await axios.post("http://10.11.68.19:1075/auth/login", loginData);
            // await axios.post("http://localhost:1075/auth/login", loginData);
            await getLoggedIn(); // this will update the state of loggedin, and make page changes dynamicly
            navigate("/")

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1>Log in to your account</h1>
            <form onSubmit={login}>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;