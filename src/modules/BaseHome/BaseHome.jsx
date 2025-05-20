import {useNavigate} from "react-router-dom";
import PredictionForm from "../../components/blood_prediction/blood_prediction.jsx";
import  logo from '../../assets/logo.png';
import  clinicIcon from '../../assets/clinic.png';
import  donorIcon from '../../assets/donor.png';
import './style.css';


const BaseHome = () => {
    const navigate = useNavigate();

    const patient = () => {
        navigate("/home")
    }

    const clinic = () => {
        navigate("/clinic-dashboard")
    }

    const donor = () => {
        navigate("/donor-home")
    }

    const goToFAQ = () => {
        navigate("/faq")
    }

    return (
        <div className="container-fluid">
            <div className="home-base">
                <div className="logo-container">
                    <img src={logo} alt="Logo" />
                    <span className="logo-text">Blood Aid</span>
                </div>


                <div className="base-cards">
                <div className="base-card">
                        <div className="base-card-body">
                            <h2>
                                Допоможи врятувати життя
                            </h2>
                            <p>
                                Стань донором крові — твоя допомога може стати вирішальною для тих, хто її потребує просто зараз.
                                Реєструйся та дізнавайся, кому твоя кров може допомогти.
                            </p>
                            <button onClick={donor} className="def-btn">Я Донор</button>
                        </div>
                        <img className="card-img" src={donorIcon} alt="Я Донор" />
                    </div>
                    <div className="base-card">
                        <div className="base-card-body">
                            <h2>
                                Потрібна кров? Ми допоможемо знайти донора
                            </h2>
                            <p>
                                Платформа для клінік і пацієнтів, які шукають донорів крові.
                                Залиш запит і отримай швидку підтримку від спільноти небайдужих.
                            </p>
                            <button onClick={clinic} className="def-btn">Ми Клініка</button>
                            <button onClick={patient} className="def-btn">Я Пацієнт</button>
                        </div>
                        <img className="card-img" src={clinicIcon} alt="Ми Клініка" />
                    </div>
                </div>

                <div className="container">
                    <PredictionForm/>
                </div>
                <div className="faq-wrapper">
                    <button onClick={goToFAQ}>FAQ</button>
                </div>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="../../../svg/facebook.svg" alt="Facebook"/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="../../../svg/instagram.svg" alt="Instagram"/>
                    </a>
                    <a href="https://github.com/NazarBylen" target="_blank" rel="noopener noreferrer">
                        <img src="../../../svg/github.svg" alt="GitHub"/>
                    </a>
                </div>

            </div>
        </div>
    )
}

export default BaseHome;
