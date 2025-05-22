import { useEffect, useState } from "react";
import { GetClinicInfo } from "../../api/clinicAuth.js";
import { editDonation, getDonations } from "../../api/donation.js";

const ClinicDonations = () => {
    const [currentClinic, setCurrentClinic] = useState(null);
    const [currentDonations, setCurrentDonations] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const [selectedDonation, setSelectedDonation] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setSelectedDate("");
        setSelectedDonation(null);
    };

    const openModal2 = () => {
        setShowModal2(true);
    };
    const closeModal2 = () => {
        setShowModal2(false);
        setSelectedDonation(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = selectedDonation.id;
        const updatedDonation = {
            dateTaken: selectedDate,
        };

        editDonation(id, updatedDonation)
            .then(() => {
                closeModal();
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };

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
        if (currentClinic && currentDonations.length > 0) {
            const filtered = currentDonations.filter(donation =>
                donation.clinic && donation.clinic.id === currentClinic.id
            );
            setFilteredDonations(filtered);
        }
    }, [currentClinic, currentDonations]);

    return (
        <div>
            <h1 className="h3 mb-4 text-gray-800">Наші пацієнти</h1>
            {filteredDonations.length ? (
                <div>
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
                                            {donation.dateTaken ? (
                                                <button
                                                    className="view-button"
                                                    onClick={() => {
                                                        setSelectedDonation(donation);
                                                        openModal2();
                                                    }}
                                                >
                                                    Переглянути запит
                                                </button>
                                            ) : (
                                                <button
                                                    className="view-button"
                                                    onClick={() => {
                                                        setSelectedDonation(donation);
                                                        openModal();
                                                    }}
                                                >
                                                    Редагувати запит
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="promo-text text-center">Немає пацієнтів</p>
            )}

            {/* Перша модалка — вибір дати */}
            {showModal && selectedDonation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h5>Оберіть дату для {selectedDonation.patient.fullName}</h5>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="date"
                                className="form-control my-3"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                required
                            />
                            <div className="text-end">
                                <button type="submit" className="btn btn-success">
                                    Підтвердити
                                </button>
                            </div>
                        </form>
                        <button onClick={closeModal} className="close-button">Закрити</button>
                    </div>
                </div>
            )}

            {/* Друга модалка */}
            {showModal2 && selectedDonation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Інформація про переливання крові</h2>
                        <p><strong>ПІБ:</strong> {selectedDonation.patient.fullName}</p>
                        <p><strong>Email:</strong> {selectedDonation.patient.email}</p>
                        <p><strong>Група крові:</strong> {selectedDonation.patient.blood_type}</p>
                        <p><strong>Резус-фактор:</strong> {selectedDonation.patient.rh_factor}</p>
                        <p><strong>Дата запиту на переливання крові:</strong> {selectedDonation.dateRequested}</p>
                        <p><strong>Дата переливання крові:</strong> {selectedDonation.dateTaken}</p>
                        <button onClick={closeModal2} className="close-button">Закрити</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClinicDonations;
