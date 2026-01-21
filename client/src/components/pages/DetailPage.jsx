import { use, useEffect, useState } from "react"
import Header from "../Layout/Header"
import { useDispatch, useSelector } from "react-redux"
import { singlePlaceFetch } from "../store/slices/placesSlice"
import { useNavigate, useParams } from "react-router-dom";
import { toggleSave } from "../store/slices/userSlice";
import "../../styles/Details.css";
import Footer from "../Layout/Footer";

function DetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(singlePlaceFetch(id));
    }, [dispatch, id]);

    const place = useSelector((state) => state.placesState.singlePlace);
    const [popup, setPopup] = useState(false);

    const saved = useSelector(s => s.user.saved);
    const isSaved = place ? saved.some(p => p.id === place.id) : false;

    const navigate = useNavigate()

    const isAuth = useSelector(s => s.auth.isAuth);
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
    const handleReview = () => {
        if (!isAuth) {
            setPopup(true);
            return;
        }
        navigate("/reviewpage", { state: { place } });
    };

    if (!place) {
        return (
            <>
                <Header />
                <p>Loading...</p>
            </>
        );
    }

    const total = 5;
    const full = Math.floor(place.rating);
    const half = place.rating % 1 >= 0.5;
    const empty = total - full - (half ? 1 : 0);

    return (
        <>
            <div className="mainContainer">
                <Header />
                <div className="detailContainer">
                    <div className="layout">
                        <div className="title">
                            <h1>{place.title}</h1>
                            <div className="reviewLayout">
                                <div className="rating">
                                    <p>{place.rating}</p>
                                    {[...Array(full)].map((_, i) => (
                                        <span key={"f" + i} className="circle full"></span>
                                    ))}
                                    {half && <span className="circle half"></span>}
                                    {[...Array(empty)].map((_, i) => (
                                        <span key={"e" + i} className="circle empty"></span>
                                    ))}
                                    <p id="review">{`( ${place.reviewsCount} reviews)`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="buttons3">
                            <button className="link"> <img src="\public\images\share-alt-svgrepo-com.svg" alt="" />Share</button>
                            <button onClick={handleReview} className="link"> <img src="\public\images\pen-svgrepo-com (1).svg" alt="" />Review</button>
                            <button onClick={handleSave} className="savebutton"> {isSaved ? <img src="\images\heart-svgrepo-com (1).svg" alt="" /> : <img src="\public\images\heart-svgrepo-com.svg" alt="" />}Save</button>
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
                                            <button onClick={() => navigate("/signin")} >
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
                    </div>
                    <div className="photos">
                        {place.photos.map((item, index) =>
                            <img key={index} src={item} alt="" />
                        )}
                    </div>
                    <div className="layout3">
                        <div>
                            <div className="about">
                                <div>
                                    <div>
                                        <h2>About</h2>
                                        <p>{place.description}</p>
                                        <p className="bold">category <span>{place.category}</span></p>
                                        <p className="bold">city <span>{place.city}</span></p>
                                        <p className="bold">Address <span>{place.address}</span></p>
                                        <p className="bold">contact <span>{place.contact.phone}</span></p>

                                    </div>
                                </div>

                            </div>
                            {place.isFeatured && (
                                <div className="featuredBadge">
                                    <img src="\public\images\PREMIO-TRIPADV.png" alt="" />
                                    <div>
                                        <p>Travelers’ Choice Best of the Best </p>
                                        <p id="year">2025</p>
                                    </div>
                                </div>
                            )}
                            <div className="aboutExtra">
                                <div className="priceBox">
                                    <span className="label">Price</span>
                                    <span className="price">{place.priceRange}</span>
                                </div>
                                <div className="amenities">
                                    <h3>Tags</h3>
                                    <div className="amenitiesList">
                                        {place.tags.map((item, i) => (
                                            <span key={i} className="amenity">
                                                {item}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="hours">
                            <h2>Hours</h2>
                            <div className="status">Open now</div>
                            <ul>
                                <li><strong>Sunday</strong> <span>{place.workingHours}</span></li>
                                <li><strong>Monday</strong> <span>{place.workingHours}</span></li>
                                <li><strong>Tuesday</strong> <span>{place.workingHours}</span></li>
                                <li><strong>Wednesday</strong> <span>{place.workingHours}</span></li>
                                <li><strong>Thursday</strong> <span>{place.workingHours}</span></li>
                                <li><strong>Friday</strong> <span>{place.workingHours}</span></li>
                                <li><strong>Saturday</strong> <span>{place.workingHours}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default DetailPage