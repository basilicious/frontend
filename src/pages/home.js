import { useEffect, useState } from "react";
import Header from "../components/header";
import { BASE_API_URL } from "../utils/api";
import loginGuard from "../utils/loginguard";
import { useNavigate } from "react-router-dom";

export default function Home() {
    useEffect(loginGuard(useNavigate()), []);
    
    const [prompt, setPrompt] = useState('');
    const [isProcessing, setProcessing] = useState(false);
    const [result, setResult] = useState('');

    const handleOnPromptFieldChange = (e) => {
        setPrompt(e);
    }

    const handlePromptSubmit = async (e) => {
        setProcessing(true);

        const res = await fetch(`${BASE_API_URL}/api/generate`, {
            method: 'POST',
            body: JSON.stringify({ prompt: prompt })
        });

        if (res.status === 200) {
            const data = await res.json();
            setResult(data.payload);
        } else {
            window.alert("An error occured!");
            console.error(await res.json());
        }

        setProcessing(false);
    }


    const handleReset = () => {
        setPrompt('');
        setResult('');
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5 text-center">
                        <p className="fw-bold fs-3">Generate Text</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <label for="promptField" className="form-label">Prompt</label>
                        <input type="text" className="form-control" onChange={(e) => handleOnPromptFieldChange(e.target.value)} />

                        <div className="row justify-content-around">
                            <div className="col">
                                <button className="my-3 btn btn-primary" onClick={(e) => handlePromptSubmit(e)}>Submit</button>
                            </div>
                            <div className="col text-end">
                                <button className="my-3 btn btn-secondary" onClick={(e) => handleReset(e)}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    {isProcessing ?
                        <div className="spinner-border text-primary">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div className="col-5">
                            <div className="border rounded-1 bg-black">
                                <p className="text-white p-3">

                                    {result === '' ? 'Ask me anything!' : result}
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}