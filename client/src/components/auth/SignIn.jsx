import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthPage.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(s => s.auth.isAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (!submitted) return;

    if (isAuth) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  }, [isAuth, submitted]);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" />
        </div>

        <h2 className="auth-title">
          Sign in to unlock the best of Tripadvisor
        </h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn">Sign In</button>

          {success && <p>Login successful</p>}
          {error && <p>Email or password is incorrect</p>}
        </form>

        <div className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
