import {useNavigate} from "react-router-dom";

import "./style.css"
import {useEffect, useState} from "react";

const Home = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userName, setUserName] = useState(null)

    const login = () => {
        navigate("/login")
    }

    const myProfile = () => {
        navigate("/profile")
    }

    const signup = () => {
        navigate("/signup")
    }

    const notPatient = () => {
        navigate("/not-patient")
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload();
    }

    useEffect(() => {
        const currentUser = localStorage.getItem("userId")
        const currentUserEmail = localStorage.getItem("userEmail")
        const currentUserName = localStorage.getItem("userName")

        setUserId(currentUser)
        setUserEmail(currentUserEmail)
        setUserName(currentUserName)
    }, [userId, userEmail, userName])

    return (
        <div className="container-fluid home-root">
            {userId ?
                <div className="container">
                    <p className="company-name text-center">Blood Aid</p>
                    <p className="promo-text text-center">Welcome, {userName.replaceAll('"', '')}!</p>
                    <div>
                        <button onClick={myProfile} className="def-btn">My Profile</button>
                        <button onClick={logout} className="def-btn">LOG OUT</button>
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
                        <button onClick={notPatient} className="def-btn">I am not patient</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home;