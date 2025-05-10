import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "./style.css"
import {getDonations} from "../../api/donation.js";
import {GetClinicInfo} from "../../api/clinicAuth.js";

const AllDonations = () => {
    const navigate=useNavigate();

    const [, setCurrentClinic] = useState(null)
    const [currentDonations, setCurrentDonations] = useState([])
    const [filteredDonations, setFilteredDonations] = useState([]);

    const back = () => {
        navigate("/not-patient")
    }

    useEffect(()=>{

        const clinicId = localStorage.getItem("clinicId")
        getDonations().then((res) => {
            setCurrentDonations(res.data);
        }).catch((err) => {
            console.log(err);
        });

        GetClinicInfo(clinicId)
            .then((res)=>{
                console.log(res.data);
                setCurrentClinic(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    useEffect(()=>{
        if (currentDonations.length > 0) {
            const filtered = currentDonations.filter(donation =>
                donation.clinic === null
            );
            setFilteredDonations(filtered);
        }
    }, [currentDonations])

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Available donation requests :</p>
                    {filteredDonations.length > 0 ? (
                        <div className="donation-list">
                            {filteredDonations.map(donation => (
                                <div className="donation-card" key={donation.id}>
                                    <span className="donation-name">{donation.patient.fullName}</span>
                                    <button
                                        className="view-button"
                                        onClick={() => navigate(`/donation/${donation.id}`)}
                                    >
                                        View Request
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="promo-text text-center">No donations for this clinic</p>
                    )}
                <button className="def-btn" onClick={back}>back</button>
            </div>
        </div>
    )
}

export default AllDonations;