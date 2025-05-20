import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DeleteDonor, GetDonorInfo} from "../../api/donors.js";

const DonorProfile = () => {
    const navigate = useNavigate();

    const [currentDonor, setCurrentDonor] = useState(null)

    const navigateToChangePassword = () => {
        navigate("/donor/change-password")
    }
    const navigateToEditProfile = () => {
        navigate("/donor/edit-profile")
    }

    const deleteDonorAccount = () => {
        const donorId = localStorage.getItem("donorId")

        DeleteDonor(donorId)
            .then()
            .catch((err)=>{
                console.log(err);
            })
        localStorage.clear()
        navigate("/")
    }

    useEffect(() => {
        const donorId = localStorage.getItem("donorId")
        if(!donorId) navigate("/donor-login")
    });

    useEffect(()=>{

        const donorId = localStorage.getItem("donorId")

        GetDonorInfo(donorId)
            .then((res)=>{
                console.log(res);
                setCurrentDonor(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return (
        <div>
            <h1 className="h3 mb-4 text-gray-800">Мій профайл</h1>
            {
                currentDonor ? (
                    <div className="row">
                        <div className="col-2">
                            ID:
                        </div>
                        <div className="col-10">
                            {currentDonor.id}
                        </div>
                        <div className="col-2">
                            Email:
                        </div>
                        <div className="col-10">
                            {currentDonor.email}
                        </div>
                        <div className="col-2">
                            Ім&#39;я:
                        </div>
                        <div className="col-10">
                            {currentDonor.fullName}
                        </div>
                        <div className="col-2">
                            Rh фактор:
                        </div>
                        <div className="col-10">
                            {currentDonor.rh_factor}
                        </div>
                        <div className="col-2">
                            Тип крові:
                        </div>
                        <div className="col-10">
                            {currentDonor.blood_type}
                        </div>
                        <div className="row mt-3">
                            <div className="col-auto">
                                <button className="btn btn-primary btn-user btn-block"
                                        onClick={navigateToEditProfile}>Редагувати профайл
                                </button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary btn-user btn-block"
                                        onClick={navigateToChangePassword}>Змінити пароль
                                </button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-outline-primary btn-user btn-block"
                                        onClick={deleteDonorAccount}>Видалити акаунт
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default DonorProfile;
