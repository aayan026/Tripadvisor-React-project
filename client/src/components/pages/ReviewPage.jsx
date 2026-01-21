import { data, Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "../Layout/Header"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../store/slices/userSlice";
import Footer from "../Layout/Footer";
import "../../styles/ReviewPage.css";

function ReviewPage() {

    const location = useLocation();
    const place = location.state?.place

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const userEmail = useSelector(s => s.auth.user?.email);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        date: "",
        withWho: "",
        reviewText: "",
        title: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!rating || !form.date || !form.withWho || !form.reviewText || !form.title) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }

        const finalReview = {
            rate: rating,
            placeId: place.id,
            ...form,
            date: Date.now(),
        };

        dispatch(addReview({
            review: finalReview,
            userEmail
        }));

        setSuccess(true);

        setTimeout(() => {
            navigate(`/detail/${place.id}`);
        }, 1500);
    };

    const dispatch = useDispatch();

    if (!place) {
        return <h1>loading...</h1>
    }
    return (
        <>
            <div className="mainContainer">
                <Outlet />
                <div className="reviewPage">
                    <div className="about2">
                        {place ? (place.category === "hotel" ?
                            (<h1>Tell us, how was your stay?</h1>

                            ) : (<h1>Tell us, How was your experience?</h1>)
                        ) : (<h1>Loading...</h1>)}
                        <div className="placePhoto">
                            <img src={place.photos[0]} alt="" />
                            <h2>{place.title}</h2>
                            <p>{place.city} {place.address}</p>
                        </div>
                    </div>
                    <div>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="rate">
                            <h1>How would you rate your experience?</h1>
                            <div className="rating3">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        className={`circle3 ${value <= (hover !== null ? hover : rating) ? "active" : ""
                                            }`}
                                        onMouseEnter={() => setHover(value)}
                                        onMouseLeave={() => setHover(null)}
                                        onClick={() => setRating(value)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="date">
                            <h1>When did you go?</h1>
                            <select name="date" onChange={handleChange}>
                                <option value="Jan 2026">January 2026</option>
                                <option value="Dec 2025">December 2025</option>
                                <option value="Nov 2025">November 2025</option>
                                <option value="Oct 2025">October 2025</option>
                                <option value="Aug 2025">August 2025</option>
                                <option value="Jul 2025">July 2025</option>
                                <option value="Jun 2025">June 2025</option>
                                <option value="May 2025">May 2025</option>
                                <option value="Apr 2025">April 2025</option>
                                <option value="Mar 2025">March 2025</option>
                                <option value="Feb 2025">February 2025</option>
                            </select>
                        </div>
                        <div className="with">
                            <h1>Who did you go with?</h1>
                            <div className="buttons4">
                                {["Business", "Couples", "Family", "Friends", "Solo"].map(item => (
                                    <button type="button" key={item} className={form.withWho === item ? "active" : ""} onClick={() => setForm({ ...form, withWho: item })}>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="review">
                            <h1>Write your review</h1>
                            <textarea type="text" name="reviewText" maxLength={50} placeholder="Share your experience..." onChange={handleChange} />
                            <p>{form.reviewText.length}/50</p>
                        </div>

                        <div className="titlr">
                            <h1>Title your review</h1>
                            <input type="text" name="title" maxLength={120} placeholder="Give us the gist of your experience" onChange={handleChange} />
                            <p>{form.title.length}/120</p>
                        </div>

                        <button type="submit">Submit Review</button>
                        {success ? (
                            <div className="message-overlay">
                                <div className="success-modal">
                                    <div className="success-icon">✓</div>
                                    <h3>Review submitted</h3>
                                    <p>Thanks for sharing your experience.</p>
                                </div>
                            </div>
                        ) : error && (
                            <div className="message-overlay">
                                <div className="error-modal">
                                    <div className="error-icon">!</div>
                                    <h3>Try again</h3>
                                    <p>Please fill in all fields</p>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ReviewPage