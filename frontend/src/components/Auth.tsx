import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Auth (
    {
        children,
    } : {
        children: React.ReactNode,
    }
) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        (async () => {
            try {
                await axios.get("/api/users/me");
                setIsAuthenticated(true);
            } catch (e) {
                setIsAuthenticated(false);
                navigate("/login");
            }
        })();
    }, [location.pathname, navigate]);

    return (
        <>
            {isAuthenticated && children}
        </>
    );
}