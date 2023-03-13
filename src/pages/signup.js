import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { BASE_API_URL } from "../utils/api";

import logoutGuard from "../utils/logoutguard";

export default function Signup() {
    useEffect(logoutGuard(useNavigate()), []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleOnEmailFieldChange = (e) => {
        setEmail(e);
    }

    const handleOnPasswordFieldChange = (e) => {
        setPassword(e);
    }

    const handleSignup = async () => {
        const res = await fetch(`${BASE_API_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });

        if (res.status === 501) {
            window.alert('Internal Server Error. Please try again!');
        } else if (res.status === 201) {
            console.log('user created successfully');
            navigate('/login');
        } else {
            window.alert("An error occured, check console");
            console.error(res.error);
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 text-center">
                        <p className="fs-3 fw-bold">Signup</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <form>
                            <label for="emailField" className="form-label">Email</label>
                            <input type="text" className="form-control" onChange={(e) => handleOnEmailFieldChange(e.target.value)} />
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(e) => handleOnPasswordFieldChange(e.target.value)} />
                            <button className="my-3 btn btn-primary" onClick={() => handleSignup()}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}