import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toggleSave } from "../store/slices/userSlice";
import "../../styles/MainPage.css";

function FeaturedPlacesItem({ place }) {

  const total = 5;
  const full = Math.floor(place.rating);
  const half = place.rating % 1 >= 0.5;
  const empty = total - full - (half ? 1 : 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(s => s.auth.isAuth)
  const saved = useSelector(s => s.user.saved);
  const isSaved = place ? saved.some(p => p.id === place.id) : false;
  const [popup, setPopup] = useState(false);
  const userEmail = useSelector(s => s.auth.user?.email);

  const handleSave = () => {
    if (!isAuth) {
      setPopup(true);
      return;
    }

    dispatch(toggleSave({
      item: place,
      userEmail
    }));
  };
  return (
    <li className="featured-item">
      <div className="image-wrapper">
        <img className="placeImg" src={place.photos[0]} alt={place.title} />

        <button onClick={handleSave} className="fav-btn">{isSaved ? <img src="\images\heart-svgrepo-com (1).svg" alt="" /> : <img src="\public\images\heart-svgrepo-com.svg" alt="" />}</button>
        {popup && (
          <div className="message-overlay" onClick={() => setPopup(false)}>
            <div className="message" onClick={(e) => e.stopPropagation()}>
              <button className="close" onClick={() => setPopup(false)}>✕</button>
              <div className="message-title">
                <img src="/images/logo.svg" alt="logo" />

                <h2>
                  Making a list? Sign in to add your saves to a trip you can edit or share.
                </h2>
              </div>
              <div className="buttons6">
                <button>
                  <img src="\images\login-2-svgrepo-com (1).svg" alt="" />
                  <p>Sign in</p>
                </button>

                <button onClick={() => navigate("/signup")}>
                  <img src="\images\user-add-svgrepo-com.svg" alt="" />
                  <p>Sign up</p>
                </button>
              </div>
              <p className="terms">
                By proceeding, you agree to our <span>Terms of Use</span> and confirm you
                have read our <span>Privacy</span> and <span>Cookie Statement</span>.
              </p>
            </div>
          </div>
        )}
      </div>
      <button onClick={() => navigate(("/detail/" + place.id))}>
        <div className="info">
          <p className="city">{place.city}</p>
          <h3>{place.title}</h3>
          <div className="rating2">
            <p>{place.rating}</p>
            {[...Array(full)].map((_, i) => (
              <span key={"f" + i} className="circle2 full"></span>
            ))}
            {half && <span className="circle2 half"></span>}
            {[...Array(empty)].map((_, i) => (
              <span key={"e" + i} className="circle2 empty"></span>
            ))}
            <p id="review2">{`( ${place.reviewsCount})`}</p>
          </div>
        </div>
      </button>
    </li>
  )
}

export default FeaturedPlacesItem
