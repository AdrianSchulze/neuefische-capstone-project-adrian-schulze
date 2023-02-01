import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Logout from "./components/Logout";
import Auth from "./components/Auth";
import HomePage from "./pages/HomePage";
import React from "react";
import NotFound from "./pages/NotFound";
import ChannelTables from "./components/ChannelTables";
import Box from "@mui/material/Box";

export default function Root() {

    return (
        <>
        <Box sx={{display: 'flex'}}>
            <Routes>
                <Route path={"*"} element={<NotFound/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
                <Route path={"/logout"} element={<Logout/>}/>
                <Route path={"/"} element={
                    <Auth>
                        <HomePage/>
                    </Auth>
                }/>
                <Route path={"/channel/:id"} element={<ChannelTables/>}/>
            </Routes>
        </Box>
        </>
    );
}