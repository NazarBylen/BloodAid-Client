import {useForm} from "react-hook-form";
import {useState} from "react";
import {EditDonorsProfile} from "../../api/donors.js";

const EditDonorProfile = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const [backendError, setBackendError] = useState(null)
    const [backendSuccess, setBackendSuccess] = useState(null)

    const onSubmit = (data) => {

        const donorId = localStorage.getItem("donorId")

        EditDonorsProfile(donorId, data)
            .then(() => {
                setBackendSuccess("Дані збережено")
                setBackendError(null)
            })
            .catch(err => {
                setBackendError(err.response.data.message);
                setBackendSuccess(null)
            })
    }

    return (
        <div>
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
                                                    <h1 className="h4 text-gray-900 mb-4">Редагування профайлу</h1>
                                                    <form className="user" onSubmit={handleSubmit(onSubmit)}>

                                                        <div className="form-group">
                                                            <label htmlFor="fullName">Ваше ім&#39;я</label>
                                                            <input type="text"
                                                                   className="form-control form-control-user"
                                                                   placeholder="Вкажіть ім'я"
                                                                   {...register("fullName")}
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


                                                        <button className="btn btn-primary btn-user btn-block"
                                                                type="submit">Зберегти зміни
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
            </div>
        </div>
    )
}

export default EditDonorProfile;
