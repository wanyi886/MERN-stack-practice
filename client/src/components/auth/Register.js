import React, { useContext } from "react";
import axios from 'axios'
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

function Register() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordVerify, setPasswordVerify ] = useState("");

    const { getLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate()
    
    async function register(e) {
        e.preventDefault();

        try {
            const registerData = {
                email, password, passwordVerify
            }

            await axios.post("http://10.11.68.19:1075/auth/", registerData);
            // await axios.post("http://localhost:1075/auth/", registerData);
            await getLoggedIn(); // this will update the state of loggedin, and make page changes dynamicly
            navigate("/")

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1>Register a new account</h1>
            <form onSubmit={register}>
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
                <input 
                    type="password" 
                    placeholder="Verify your Password"
                    value={ passwordVerify }
                    onChange={ (e) => setPasswordVerify(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;