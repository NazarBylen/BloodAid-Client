import {useEffect, useState} from "react";
import {acceptRequest, getDonations} from "../../api/donation.js";
import {GetClinicInfo} from "../../api/clinicAuth.js";

const AllDonations = () => {
    const [, setCurrentClinic] = useState(null);
    const [currentDonations, setCurrentDonations] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);

    const [selectedDonation, setSelectedDonation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = (donation) => {
        setSelectedDonation(donation);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDonation(null);
    };

    const acceptBloodRequest = (id)=> {
        const clinicId = localStorage.getItem("clinicId")

        const data = {
            clinic: clinicId,
        }
        acceptRequest(id, data).then(response => {
            console.log(response);
            closeModal();
            window.location.reload();
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        const clinicId = localStorage.getItem("clinicId");

        getDonations()
            .then((res) => {
                setCurrentDonations(res.data);
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
        if (currentDonations.length > 0) {
            const filtered = currentDonations.filter(donation =>
                donation.clinic === null
            );
            setFilteredDonations(filtered);
        }
    }, [currentDonations]);

    return (
        <div>
            <h1 className="h3 mb-4 text-gray-800">Запити від пацієнтів</h1>

            {filteredDonations.length ? (
                <div className="row">
                    {filteredDonations.map(donation => (
                        <div key={donation.id} className="col-xl-6 col-md-6 mb-3">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {donation.patient.fullName}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => openModal(donation)}
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

            {/* Модальне вікно */}
            {showModal && selectedDonation && (
                <div className="modal show d-block" tabIndex="-1" role="dialog"
                     style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Деталі запиту</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Пацієнт:</strong> {selectedDonation.patient.fullName}</p>
                                <p><strong>Група крові:</strong> {selectedDonation.patient.blood_type}</p>
                                <p><strong>Резус-фактор:</strong> {selectedDonation.patient.rh_factor}</p>
                                <p><strong>Дата створення:</strong> {selectedDonation.dateRequested}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => acceptBloodRequest(selectedDonation.id)}>Прийняти</button>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Закрити
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllDonations;
