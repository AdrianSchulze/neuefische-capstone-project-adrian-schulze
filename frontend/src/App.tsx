import React from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage";
import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import Root from "./Root";
import Auth from "./components/Auth";

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"/signup"} element={<SignUpPage/>}/>
            <Route path={"/"} element={
                <Auth>
                    <Root/>
                </Auth>
            }/>
        </Routes>
    );
}

export default App;
