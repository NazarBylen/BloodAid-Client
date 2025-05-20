import {useForm} from "react-hook-form";
import {useState} from "react";
import {ChangeDonorPassword} from "../../api/donors.js";

const DonorChangePassword = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const [backendError, setBackendError] = useState(null)
    const [backendSuccess, setBackendSuccess] = useState(null)

    const onSubmit = (data) => {

        const donorId = localStorage.getItem("donorId")

        ChangeDonorPassword(donorId, data)
            .then(() => {
                setBackendSuccess("Пароль змінено")
                setBackendError(null)
            })
            .catch(err => {
                setBackendError(err.response.data.message);
                setBackendSuccess(null)
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
                                            <h1 className="h4 text-gray-900 mb-4">Зміна паролю</h1>
                                            <form className="user" onSubmit={handleSubmit(onSubmit)}>

                                                <div className="form-group">
                                                    <label htmlFor="newPassword">Новий пароль</label>
                                                    <input type="password"
                                                           className="form-control form-control-user"
                                                           placeholder="Вкажіть пароль"
                                                           {...register("newPassword")}
                                                    />
                                                </div>

                                                <button className="btn btn-primary btn-user btn-block"
                                                        type="submit">Змінити
                                                </button>
                                            </form>
                                            <div
                                                className="mt-3 alert-danger">
                                                {backendError ? backendError : null}
                                            </div>
                                            <div
                                                className="mt-3 alert-success">{backendSuccess ? backendSuccess : null}</div>
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

export default DonorChangePassword;
