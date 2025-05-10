import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./style.css"

const DonorHome = () => {
    const navigate = useNavigate();

    const [donorId, setDonorId] = useState(null)
    const [donorName, setDonorName] = useState(null)

    const login = () => navigate("/donor-login")
    const myProfile = () => navigate("/donor-profile")
    const signup = () => navigate("/donor-signup")
    const logout = () => {
        localStorage.clear()
        window.location.reload();
    }

    const back = () => {
        navigate("/")
    }

    const iwantToDonateBlood = () => {
        navigate("/donor/donate-blood")
    }

    const donatHistory = () => {
        navigate("/donor/donation-history")
    }

    useEffect(() => {
        const currentDonor = localStorage.getItem("donorId")
        const currentDonorName = localStorage.getItem("donorName")

        setDonorId(currentDonor)
        setDonorName(currentDonorName)
    }, [])

    return (
        <div className="container-fluid home-root">
            {donorId ?
                <div className="container">
                    <p className="company-name text-center">Blood Aid</p>
                    <p className="promo-text text-center">Welcome, {donorName?.replaceAll('"', '')}!</p>
                    <div>
                        <button onClick={myProfile} className="def-btn">My Profile</button>
                        <button onClick={logout} className="def-btn">LOG OUT</button>
                    </div>
                    <div>
                        <button onClick={iwantToDonateBlood} className="def-btn1">I want to donate Blood</button>
                        <button onClick={donatHistory} className="def-btn1">See my donation history</button>
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
        </div>
    )
}

export default DonorHome;
