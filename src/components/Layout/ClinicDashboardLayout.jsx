import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../scss/sb-admin-2.scss'
import '../../scss/vendor/fontawesome-free/css/all.css'
import profileIcon from '../../img/undraw_profile.svg'
import  logo from '../../assets/logo.png';

export default function ClinicDashboardLayout() {
    const navigate = useNavigate();
    const donorName = localStorage.getItem("clinicName")

    const logOut = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        /* Page Wrapper */
        <div id="wrapper">
            {/*Sidebar*/}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/*Sidebar - Brand*/}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/clinic-dashboard">
                    <div className="sidebar-brand-text mx-3">Кабінет клініки</div>
                </Link>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <Link className="nav-link" to="/clinic-dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>

                <hr className="sidebar-divider my-3" />

                <div className="sidebar-heading">
                    Пацієнти
                </div>

                <li className="nav-item active">
                    <Link className="nav-link" to="/all-donations">
                        <i className="fas fa-fw fa-comment-dots"></i>
                        <span>Запити від пацієнтів</span>
                    </Link>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/clinic-donations">
                        <i className="fas fa-fw fa-comment-dots"></i>
                        <span>Наші пацієнти</span></a>
                </li>

                <hr className="sidebar-divider my-3" />

                <div className="sidebar-heading">
                    Донори
                </div>

                <li className="nav-item active">
                    <Link className="nav-link" to="/our-donors">
                        <i className="fas fa-fw fa-comment-dots"></i>
                        <span>Наші донори</span>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/donor-requests">
                        <i className="fas fa-fw fa-comment-dots"></i>
                        <span>Заявки на донацію крові</span>
                    </Link>
                </li>

                <hr className="sidebar-divider my-3" />

                <div className="sidebar-heading">
                    Профіль Клініки
                </div>
                <li className="nav-item active">
                    <Link className="nav-link" to="/clinic-profile">
                        <i className="fas fa-fw fa-comment-dots"></i>
                        <span>Профіль Клініки</span>
                    </Link>
                </li>
                <li className="nav-item active">
                    <div style={{ cursor: 'pointer' }} className="nav-link" onClick={logOut}>
                        <i className="fas fa-fw fa-comment-dots"></i>
                        <span>Вийти</span>
                    </div>
                </li>
            </ul>
            {/*End of Sidebar*/}

            {/*Content Wrapper*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*Main Content*/}
                <div id="content">

                    {/*Topbar*/}
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <div className="logo-container">
                            <img src={logo} alt="Logo" />
                            <span className="logo-text">Blood Aid</span>
                        </div>


                        {/*Topbar Navbar*/}
                        <ul className="navbar-nav ml-auto">


                            {/*Nav Item - Alerts*/}
                            <li className="nav-item dropdown no-arrow mx-1">
                                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-bell fa-fw"></i>
                                    {/*Counter - Alerts*/}
                                    <span className="badge badge-danger badge-counter">3+</span>
                                </a>
                            </li>


                            <div className="topbar-divider d-none d-sm-block"></div>

                            {/*Nav Item - User Information*/}
                            <li className="nav-item dropdown no-arrow">
                                <div className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{donorName}</span>
                                    <img className="img-profile rounded-circle" src={profileIcon} alt="..." />
                                </div>
                            </li>

                        </ul>

                    </nav>
                    {/*End of Topbar*/}

                    {/*Begin Page Content*/}
                    <div className="container-fluid">
                        <Outlet />
                    </div>

                </div>
                {/*End of Main Content*/}

                {/*Footer*/}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Blood Aid 2025</span>
                        </div>
                    </div>
                </footer>
                {/*End of Footer*/}
            </div>
            {/*End of Content Wrapper*/}
        </div>
    );
}
