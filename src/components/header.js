import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkJWT, getUser, logout } from "../utils/api";

export default function Header() {
    const [user, setUser] = useState({ email: '' });

    const navigate = useNavigate();

    // useEffect(async () => {
    //     const data = await getUser();
    //     if (!data.error) {
    //         setUser(data.payload);
    //         return () => {}
    //     } else {
    //         setUser(null);
    //         return () => {}
    //     }
    // }, [user]);

    useEffect(() => {
        getUser().then((data) => {
            setUser(data.payload);
        });
    }, []);
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Genesis.AI</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/keys">API Keys</a>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col">
                        {checkJWT() ?
                            <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
                            :
                            <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}