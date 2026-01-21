import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesFetch } from "../../store/slices/placesSlice";
import { citiesFetch } from "../../store/slices/placesSlice";
import { allPlacesFetch } from "../../store/slices/placesSlice";
import { amenitiesFetch } from "../../store/slices/placesSlice";
import "../../../styles/admin.css";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { useNavigate } from "react-router-dom";
import { adminPlacesFetch } from "../../store/slices/adminSlice";

function AdminPlaces() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(categoriesFetch());
        dispatch(citiesFetch());
        dispatch(adminPlacesFetch());
        dispatch(amenitiesFetch());
    }, [dispatch]);
    const { categories, cities } = useSelector(s => s.placesState);
    const { places } = useSelector(s => s.adminPlaces)
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const filteredPlaces = places.filter(place => {
        const matchesSearch = place.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory ? place.category === selectedCategory : true;
        const matchesCity = selectedCity ? place.city === selectedCity : true;
        return matchesSearch && matchesCategory && matchesCity;
    });

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

            <div className="admin-page">
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search places..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <div className="admin-page-places">
                    {filteredPlaces.length === 0 ? (
                        <p>No places found</p>
                    ) : (
                        filteredPlaces.map((place) => (
                            <button
                                key={place.id}
                                className="placeBtn2"
                                onClick={() => navigate(`/admin/details/${place.id}`)}
                            >
                                <div className="placeCard2">
                                    <div className="imagecontainer2">
                                        <img className="placeImg2" src={place.photos[0]} alt={place.title} />
                                    </div>
                                    <div className="aboutcontainer2">
                                        <h3>{place.id}. {place.title}</h3>
                                        <div className="rating8">
                                            <p>{place.rating}</p>
                                            {[...Array(Math.floor(place.rating))].map((_, i) => (
                                                <span key={"f" + i} className="circle9 full"></span>
                                            ))}
                                            {place.rating % 1 >= 0.5 && <span key="half" className="circle9 half"></span>}
                                            {[...Array(5 - Math.floor(place.rating) - (place.rating % 1 >= 0.5 ? 1 : 0))].map((_, i) => (
                                                <span key={"e" + i} className="circle9 empty"></span>
                                            ))}
                                            <p id="review9">{`( ${place.reviewsCount} reviews9)`}</p>
                                        </div>
                                        <p>{place.address}</p>
                                        <p>{place.category}</p>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>

            </div>
            <Footer />
        </>
    );
}

export default AdminPlaces;
