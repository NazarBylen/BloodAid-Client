import { useEffect, useState } from "react";
import { GetClinicInfo } from "../../api/clinicAuth.js";
import {getDonorRequests, patchDonorRequests} from "../../api/donateBlood.js";
import "./style.css"; // для стилів модалки

const DonorModal = ({ donorRequest, onClose }) => {
    if (!donorRequest) return null;

    const acceptDonor = async (id) => {
        const data = {
            acceptedOrRejected: true
        }

        patchDonorRequests(id, data).then(response => {
            console.log(response);
            onClose();
            window.location.reload();
        }).catch(error => {
            console.log(error);
        })
    }

    const rejectDonor = async (id) => {
        const data = {
            acceptedOrRejected: false
        }

        patchDonorRequests(id, data).then(response => {
            console.log(response);
            onClose();
            window.location.reload();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Інформація про донора</h2>
                <p><strong>ПІБ:</strong> {donorRequest.donor.fullName}</p>
                <p><strong>Email:</strong> {donorRequest.donor.email}</p>
                <p><strong>Група крові:</strong> {donorRequest.donor.blood_type}</p>
                <p><strong>Резус-фактор:</strong> {donorRequest.donor.rh_factor}</p>
                <p><strong>Запросив здачу крові на:</strong> {donorRequest.dateRequestedToDonateBlood}</p>
                <button onClick={() => acceptDonor(donorRequest.id)} className="close-button">Прийняти</button>
                <button onClick={() => rejectDonor(donorRequest.id)} className="close-button">Відхилити</button>
                <button onClick={onClose} className="close-button">Закрити</button>
            </div>
        </div>
    );
};

const DonorRequests = () => {

    const [, setCurrentClinic] = useState(null);
    const [currentDonorRequests, setCurrentDonorRequests] = useState([]);
    const [filteredDonorRequests, setFilteredDonorRequests] = useState([]);
    const [selectedDonor, setSelectedDonor] = useState(null);

    useEffect(() => {
        const clinicId = localStorage.getItem("clinicId");

        getDonorRequests()
            .then((res) => {
                setCurrentDonorRequests(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        GetClinicInfo(clinicId)
            .then((res) => {
                setCurrentClinic(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const clinicId = localStorage.getItem("clinicId");

        if (currentDonorRequests.length > 0) {
            const filtered = currentDonorRequests.filter(donorClinic =>
                donorClinic.clinic.id === Number(clinicId) && donorClinic.acceptedOrRejected === null
            );
            setFilteredDonorRequests(filtered);
        }
    }, [currentDonorRequests]);

    return (
        <div>
            <h1 className="h3 mb-4 text-gray-800">Запити на здачу крові від донорів</h1>

            {filteredDonorRequests.length ? (
                <div className="row">
                    {filteredDonorRequests.map(donorRequest => (
                        <div key={donorRequest.id} className="col-xl-6 col-md-6 mb-3">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {donorRequest.donor.fullName}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <button
                                                className="view-button"
                                                onClick={() => setSelectedDonor(donorRequest)}
                                            >
                                                Переглянути запит
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
            )}

            <DonorModal donorRequest={selectedDonor} onClose={() => setSelectedDonor(null)} />
        </div>
    );
};

export default DonorRequests;
