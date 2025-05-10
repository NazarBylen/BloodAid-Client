import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "./style.css"
import {GetClinicInfo} from "../../api/clinicAuth.js";
import {getDonations} from "../../api/donation.js";

const ClinicDonations = () => {
    const navigate=useNavigate();

    const [currentClinic, setCurrentClinic] = useState(null)
    const [currentDonations, setCurrentDonations] = useState([])
    const [filteredDonations, setFilteredDonations] = useState([]);

    const back = () => {
        navigate("/not-patient")
    }

    useEffect(()=>{

        const clinicId = localStorage.getItem("clinicId")
        getDonations().then((res) => {
            console.log(res.data);
            setCurrentDonations(res.data);
        }).catch((err) => {
            console.log(err);
        });

        GetClinicInfo(clinicId)
            .then((res)=>{
                setCurrentClinic(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    useEffect(()=>{
        if (currentClinic && currentDonations.length > 0) {
            const filtered = currentDonations.filter(donation =>
                donation.clinic && donation.clinic.id === currentClinic.id
            );
            setFilteredDonations(filtered);
        }
    }, [currentClinic, currentDonations])

    return (
        <div className="container-fluid profile-root">
            <div className="container">
                <p className="row company-name">Clinic Information</p>
                {currentClinic ?
                    <div>
                        {filteredDonations.length > 0 ? (
                            <div>
                                {filteredDonations.map(donation => (
                                    <div key={donation.id} className="donation-card">
                                        <div className="donation-info">
                                            <p className="donation-name">{donation.patient.fullName}</p>
                                        </div>
                                        <div className="donation-action">
                                            <button
                                                className="view-btn"
                                                onClick={() => navigate(`/clinic-donation/${donation.id}`)}
                                            >
                                                View Donation
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="promo-text text-center">No donations for this clinic</p>}
                        <button className="def-btn" onClick={back}>back</button>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default ClinicDonations;