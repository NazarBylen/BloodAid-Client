import { useEffect, useState } from "react";
import {getBloodDonatesByClinic} from "../../api/donateBlood.js";

const OurDonors = () => {

    const [currentDonations, setCurrentDonations] = useState([]);

    useEffect(() => {
        const clinicId = localStorage.getItem("clinicId");

        getBloodDonatesByClinic(clinicId)
            .then((res) => {
                setCurrentDonations(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1 className="h3 mb-4 text-gray-800">Наші донори та історія донацій</h1>
            {currentDonations.length ? (
                <div className="row">
                    {currentDonations.map((donation) => (
                        <div key={donation.id} className="col-xl-12 col-md-12 mb-3">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div
                                                className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                {donation.donor.email}
                                            </div>
                                            <div
                                                className="h5 mb-0 font-weight-bold text-gray-800">{donation.donor.fullName}</div>
                                        </div>
                                        <div className="col">{donation.dateRequestedToDonateBlood}</div>
                                        <div className="col">Група крові: {donation.donor.blood_type}</div>
                                        <div className="col">Резус-фактор: {donation.donor.rh_factor}</div>
                                        <div className="col-auto">
                                            <i className="fas fa-check fa-2x text-green-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
            ))}
        </div>
    )
:
    (
        <p className="promo-text text-center">Немає жодного запису</p>
    )
}
</div>
)
    ;
};

export default OurDonors;
