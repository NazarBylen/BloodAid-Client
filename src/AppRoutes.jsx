import {Route, Routes} from "react-router-dom";

import Home from "./modules/Home/Home.jsx"
import Signup from "./modules/Signup/Signup.jsx";
import Login from "./modules/Login/login.jsx";
import Profile from "./modules/Profile/Profile.jsx";
import ChangePassword from "./modules/changePassword/changePassword.jsx";
import EditProfile from "./modules/editProfile/editProfile.jsx";
import HomeNotPatient from "./modules/HomeNotPatient/HomeNotPatient.jsx";
import ClinicSignup from "./modules/ClinicSignup/clinicSignup.jsx";
import ClinicLogin from "./modules/ClinicLogin/clinicLogin.jsx";
import ClinicProfile from "./modules/ClinicProfile/ClinicProfile.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/edit-profile" element={<EditProfile/>}/>
            <Route path="/not-patient" element={<HomeNotPatient/>}/>
            <Route path="/clinic-signup" element={<ClinicSignup/>}/>
            <Route path="/clinic-login" element={<ClinicLogin/>}/>
            <Route path="/clinic-profile" element={<ClinicProfile/>}/>
        </Routes>
    )
}

export default AppRoutes;