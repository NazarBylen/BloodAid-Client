import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DonorHome = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const donorId = localStorage.getItem("donorId")
        if(!donorId) navigate("/donor-login")
    });

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
                                        Дата останньої донації крові
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">19 травня 2025</div>
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
                                        Кількість донацій крові
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">15</div>
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
                            тут прогноз
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Запити від клінік</h6>
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

export default DonorHome;
