import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import {getBloodDonatesByDonor} from "../../api/donateBlood.js";

const DonationHistory = () => {
    const navigate = useNavigate();

    const [currentDonations, setCurrentDonations] = useState([]);

    const back = () => {
        navigate("/donor-home");
    };

    useEffect(() => {
        const donorId = localStorage.getItem("donorId");

        getBloodDonatesByDonor(donorId)
            .then((res) => {
                setCurrentDonations(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Donation history :</p>
                {currentDonations.length > 0 ? (
                    <div className="donation-list">
                        {currentDonations.map((donation) => (
                            <div className="donation-card" key={donation.id}>
                                <span className="donation-name">{donation.clinic.city}</span>
                                <span className="donation-name">{donation.clinic.name}</span>
                                <span className="donation-name">{donation.dateTaken}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="promo-text text-center">No donations</p>
                )}
                <button className="def-btn" onClick={back}>back</button>
            </div>
        </div>
    );
};

export default DonationHistory;
