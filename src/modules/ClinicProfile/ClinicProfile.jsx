import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "./style.css"
import {DeleteClinic, GetClinicInfo} from "../../api/clinicAuth.js";

const ClinicProfile = () => {
    const navigate=useNavigate();

    const [currentClinic, setCurrentClinic] = useState(null)

    const navigateToChangePassword = () => {
        navigate("/clinic-change-password")
    }

    const deleteClinicAccount = () => {
        const clinicId = localStorage.getItem("clinicId")

        DeleteClinic(clinicId)
            .then()
            .catch((err)=>{
                console.log(err);
            })
        localStorage.clear()
        navigate("/not-patient")
    }

    useEffect(()=>{

        const clinicId = localStorage.getItem("clinicId")

        GetClinicInfo(clinicId)
            .then((res)=>{
                console.log(res);
                setCurrentClinic(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Clinic Information</p>
                {currentClinic ?
                    <div className="row info">
                        <div className="col-6 info-text">
                            Id :
                        </div>
                        <div className="col-6">
                            {currentClinic.id}
                        </div>
                        <div className="col-6 info-text">
                            Name :
                        </div>
                        <div className="col-6">
                            {currentClinic.name}
                        </div>
                        <div className="col-6 info-text">
                            Phone Number :
                        </div>
                        <div className="col-6">
                            {currentClinic.phone_number}
                        </div>
                        <div className="col-6 info-text">
                            City :
                        </div>
                        <div className="col-6">
                            {currentClinic.city}
                        </div>
                        <button className="def-btn" onClick={navigateToChangePassword}>Change Password</button>
                        <button className="def-btn" onClick={deleteClinicAccount}>DELETE ACCOUNT</button>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default ClinicProfile;