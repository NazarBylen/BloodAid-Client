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
import ClinicChangePassword from "./modules/clinicChangePassword/clinicChangePassword.jsx";
import ClinicDonations from "./modules/ClinicDonations/ClinicDonations.jsx";
import AllDonations from "./modules/AllDonations/AllDonations.jsx";
import SingleDonation from "./modules/SingleDonation/SingleDonation.jsx";
import ClinicSingleDonation from "./modules/ClinicSingleDonation/ClinicSingleDonation.jsx";
import EditClinicDonation from "./modules/EditClinicDonation/EditClinicDonation.jsx";
import DonorLogin from "./modules/DonorLogin/donorLogin.jsx";
import DonorSignup from "./modules/DonorSignup/DonorSignup.jsx";
import BaseHome from "./modules/BaseHome/BaseHome.jsx";
import DonorHome from "./modules/DonorHome/DonorHome.jsx.jsx";
import DonorProfile from "./modules/DonorProfile/DonorProfile.jsx";
import DonorChangePassword from "./modules/donorChangePassword/donorChangePassword.jsx";
import EditDonorProfile from "./modules/editDonorProfile/editDonorProfile.jsx";
import DonateBlood from "./modules/DonateBlood/DonateBlood.jsx";
import DonationHistory from "./modules/DonationHistory/DonationHistory.jsx";

const AppRoutes = () => {
    return (
        <Routes>
                {/* Загальні сторінки */}
                <Route path="/" element={<BaseHome />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/not-patient" element={<HomeNotPatient />} />

                {/* Пацієнт */}
                <Route path="/Home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/all-donations" element={<AllDonations />} />
                <Route path="/donation/edit/:id" element={<EditClinicDonation />} />
                <Route path="/donation/:id" element={<SingleDonation />} />

                {/* Клініка */}
                <Route path="/clinic-signup" element={<ClinicSignup />} />
                <Route path="/clinic-login" element={<ClinicLogin />} />
                <Route path="/clinic-profile" element={<ClinicProfile />} />
                <Route path="/clinic-change-password" element={<ClinicChangePassword />} />
                <Route path="/clinic-donations" element={<ClinicDonations />} />
                <Route path="/clinic-donation/edit-donation/:id" element={<EditClinicDonation />} />
                <Route path="/clinic-donation/:id" element={<ClinicSingleDonation />} />

                {/* Донор */}
                <Route path="/donor-home" element={<DonorHome />} />
                <Route path="/donor-signup" element={<DonorSignup />} />
                <Route path="/donor-login" element={<DonorLogin />} />
                <Route path="/donor-profile" element={<DonorProfile />} />
                <Route path="/donor/change-password" element={<DonorChangePassword />} />
                <Route path="/donor/edit-profile" element={<EditDonorProfile />} />
                <Route path="/donor/donate-blood" element={<DonateBlood />} />
                <Route path="/donor/donation-history" element={<DonationHistory />} />
        </Routes>
    )
}

export default AppRoutes;