import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthPage.css";

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!form.name || !form.surname || !form.email || !form.phone || !form.password) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }
        dispatch(register(form));
        setSuccess(true);
        setTimeout(() => {
            navigate(`/`);
        }, 3000);

    };


    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-logo">
                    <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" />
                </div>

                <h2 className="auth-title">Join Tripadvisor</h2>
                <p className="auth-subtitle">
                    Unlock the best travel experiences
                </p>

                <form className="auth-form" onSubmit={handleRegister}>
                    <input name="name" placeholder="Name" onChange={handleChange} />
                    <input name="surname" placeholder="Surname" onChange={handleChange} />
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="phone" placeholder="Phone" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} />

                    <button className="auth-btn">Sign Up</button>
                    {success && (
                        <div className="message-overlay">
                            <div className="success-modal">
                                <div className="success-icon">✓</div>
                                <h3>Account created successfully</h3>
                                <p>Welcome back!</p>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="message-overlay">
                            <div className="error-modal">
                                <div className="error-icon">!</div>
                                <h3>Form incomplete</h3>
                                <p>Please fill in all fields.</p>
                            </div>
                        </div>
                    )}
                </form>

                <div className="auth-footer">
                    Already have an account? <span><Link to="/signin">Sign In</Link></span>
                </div>
            </div>
        </div>
    );
}
