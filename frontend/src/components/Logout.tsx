import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import axios from "axios";

export default function Logout () {
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        await axios.get("/api/users/logout");
        navigate("/logout");
        window.document.cookie = "";
    }, [navigate]);

    return (
        <button onClick={logout} className={"unset-links"}>Logout</button>
    )
}