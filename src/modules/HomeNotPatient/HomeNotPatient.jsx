import {useNavigate} from "react-router-dom";

import "./style.css"
import {useEffect, useState} from "react";


const HomeNotPatient = () => {
    const navigate = useNavigate();

    const [clinicId, setClinicId] = useState(null)
    const [clinicPhoneNumber, setClinicPhoneNumber] = useState(null)
    const [clinicName, setClinicName] = useState(null)

    const login = () => {
        navigate("/clinic-login")
    }

    const clinicProfile = () => {
        navigate("/clinic-profile")
    }

    const signup = () => {
        navigate("/clinic-signup")
    }

    const back = () => {
        navigate("/")
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload();
    }

    useEffect(() => {
        const currentClinicId = localStorage.getItem("clinicId")
        const currentClinicPhoneNumber = localStorage.getItem("clinicPhoneNumber")
        const currentClinicName = localStorage.getItem("clinicName")

        setClinicId(currentClinicId)
        setClinicPhoneNumber(currentClinicPhoneNumber)
        setClinicName(currentClinicName)
    }, [clinicId, clinicPhoneNumber, clinicName])

    return (
        <div className="container-fluid home-root">
            {clinicId ?
                <div className="container">
                    <p className="company-name text-center">Blood Aid</p>
                    <p className="promo-text text-center">Greetings, {clinicName.replaceAll('"', '')}!</p>
                    <div>
                        <button onClick={clinicProfile} className="def-btn">Clinic Profile</button>
                        <button onClick={logout} className="def-btn">LOG OUT</button>
                    </div>
                </div>
                :
                <div className="container">
                    <p className="company-name text-center">Blood Aid</p>
                    <p className="promo-text text-center">If you are not patient :</p>
                    <div>
                        <button onClick={login} className="def-btn">LOGIN as clinic</button>
                        <button onClick={signup} className="def-btn">SIGN UP as clinic</button>
                    </div>
                    <div>
                        <button onClick={back} className="def-btn">Back</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default HomeNotPatient;