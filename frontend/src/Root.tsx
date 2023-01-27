import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Logout from "./components/Logout";
import Auth from "./components/Auth";
import HomePage from "./pages/HomePage";
import React from "react";

export default function Root() {


    return (
        <Routes>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"/signup"} element={<SignUpPage/>}/>
            <Route path={"/logout"} element={<Logout/>}/>
            <Route path={"/profile/:id"}/>
            <Route path={"/"} element={
                <Auth>
                    <HomePage/>
                </Auth>
            }/>
        </Routes>
    );
}