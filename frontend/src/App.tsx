import React from 'react';
import './App.css';
import LoginPage from "./components/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpPage from "./components/SignUpPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/signup"} element={<SignUpPage/>}/>
                    <Route path={"/"} element={""}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
