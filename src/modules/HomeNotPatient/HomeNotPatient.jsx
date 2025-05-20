import {useNavigate} from "react-router-dom";

import "./style.css"
import {useEffect, useState} from "react";
import PredictionForm from "../../components/blood_prediction/blood_prediction.jsx";

const HomeNotPatient = () => {
    const navigate = useNavigate();

    const [clinicId, setClinicId] = useState(null)
    const [clinicPhoneNumber, setClinicPhoneNumber] = useState(null)
    const [clinicName, setClinicName] = useState(null)

    const login = () => {
        navigate("/clinic-login")
    }

    const clinicProfile = () => {
        navigate("/clinic-profile")
    }

    const signup = () => {
        navigate("/clinic-signup")
    }

    const viewAllDonations = () => {
        navigate("/all-donations")
    }

    const donations = () => {
        navigate("/clinic-donations")
    }

    const back = () => {
        navigate("/")
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload();
    }

    useEffect(() => {
        const clinicId = localStorage.getItem("clinicId")
        if(!clinicId) navigate("/clinic-login")
    });

    useEffect(() => {
        const currentClinicId = localStorage.getItem("clinicId")
        const currentClinicPhoneNumber = localStorage.getItem("clinicPhoneNumber")
        const currentClinicName = localStorage.getItem("clinicName")

        setClinicId(currentClinicId)
        setClinicPhoneNumber(currentClinicPhoneNumber)
        setClinicName(currentClinicName)
    }, [clinicId, clinicPhoneNumber, clinicName])

    return (
        <div>
            <h1 className="h3 mb-4 text-gray-800">Dashboard</h1>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-6">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Зареєстрованих донорів
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">67</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-6">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Опрацьовано запитів від пацієнтів
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">150</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Прогноз попиту на кров</h6>
                        </div>
                        <div className="card-body">
                            <PredictionForm />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Запити від пацієнтів</h6>
                        </div>
                        <div className="card-body">
                            тут запити
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeNotPatient;
