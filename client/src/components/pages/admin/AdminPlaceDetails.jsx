import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/AdminDetails.css";
import { useEffect, useState } from "react";
import Footer from "../../Layout/Footer";
import { adminDeletePlaceFetch, adminPlacesFetch, adminUpdatePlaceFetch } from "../../store/slices/adminSlice";

function AdminPlaceDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const { places } = useSelector(s => s.adminPlaces);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        city: "",
        address: "",
        phone: ""
    });

    useEffect(() => {
        dispatch(adminPlacesFetch());
    }, [dispatch]);

    const place = places.find(p => p.id === id);

    useEffect(() => {
        if (place) {
            setFormData({
                title: place.title,
                description: place.description,
                category: place.category,
                city: place.city,
                address: place.address,
                phone: place.contact?.phone || ""
            });
        }
    }, [place]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPlace = {
            id: place.id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            city: formData.city,
            address: formData.address,
            contact: {
                phone: formData.phone
            }
        };

        dispatch(
            adminUpdatePlaceFetch({
                id: place.id,
                formData: updatedPlace
            })
        ).then(() => setIsEditing(false));
    };


    if (!place) {
        return <p>Loading place...</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const total = 5;
    const full = Math.floor(place.rating);
    const half = place.rating % 1 >= 0.5;
    const empty = total - full - (half ? 1 : 0);


    return (
        <>
            <div className="admin-header">
                <div className="admin-header-left">
                    <img
                        src="https://static.tacdn.com/img2/brand_refresh_2025/logos/wordmark.svg"
                        alt="TripAdvisor"
                    />
                    <span className="admin-subtitle">Admin Panel</span>
                </div>

                <div className="admin-header-right">
                    <h2>Places Management</h2>
                    <p>Manage listings, ratings and details</p>
                </div>
            </div>

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
                    </div>
                    <div className="editPlace">
                        <button className="deleteBtn" onClick={() => setShowConfirm(true)}>Delete Place</button>
                        {showConfirm && (
                            <div className="popup-overlay">
                                <div className="popup">
                                    <h3>Delete Place</h3>
                                    <p>
                                        This action cannot be undone.
                                        Are you sure you want to permanently delete this place?
                                    </p>

                                    <div className="popup-actions">
                                        <button
                                            className="confirm-btn"
                                            onClick={() => {
                                                dispatch(adminDeletePlaceFetch(place.id))
                                                    .then(() => {
                                                        setShowConfirm(false);
                                                        navigate("/admin");
                                                    });
                                            }}
                                        >
                                            Yes, Delete
                                        </button>

                                        <button
                                            className="cancel-btn"
                                            onClick={() => setShowConfirm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            className="editBtn"
                            onClick={() => setIsEditing(prev => !prev)}
                        >
                            {isEditing ? "Close Editor" : "Edit Place"}
                        </button>
                        {isEditing && (
                            <form onSubmit={handleSubmit}>
                                <div className="editPanel">

                                    <h3>Edit Place</h3>

                                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                                    <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
                                    <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />

                                    <div className="editActions">
                                        <button type="submit" className="saveBtn">Save Changes</button>
                                    </div>
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
}

export default AdminPlaceDetails;
