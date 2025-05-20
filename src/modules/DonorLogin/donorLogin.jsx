import {useForm} from "react-hook-form"
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {LogIn} from "../../api/donors.js"

const DonorLogin = () => {
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
                    localStorage.setItem("donorId", response.data.id)
                    localStorage.setItem("donorEmail", response.data.phone_number)
                    localStorage.setItem("donorName", response.data.name)
                    navigate('/donor-home')
                }
            )
            .catch(err => {
                    console.log(err);
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
                                                    <h1 className="h4 text-gray-900 mb-4">Вітаємо!</h1>
                                                    <div className="mb-2">
                                                        У вас ще немає облікового запису? {' '}
                                                        <Link to="/donor-signup">Зареєструйся</Link>
                                                    </div>
                                                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="form-group">
                                                            <input type="email"
                                                                   className="form-control form-control-user"
                                                                   id="exampleInputEmail" aria-describedby="emailHelp"
                                                                   placeholder="Вкажіть Email"
                                                                   {...register("email")}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password"
                                                                   className="form-control form-control-user"
                                                                   id="exampleInputPassword"
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
            );
}

export default DonorLogin;
