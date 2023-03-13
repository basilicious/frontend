import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import loginGuard from "../utils/loginguard";

export default function ManageKeys() {
    useEffect(loginGuard(useNavigate()), []);
    
    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5 text-center">
                        <p className="fw-bold fs-3">Manage Keys</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-5">
                        
                    </div>
                </div>
            </div>
        </>
    )
}