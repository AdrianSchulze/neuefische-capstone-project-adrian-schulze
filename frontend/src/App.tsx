import React from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage";
import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import Root from "./Root";
import Auth from "./components/Auth";
import Logout from "./components/Logout";

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"/signup"} element={<SignUpPage/>}/>
            <Route path={"/logout"} element={<Logout/>}/>
            <Route path={"/profile/:id"} element={
                <Auth>
                    {}
                </Auth>}
            />
            <Route path={"/"} element={
                <Auth>
                    <Root/>
                </Auth>
            }/>
        </Routes>
    );
}

export default App;
