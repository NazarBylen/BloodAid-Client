import { GetPatientInfo, DeletePatient } from "../../api/auth.js"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "./style.css"

const Profile = () => {
    const navigate=useNavigate();

    const [currentPatient, setCurrentPatient] = useState(null)

    const navigateToChangePassword = () => {
        navigate("/change-password")
    }
    const navigateToEditProfile = () => {
        navigate("/edit-profile")
    }

    const deletePatientAccount = () => {
        const userId = localStorage.getItem("userId")

        DeletePatient(userId)
            .then()
            .catch((err)=>{
                console.log(err);
            })
        localStorage.clear()
        navigate("/")
    }

    useEffect(()=>{

        const userId = localStorage.getItem("userId")

        GetPatientInfo(userId)
            .then((res)=>{
                console.log(res);
                setCurrentPatient(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Profile Information</p>
                {currentPatient ?
                    <div className="row info">
                        <div className="col-6 info-text">
                            Id :
                        </div>
                        <div className="col-6">
                            {currentPatient.id}
                        </div>
                        <div className="col-6 info-text">
                            Email :
                        </div>
                        <div className="col-6">
                            {currentPatient.email}
                        </div>
                        <div className="col-6 info-text">
                            Name :
                        </div>
                        <div className="col-6">
                            {currentPatient.fullName}
                        </div>
                        <div className="col-6 info-text">
                            Rh Factor :
                        </div>
                        <div className="col-6">
                            {currentPatient.rh_factor}
                        </div>
                        <div className="col-6 info-text">
                            Blood Type :
                        </div>
                        <div className="col-6">
                            {currentPatient.blood_type}
                        </div>
                        <button className="def-btn" onClick={navigateToChangePassword}>Change Password</button>
                        <button className="def-btn" onClick={navigateToEditProfile}>Edit Profile</button>
                        <button className="def-btn" onClick={deletePatientAccount}>DELETE ACCOUNT</button>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Profile;