import {useForm} from "react-hook-form"
import {LogIn} from "../../api/clinicAuth.js"
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const ClinicLogin = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const navigate = useNavigate();

    const [backendError, setBackendError] = useState(null)

    const onSubmit = (data) => {
        console.log(data);
        LogIn(data)
            .then( response => {
                    console.log(response);
                    localStorage.setItem("clinicId", response.data.id)
                    localStorage.setItem("clinicPhoneNumber", response.data.phone_number)
                    localStorage.setItem("clinicName", response.data.name)
                    setBackendError(null)
                    navigate('/clinic-dashboard')
                }
            )
            .
                catch(err => {
                    console.log(err);
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
                                                    <h1 className="h4 text-gray-900 mb-4">Вітаємо!</h1>
                                                    <div className="mb-2">
                                                        У вас ще немає облікового запису? {' '}
                                                        <Link to="/clinic-signup">Зареєструйся</Link>
                                                    </div>
                                                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="form-group">
                                                            <label htmlFor="phone number">Номер телефону</label>
                                                            <input type="text"
                                                                   className="form-control form-control-user"
                                                                   placeholder="Вкажіть номер телефону"
                                                                   {...register("phone_number")}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password">Пароль</label>
                                                            <input type="password"
                                                                   className="form-control form-control-user"
                                                                   placeholder="Вкажіть пароль"
                                                                   {...register("password")} />
                                                        </div>
                                                        <button className="btn btn-primary btn-user btn-block"
                                                                type="submit">Ввійти
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

export default ClinicLogin;
