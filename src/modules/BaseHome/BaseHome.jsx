import {useNavigate} from "react-router-dom";

import "./style.css"
import PredictionForm from "../../components/blood_prediction/blood_prediction.jsx";


const BaseHome = () => {
    const navigate = useNavigate();

    const patient = () => {
        navigate("/home")
    }

    const clinic = () => {
        navigate("/not-patient")
    }

    const donor = () => {
        navigate("/donor-home")
    }

    return (
        <div className="container-fluid home-root">
            <div className="container">
                <p className="company-name text-center">Blood Aid</p>
                <p className="promo-text text-center">Choose your role :</p>
                <div>
                    <button onClick={patient} className="def-btn">I am patient</button>
                    <button onClick={clinic} className="def-btn">I am clinic</button>
                    <button onClick={donor} className="def-btn">I am donor</button>
                </div>
                <div className="container">
                    <PredictionForm />
                </div>
            </div>
        </div>
    )
}

export default BaseHome;