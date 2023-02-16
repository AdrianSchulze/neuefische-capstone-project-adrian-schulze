import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Auth from "./components/Auth";
import HomePage from "./pages/HomePage";
import React from "react";
import NotFound from "./pages/NotFound";
import MainArea from "./components/MainArea";
import Box from "@mui/material/Box";
import LogoutPage from "./pages/LogoutPage";

export default function Root() {

    return (
        <>
        <Box sx={{display: 'flex'}}>
            <Routes>
                <Route path={"*"} element={<NotFound/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
                <Route path={"/logout"} element={<LogoutPage/>}/>
                <Route path={"/"} element={
                    <Auth>
                        <HomePage/>
                    </Auth>
                }/>
                <Route path={"/channel/:id"} element={
                    <Auth>
                        <MainArea/>
                    </Auth>
                }/>
            </Routes>
        </Box>
        </>
    );
}