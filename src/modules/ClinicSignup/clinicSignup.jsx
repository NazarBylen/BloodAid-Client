import { useForm } from "react-hook-form"

import "./style.css"
import {SignUp} from "../../api/clinicAuth.js"
import {useState} from "react";

const ClinicSignup = () => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const [backendError, setBackendError] = useState(null)
    const [backendSuccess, setBackendSuccess] = useState(null)

    const onSubmit = (data) => {
        console.log(data);

        SignUp(data)
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
        <div className="container-fluid back-signup">
            <div className="signup">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">name</label>
                    <input type="text" placeholder="Enter clinics name" {...register("name")}/>

                    <label htmlFor="phone number">phone number</label>
                    <input type="text" placeholder="Enter clinics phone number" {...register("phone_number")}/>

                    <label htmlFor="city">city</label>
                    <input type="city" placeholder="Enter clinics city" {...register("city")}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter clinics password" {...register("password")}/>

                    <button className="submit-btn" type="submit">Submit</button>
                </form>
                <div className="backendError">{backendError ? backendError : null}</div>
                <div className="backendSuccess">{backendSuccess ? backendSuccess : null}</div>
            </div>
        </div>
    )
}

export default ClinicSignup;