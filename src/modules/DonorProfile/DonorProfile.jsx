import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "./style.css"
import {DeleteDonor, GetDonorInfo} from "../../api/donors.js";

const DonorProfile = () => {
    const navigate=useNavigate();

    const [currentDonor, setCurrentDonor] = useState(null)

    const navigateToChangePassword = () => {
        navigate("/donor/change-password")
    }
    const navigateToEditProfile = () => {
        navigate("/donor/edit-profile")
    }

    const deleteDonorAccount = () => {
        const donorId = localStorage.getItem("donorId")

        DeleteDonor(donorId)
            .then()
            .catch((err)=>{
                console.log(err);
            })
        localStorage.clear()
        navigate("/")
    }

    useEffect(()=>{

        const donorId = localStorage.getItem("donorId")

        GetDonorInfo(donorId)
            .then((res)=>{
                console.log(res);
                setCurrentDonor(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Donor profile Information</p>
                {currentDonor ?
                    <div className="row info">
                        <div className="col-6 info-text">
                            Id :
                        </div>
                        <div className="col-6">
                            {currentDonor.id}
                        </div>
                        <div className="col-6 info-text">
                            Email :
                        </div>
                        <div className="col-6">
                            {currentDonor.email}
                        </div>
                        <div className="col-6 info-text">
                            Name :
                        </div>
                        <div className="col-6">
                            {currentDonor.fullName}
                        </div>
                        <div className="col-6 info-text">
                            Rh Factor :
                        </div>
                        <div className="col-6">
                            {currentDonor.rh_factor}
                        </div>
                        <div className="col-6 info-text">
                            Blood Type :
                        </div>
                        <div className="col-6">
                            {currentDonor.blood_type}
                        </div>
                        <button className="def-btn" onClick={navigateToChangePassword}>Change Password</button>
                        <button className="def-btn" onClick={navigateToEditProfile}>Edit Profile</button>
                        <button className="def-btn" onClick={deleteDonorAccount}>DELETE ACCOUNT</button>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default DonorProfile;