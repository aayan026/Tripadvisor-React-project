import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesFetch, citiesFetch, amenitiesFetch } from "../../store/slices/placesSlice";
import { adminCreatePlaceFetch, adminPlacesFetch } from "../../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../../Layout/Footer";
import "../../../styles/admin.css";

function AdminPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 
    const { categories, cities } = useSelector(s => s.placesState);
    const { places } = useSelector(s => s.adminPlaces);

    // 
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    //
    const [isCreating, setIsCreating] = useState(false);
    const initialFormData = {
        title: "",
        description: "",
        category: "",
        city: "",
        address: "",
        coordinates: { lat: 0, lng: 0 },
        priceRange: "",
        amenities: [],
        photos: [],
        rating: 4,
        reviewsCount: 0,
        views: 0,
        isFeatured: false,
        phone: "",
        website: "",
        email: "",
        workingHours: "",
        tags: [],
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        dispatch(categoriesFetch());
        dispatch(citiesFetch());
        dispatch(adminPlacesFetch());
        dispatch(amenitiesFetch());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;

        if (name === "photos") {
            setFormData(prev => ({ ...prev, photos: files ? Array.from(files) : [] }));
        } else if (name === "amenities" || name === "tags") {
            setFormData(prev => ({ ...prev, [name]: value.split(",").map(a => a.trim()) }));
        } else if (type === "checkbox") {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name === "lat" || name === "lng" || name === "rating" || name === "reviewsCount" || name === "views") {
            setFormData(prev => ({
                ...prev,
                [name === "lat" || name === "lng" ? "coordinates" : name]:
                    name === "lat" ? { ...prev.coordinates, lat: parseFloat(value) } :
                        name === "lng" ? { ...prev.coordinates, lng: parseFloat(value) } :
                            parseFloat(value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) return alert("Title is required");
        if (!formData.description.trim()) return alert("Description is required");
        if (!formData.category.trim()) return alert("Category is required");
        if (!formData.city.trim()) return alert("City is required");
        if (!formData.phone.trim()) return alert("Phone is required");

        const fd = new FormData();
        fd.append("title", formData.title);
        fd.append("description", formData.description);
        fd.append("category", formData.category);
        fd.append("city", formData.city);
        fd.append("address", formData.address || "");
        fd.append("coordinates", JSON.stringify(formData.coordinates));
        fd.append("priceRange", formData.priceRange);
        fd.append("amenities", JSON.stringify(formData.amenities));
        fd.append("website", formData.website);
        fd.append("email", formData.email);
        fd.append("workingHours", formData.workingHours);
        fd.append("tags", JSON.stringify(formData.tags));
        fd.append("rating", formData.rating.toString());
        fd.append("isFeatured", formData.isFeatured ? "true" : "false");

        formData.photos.forEach(file => fd.append("photos", file));
        console.log(formData.photos)
        dispatch(adminCreatePlaceFetch(fd))
            .then(() => {
                setIsCreating(false);
                setFormData(initialFormData);
                dispatch(adminPlacesFetch());
                navigate("/admin");
            });


    };

    const filteredPlaces = (places || []).filter(place => {
        const matchesSearch = place.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory ? place.category === selectedCategory : true;
        const matchesCity = selectedCity ? place.city === selectedCity : true;
        return matchesSearch && matchesCategory && matchesCity;
    });

    return (
        <>
            <div className="admin-header">
                <div className="admin-header-left">
                    <img src="https://static.tacdn.com/img2/brand_refresh_2025/logos/wordmark.svg" alt="TripAdvisor" />
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
                        {(categories || []).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value="">All Cities</option>
                        {(cities || []).map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                    <button
                        className="createBtn"
                        onClick={() => { setIsCreating(true); setFormData(initialFormData); }}>Create Place
                    </button>

                    {isCreating && (
                        <div className="modal-overlay" onClick={() => setIsCreating(false)}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <form onSubmit={handleSubmit}>
                                    <div className="createPanel">

                                        <h3>Create Place</h3>

                                        <div className="form-group">
                                            <label>Title *</label>
                                            <input name="title" value={formData.title} onChange={handleChange} placeholder="Enter place title" required />
                                        </div>

                                        <div className="form-group">
                                            <label>Description *</label>
                                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" required />
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Category *</label>
                                                <input name="category" value={formData.category} onChange={handleChange} placeholder="e.g., hotel" required />
                                            </div>

                                            <div className="form-group">
                                                <label>City *</label>
                                                <input name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Address *</label>
                                            <input name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required />
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Price Range</label>
                                                <select name="priceRange" value={formData.priceRange} onChange={handleChange}>
                                                    <option value="">Select price</option>
                                                    <option value="$">$ (Budget)</option>
                                                    <option value="$$">$$ (Moderate)</option>
                                                    <option value="$$$">$$$ (Expensive)</option>
                                                    <option value="$$$$">$$$$ (Luxury)</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Working Hours</label>
                                                <input name="workingHours" value={formData.workingHours} onChange={handleChange} placeholder="e.g., 24/7" />
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label>Website</label>
                                            <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
                                        </div>

                                        <div className="form-group">
                                            <label>Amenities</label>
                                            <textarea name="amenities" value={formData.amenities.join(", ")} onChange={handleChange} placeholder="Wi-Fi, Parking, Restaurant" />
                                        </div>

                                        <div className="form-group">
                                            <label>Tags</label>
                                            <textarea name="tags" value={formData.tags.join(", ")} onChange={handleChange} placeholder="luxury, modern, family-friendly" />
                                        </div>


                                        <div className="form-group">
                                            <label>Photos</label>
                                            <input type="file" name="photos" multiple onChange={handleChange} accept="image/*" />
                                            {formData.photos.length > 0 && (
                                                <p className="file-info">{formData.photos.length} file(s)</p>
                                            )}
                                        </div>

                                        <div className="form-group checkbox">
                                            <label>
                                                <input className="isfeatured" type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                                                Featured Place
                                            </label>
                                        </div>

                                        <div className="editActions">
                                            <button type="submit" className="saveBtn">Create</button>
                                            <button type="button" className="cancelBtn" onClick={() => setIsCreating(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>

                <div className="admin-page-places">
                    {filteredPlaces.length === 0 ? (
                        <p>No places found</p>
                    ) : (
                        filteredPlaces.map(place => (
                            <button
                                key={place.id}
                                className="placeBtn2"
                                onClick={() => navigate(`/admin/details/${place.id}`)}
                            >
                                <div className="placeCard2">
                                    <img
                                        className="placeImg2"
                                        src={
                                            place.photos?.[0]?.startsWith("/uploads/")
                                                ? `http://localhost:5000${place.photos[0]}`
                                                : place.photos?.[0] || "/placeholder.png"
                                        }
                                        alt={place.title}
                                    />

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
                                            <p id="review9">{`( ${place.reviewsCount} reviews)`}</p>
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

export default AdminPage;
