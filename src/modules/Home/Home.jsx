import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./style.css"
import {createDonation} from "../../api/donation.js";

const Home = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)

    const login = () => navigate("/login")
    const myProfile = () => navigate("/profile")
    const signup = () => navigate("/signup")
    const logout = () => {
        localStorage.clear()
        window.location.reload();
    }

    const back = () => {
        navigate("/")
    }

    const iNeedBlood = () => {
        document.getElementById("myModal").style.display = "flex";
        const currentUserId = localStorage.getItem("userId")
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yy = String(today.getFullYear()).slice(-2);
        const formattedDate = `${dd}-${mm}-${yy}`;

        const data = {
            patient: currentUserId,
            dateRequested: formattedDate,
        }

        createDonation(data)
    }

    const closeModal = () => {
        document.getElementById("myModal").style.display = "none";
    }

    useEffect(() => {
        const currentUser = localStorage.getItem("userId")
        const currentUserName = localStorage.getItem("userName")

        setUserId(currentUser)
        setUserName(currentUserName)
        closeModal()
    }, [])

    return (
        <div className="container-fluid home-root">
            {userId ?
                <div className="container">
                    <p className="company-name text-center">Blood Aid</p>
                    <p className="promo-text text-center">Welcome, {userName?.replaceAll('"', '')}!</p>
                    <div>
                        <button onClick={myProfile} className="def-btn">My Profile</button>
                        <button onClick={logout} className="def-btn">LOG OUT</button>
                    </div>
                    <div>
                        <button onClick={iNeedBlood} className="def-btn1">I Need Blood</button>
                    </div>
                </div>
                :
                <div className="container">
                    <p className="company-name text-center">Blood Aid</p>
                    <p className="promo-text text-center">Give Blood, Save Lives.!</p>
                    <div>
                        <button onClick={login} className="def-btn">LOGIN</button>
                        <button onClick={signup} className="def-btn">SIGN UP</button>
                    </div>
                    <div>
                        <button onClick={back} className="def-btn">Back</button>
                    </div>
                </div>
            }

            <div id="myModal" className="modal-overlay">
                <div className="modal-content">
                    <h2>Your Blood Request has been sent to clinics</h2>
                    <p>Please wait until we message you on email or contact you in any different way</p>
                    <button className="close-button" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Home;
