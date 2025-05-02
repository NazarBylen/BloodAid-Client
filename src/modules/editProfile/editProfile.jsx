import "./style.css"
import {useForm} from "react-hook-form";
import {useState} from "react";
import {EditPatientProfile} from "../../api/auth";

const EditProfile = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const [backendError, setBackendError] = useState(null)
    const [backendSuccess, setBackendSuccess] = useState(null)

    const onSubmit = (data) => {

        const userId = localStorage.getItem("userId")

        EditPatientProfile(userId, data)
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
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name :</label>
                    <input type="name" placeholder="Enter new name" {...register("fullName")}/>

                    <label htmlFor="blood_type">Blood Type :</label>
                    <select className="custom-select" {...register("blood_type")}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>
                    <label htmlFor="rh_factor">Rh Factor :</label>
                    <select className="custom-select" {...register("rh_factor")}>
                        <option value="Rh+">Rh+</option>
                        <option value="Rh-">Rh-</option>
                    </select>

                    <button className="def-btn" type="submit">Save Changes</button>
                </form>
                <div className=" backendError">{backendError ? backendError : null}</div>
                <div className=" backendSuccess">{backendSuccess ? backendSuccess : null}</div>
            </div>
        </div>
    )
}

export default EditProfile;