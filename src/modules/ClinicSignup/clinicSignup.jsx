import { useForm } from "react-hook-form"
import {SignUp} from "../../api/clinicAuth.js"
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const ClinicSignup = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const [backendError, setBackendError] = useState(null)

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);

        SignUp(data)
            .then(() => {
                navigate("/clinic-login")
            })
            .catch(err => {
                setBackendError(err.response.data.message);
            })
    }

    return (
        <div>

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
                                                    <Link to="/clinic-login">Ввійти</Link>
                                                </div>
                                                <form className="user" onSubmit={handleSubmit(onSubmit)}>

                                                    <div className="form-group">
                                                        <label htmlFor="name">Назва клініки</label>
                                                        <input type="text"
                                                               className="form-control form-control-user"
                                                               placeholder="Вкажіть назву"
                                                               {...register("name")}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="phone_number">Номер телефону</label>
                                                        <input type="text"
                                                               className="form-control form-control-user"
                                                               placeholder="Вкажіть номер телефону"
                                                               {...register("phone_number")}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="city">Місто</label>
                                                        <input type="text"
                                                               className="form-control form-control-user"
                                                               placeholder="Вкажіть місто"
                                                               {...register("city")}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="password">Пароль</label>
                                                        <input type="text"
                                                               className="form-control form-control-user"
                                                               placeholder="Вкажіть пароль"
                                                               {...register("password")}
                                                        />
                                                    </div>


                                                    <button className="btn btn-primary btn-user btn-block"
                                                            type="submit">Зареєструватись
                                                    </button>
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
        </div>
    )
}

export default ClinicSignup;
