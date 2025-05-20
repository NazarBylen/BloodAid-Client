import { useForm } from "react-hook-form"
import {useState} from "react";
import {SignUp} from "../../api/donors.js"
import { Link, useNavigate } from "react-router-dom";

const DonorSignup = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const navigate = useNavigate();

    const [backendError, setBackendError] = useState(null)

    const onSubmit = (data) => {
        console.log(data);

        SignUp(data)
            .then(() => {
                navigate("/donor-login")
            })
            .catch(err => {
                setBackendError(err.response.data.message);
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">

                <div className="col-xl-6 col-lg-6 col-md-6">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Реєстрація</h1>
                                            <div className="mb-3">
                                                Вже є акаунт? {' '}
                                                <Link to="/donor-login">Ввійти</Link>
                                            </div>
                                            <form className="user" onSubmit={handleSubmit(onSubmit)}>

                                                <div className="form-group">
                                                    <label htmlFor="full_name">Ваше ім&#39;я</label>
                                                    <input type="text"
                                                           className="form-control form-control-user"
                                                           placeholder="Вкажіть ім'я"
                                                           {...register("full_name")}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="blood_type">Тип крові</label>
                                                    <select className="form-select" {...register("blood_type")}>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="AB">AB</option>
                                                        <option value="O">O</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="rh_factor">Rh фактор</label>
                                                    <select className="form-select" {...register("rh_factor")}>
                                                        <option value="Rh+">Rh+</option>
                                                        <option value="Rh-">Rh-</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email"
                                                           className="form-control form-control-user"
                                                           placeholder="Вкажіть Email"
                                                           {...register("email")}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Пароль</label>
                                                    <input type="password"
                                                           className="form-control form-control-user"
                                                           placeholder="Вкажіть пароль"
                                                           {...register("password")}
                                                    />
                                                </div>

                                                <button className="btn btn-primary btn-user btn-block" type="submit">Зареєструватись</button>
                                            </form>
                                            <div
                                                className="mt-3 alert-danger">
                                                {backendError ? backendError : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default DonorSignup;
