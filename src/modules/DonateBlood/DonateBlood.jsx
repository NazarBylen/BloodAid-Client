import { useEffect, useState } from "react";

import { GetAllClinics } from "../../api/clinics.js";
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import {donateBloodToClinic} from "../../api/donateBlood.js";

const DonationHistory = () => {

    const [currentClinics, setCurrentClinics] = useState([]);
    const [currentClinic, setCurrentClinic] = useState(null);

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
        <div>
            <h1 className="h3 mb-4 text-gray-800">Запити від клінік</h1>

            {
                currentClinics.length ? (
                    <div className="row">
                        {currentClinics.map((clinic) => (
                            <div key={clinic.id} className="col-xl-6 col-md-6 mb-3">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    {clinic.city}
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{clinic.name}</div>
                                            </div>
                                            <div className="col-auto">
                                                <button
                                                    className="view-button"
                                                    onClick={() => donateBlood(clinic.id)}
                                                >
                                                    Записатись на донацію крові
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="promo-text text-center">Запитів немає</p>
                )
            }

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
