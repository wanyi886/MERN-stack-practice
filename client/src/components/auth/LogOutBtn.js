import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios"

function LogOutBtn() {

    const { getLoggedIn } = useContext(AuthContext);

    // In react-router-dom v6 useHistory() is replaced by useNavigate().
    const navigate = useNavigate();
    

    async function logout() {
        // TODO: change get route to delete
        await axios.delete("http://10.11.68.19:1075/auth/logout");
        // await axios.delete("http://localhost:1075/auth/logout");
        await getLoggedIn();
        navigate("/")
    }

    return (
        <button onClick={logout}>Log out</button>
    )
}

export default LogOutBtn;