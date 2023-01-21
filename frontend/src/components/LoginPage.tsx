import {useState} from "react";

export default function LoginPage() {


    const [nameSignUp, setNameSignUp] = useState<String>("");
    const [passwordSignUp, setPasswordSignUp] = useState<String>("")

    return (
        <div className={'login-container'}>
            <div className={'login'}>
                <div className={'login-form'}>
                    <p>Wähle deinen Usernamen</p>
                    <input type={'text'} onChange={(e) => setNameSignUp(e.target.value)} required/>
                    <input type={'text'} onChange={(e) => setPasswordSignUp(e.target.value)} required/>
                    <button className={'login-button'}>Login</button>
                    <button className={'signup-button'}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}