import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {acceptRequest, getDonation} from "../../api/donation.js";

const SingleDonation = () => {
    const navigate=useNavigate();
    const { id } = useParams();

    const [currentDonation, setCurrentDonation] = useState(null)

    const back = () => {
        navigate("/not-patient")
    }

    const acceptRequestFunc = () => {
        document.getElementById("myModal").style.display = "flex";
        const clinicId = localStorage.getItem("clinicId")

        const data = {
            clinic: clinicId,
        }
        acceptRequest(id, data)
    }

    const closeModal = () => {
        document.getElementById("myModal").style.display = "none";
    }

    useEffect(()=>{

        getDonation(id)
            .then((res)=>{
                console.log(res);
                setCurrentDonation(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [id])

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Donation info :</p>
                {currentDonation ?
                    <div className="row info">
                        <div className="col-6 info-text">
                            Id :
                        </div>
                        <div className="col-6">
                            {currentDonation.id}
                        </div>
                        <div className="col-6 info-text">
                            Date requested :
                        </div>
                        <div className="col-6">
                            {currentDonation.dateRequested}
                        </div>
                        <div className="col-6 info-text">
                            Requested by :
                        </div>
                        <div className="col-6">
                            {currentDonation.patient.fullName}
                        </div>
                        <div className="col-6 info-text">
                            Patient blood type :
                        </div>
                        <div className="col-6">
                            {currentDonation.patient.blood_type}
                        </div>
                        <div className="col-6 info-text">
                            Patient rh factor :
                        </div>
                        <div className="col-6">
                            {currentDonation.patient.rh_factor}
                        </div>
                        <div className="col-6 info-text">
                            Patient email :
                        </div>
                        <div className="col-6">
                            {currentDonation.patient.email}
                        </div>
                        <button className="def-btn" onClick={acceptRequestFunc}>Accept Request</button>
                        <button className="def-btn" onClick={back}>back</button>
                    </div>
                    : null
                }
            </div>
            <div id="myModal" className="modal-overlay">
                <div className="modal-content">
                    <h2>Accepted</h2>
                    <p>You accepted this patient`s request to your clinic</p>
                    <button className="close-button" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default SingleDonation;