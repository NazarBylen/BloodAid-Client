import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetClinicInfo} from "../../api/clinicAuth.js";
import {getDonations} from "../../api/donation.js";

const ClinicDonations = () => {
    const navigate=useNavigate();

    const [currentClinic, setCurrentClinic] = useState(null)
    const [currentDonations, setCurrentDonations] = useState([])
    const [filteredDonations, setFilteredDonations] = useState([]);

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

                                            <div
                                                className="h5 mb-0 font-weight-bold text-gray-800">{donation.patient.fullName}</div>
                                        </div>
                                        <div className="col-auto">
                                            <button
                                                className="view-button"
                                                onClick={() => navigate(`/clinic-donation/${donation.id}`)}
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
    )
:
    <p className="promo-text text-center">Немає пацієнтів</p>
}
</div>
)
}

export default ClinicDonations;
