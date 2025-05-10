import "./style.css"
import {useForm} from "react-hook-form";
import {useState} from "react";
import { useParams} from "react-router-dom";
import {editDonation} from "../../api/donation.js";

const EditClinicDonation = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const { id } = useParams();

    const [backendError, setBackendError] = useState(null)
    const [backendSuccess, setBackendSuccess] = useState(null)

    const onSubmit = (data) => {

        editDonation(id, data)
            .then(() => {
                setBackendSuccess("Success")
                setBackendError(null)
            })
            .catch(err => {
                setBackendError(err.response.data.message);
                setBackendSuccess(null)
            })
    }

    return (
        <div className="container-fluid back-change">
            <div className="login">
                <h2>Edit donation</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="dateTaken">date taken</label>
                    <input type="dateTaken" placeholder="date blood administered" {...register("dateTaken")}/>

                    <button className="def-btn" type="submit">Save changes</button>
                </form>
                <div className="backendError">{backendError?backendError:null}</div>
                <div className="backendSuccess">{backendSuccess?backendSuccess:null}</div>
            </div>
        </div>
    )
}

export default EditClinicDonation;