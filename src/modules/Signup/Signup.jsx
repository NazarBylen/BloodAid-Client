import { useForm } from "react-hook-form"

import "./style.css"
import {SignUp} from "../../api/auth"
import {useState} from "react";

const Signup = () => {
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
                    <input type="text" placeholder="Enter your name" {...register("full_name")}/>

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

                    <label htmlFor="email">email</label>
                    <input type="text" placeholder="Enter your email" {...register("email")}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your password" {...register("password")}/>

                    <button className="submit-btn" type="submit">Submit</button>
                </form>
                <div className="backendError">{backendError ? backendError : null}</div>
                <div className="backendSuccess">{backendSuccess ? backendSuccess : null}</div>
            </div>
        </div>
    )
}

export default Signup;