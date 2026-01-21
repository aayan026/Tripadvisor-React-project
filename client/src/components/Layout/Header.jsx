import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/Header.css";

function Header() {
    const [language, setLanguage] = useState("USD");
    const { isAuth, user } = useSelector(state => state.auth)
    const navigate=useNavigate();
    return (
        <header>
            <div className="header-container">
                <img className="tripadvisor-image" src="https://static.tacdn.com/img2/brand_refresh_2025/logos/wordmark.svg" alt="" />
                <div className="button_layout">
                    <button>Rewards</button>
                    <button>Discover</button>
                    <button>Review</button>
                    <button>Forums</button>
                </div>

                <div className='LanguageAndLoginBtn'>
                    <button className='languagebtn'>
                        <img src="\public\images\internet (1).png" alt="" />
                        <span className='divider'></span>
                        <span className='txt'>USD</span>
                    </button>
                </div>

               <div className="signin">
                    {!isAuth ? (
                        <button onClick={()=>navigate("/signin")}>Sign in</button>) : (
                        <div className="user-info">
                            <button className="profileButton" onClick={()=>navigate("/profile")}>
                                profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header