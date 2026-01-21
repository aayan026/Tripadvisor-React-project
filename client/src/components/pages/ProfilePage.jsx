// ProfilePage.jsx
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import "../../styles/ProfilePage.css";

export default function ProfilePage() {
    const dispatch = useDispatch();

    const user = useSelector(s => s.auth.user);
    const savedAll = useSelector(s => s.user.saved);
    const reviewsAll = useSelector(s => s.user.reviews);

    const saved = useMemo(() => savedAll.filter(p => p.userEmail === user?.email), [savedAll, user?.email]);
    const reviews = useMemo(() => reviewsAll.filter(r => r.userEmail === user?.email), [reviewsAll, user?.email]);

    const [tab, setTab] = useState("saved");

    if (!user) return <p className="profile-empty">Please sign in to view your profile.</p>;

    const renderRating = (rating) => {
        const total = 5;
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = total - full - half;

        return (
            <div className="rating6">
                <p>{rating}</p>
                {[...Array(full)].map((_, i) => (
                    <span key={"f" + i} className="circle4 full"></span>
                ))}
                {half === 1 && <span className="circle4 half"></span>}
                {[...Array(empty)].map((_, i) => (
                    <span key={"e" + i} className="circle4 empty"></span>
                ))}
            </div>
        );
    };

    const handleDeleteSaved = (id) => {
        dispatch({ type: "DELETE_SAVED_PLACE", payload: id });
    };

    const handleDeleteReview = (id) => {
        dispatch({ type: "DELETE_REVIEW", payload: id });
    };

    return (
        <div className="profile-wrapper">

            <div className="profile-header">
                <img className="profile-avatar" src={user.avatar || "https://via.placeholder.com/100"} alt="avatar" />
                <div className="profile-userinfo">
                    <h2>{user.name} {user.surname}</h2>
                    <p>{user.email}</p>
                    <p>Contributions: {reviews.length}</p>
                </div>
            </div>

            <div className="profile-tabs">
                <button className={tab === "saved" ? "active" : ""} onClick={() => setTab("saved")}>Saved</button>
                <button className={tab === "reviews" ? "active" : ""} onClick={() => setTab("reviews")}>Reviews</button>
            </div>

            <div className="profile-content">

                {tab === "saved" && (
                    <div className="saved-grid">
                        {saved.length === 0 && <p className="empty-text">No saved places yet.</p>}
                        {saved.map(place => (
                            <div key={place.id} className="saved-card">
                                <img src={place.photos[0]} alt={place.name} />
                                <div className="saved-details">
                                    <h4>{place.title}</h4>
                                    <p>{place.category}</p>
                                    {renderRating(place.rating)}
                                    <button className="delete-btn" onClick={() => handleDeleteSaved(place.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === "reviews" && (
                    <div className="reviews-grid">
                        {reviews.length === 0 && <p className="empty-text">No reviews yet.</p>}
                        {reviews.map(r => (
                            <div key={r.id} className="review-card">
                                <div className="review-header">
                                    <h4>{r.title}</h4>
                                    <button className="delete-btn" onClick={() => handleDeleteReview(r.id)}>Delete</button>
                                </div>
                                {r.rating && renderRating(r.rating)}
                                <p className="review-text">{r.reviewText}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
