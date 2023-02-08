import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Box from "@mui/material/Box";

export default function NotFound() {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login')
        }, 4000)
    }, [navigate]);

        return (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    margin={"auto"}
                >
                    <Box textAlign={"center"}>
                    <h1>Bye bye! See you soon!</h1>
                        <p>You'll be redirect to the login page</p>
                    </Box>
                </Box>
        );
    }