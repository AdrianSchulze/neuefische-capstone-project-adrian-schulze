import {useState} from "react";

export default function SignUpPage() {

    const [name, setName] = useState<String>("");
    const [password, setPassword] = useState<String>("")

    return (
        <div className={'login-container'}>
            <div className={'login'}>
                <div className={'login-form'}>
                    <p>Sign up for our app!</p>
                    <input type={'text'} onChange={(e) => setName(e.target.value)} required/>
                    <input type={'text'} onChange={(e) => setPassword(e.target.value)} required/>
                    <button className={'login-button'}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}