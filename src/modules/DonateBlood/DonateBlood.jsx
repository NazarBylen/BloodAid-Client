import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { GetAllClinics } from "../../api/clinics.js";
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import {donateBloodToClinic} from "../../api/donateBlood.js";

const DonationHistory = () => {
    const navigate = useNavigate();

    const [currentClinics, setCurrentClinics] = useState([]);
    const [currentClinic, setCurrentClinic] = useState(null);

    const back = () => {
        navigate("/donor-home");
    };

    const donateBlood = (clinicId) => {
        document.getElementById("myModal").style.display = "flex";
        setCurrentClinic(clinicId)
    };

    const closeModal = () => {
        document.getElementById("myModal").style.display = "none";
    };

    const handleDateSubmit = (date) => {
        const currentDonorId = localStorage.getItem("donorId");

        const data = {
            donor: currentDonorId,
            dateTaken: date,
            clinic: currentClinic,
        };

        donateBloodToClinic(data)
            .then(() => {
                closeModal();
                alert("Request submitted!");
            })
            .catch((err) => {
                console.log(err);
                alert("Error creating donation");
            });
    };

    useEffect(() => {
        GetAllClinics()
            .then((res) => {
                setCurrentClinics(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Available donation requests :</p>
                {currentClinics.length > 0 ? (
                    <div className="donation-list">
                        {currentClinics.map((clinic) => (
                            <div className="donation-card" key={clinic.id}>
                                <span className="donation-name">{clinic.city}</span>
                                <span className="donation-name">{clinic.name}</span>
                                <button
                                    className="view-button"
                                    onClick={() => donateBlood(clinic.id)}
                                >
                                    Donate Blood
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="promo-text text-center">No clinics available</p>
                )}
                <button className="def-btn" onClick={back}>back</button>
            </div>

            <div id="myModal" className="modal-overlay">
                <div className="modal-content">
                    <h2>Choose date</h2>
                    <DatePicker onSubmit={handleDateSubmit} />
                    <p>Please wait until we message you on email or contact you in any different way</p>
                </div>
            </div>
        </div>
    );
};

export default DonationHistory;
