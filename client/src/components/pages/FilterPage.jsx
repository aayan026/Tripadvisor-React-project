import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../Layout/Footer"
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { categoriesFetch, citiesFetch, allPlacesFetch, amenitiesFetch } from "../store/slices/placesSlice";
import { useEffect } from "react";
import { useState } from "react";

function FilterPage() {

    const dispatch = useDispatch();
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");



    useEffect(() => {
        dispatch(categoriesFetch());
        dispatch(citiesFetch());
        dispatch(allPlacesFetch());
        dispatch(amenitiesFetch());
    }, [dispatch]);
    const { categories, cities, places, amenities } = useSelector(s => s.placesState);
    console.log(amenities)

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);

    const toggleAmenity = (a) => {
        setSelected(prev =>
            prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
        );
    };

    const filteredAmenities = amenities.filter(a =>
        a.toLowerCase().includes(search.toLowerCase())
    );
    const filteredPlaces = places.filter(p => {
        const categoryOk = category ? p.category === category : true;
        const cityOk = city ? p.city === city : true;
        const amenitiesOk =
            selected.length > 0
                ? selected.every(a => p.amenities?.includes(a))
                : true;

        return categoryOk && cityOk && amenitiesOk;
    });

    const navigate = useNavigate();
    const isAuth = useSelector(s => s.auth.isAuth)
    const userEmail = useSelector(s => s.auth.user?.email);

  

    const position = [40.4093, 49.8671];
    return (
        <>
            <div className="filterpageContainer">
                <Outlet />

                <div className="title6">
                    <h1>Discover & Filter</h1>
                    <p>Explore Options – Filter by Category, Price, Rating</p>
                </div>
                <div className="flex">
                    <div className="filterPage_main">
                        <div className="filterContainer">
                            <div className="layout5">
                                <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>

                                <select name="city" value={city} onChange={e => setCity(e.target.value)}>
                                    <option value="">All Cities</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>

                                <select name="price" id="">
                                    <option value="">Price</option>
                                </select>
                                <div className="amenitiesSelect">
                                    <button className="selectBtn" onClick={() => setOpen(true)}>
                                        Amenities
                                        {selected.length > 0 && <span className="count">{selected.length}</span>}
                                    </button>

                                    {open && (
                                        <div className="amenitiesModal">
                                            <div className="modalHeader">
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    value={search}
                                                    onChange={e => setSearch(e.target.value)}
                                                />
                                                <button className="closeBtn" onClick={() => setOpen(false)}>✕</button>
                                            </div>

                                            <div className="amenitiesGrid">
                                                {filteredAmenities.map((a, i) => (
                                                    <label key={i} className="amenityItem">
                                                        <input
                                                            type="checkbox"
                                                            checked={selected.includes(a)}
                                                            onChange={() => toggleAmenity(a)}
                                                        />
                                                        <span>{a}</span>
                                                    </label>
                                                ))}
                                            </div>

                                            <div className="modalFooter">
                                                <button className="resetBtn" onClick={() => setSelected([])}>
                                                    Reset
                                                </button>
                                                <button className="applyBtn" onClick={() => setOpen(false)}>
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button className="rating-btn">
                                    <div className="rating7">
                                        <span className="dot filled"></span>
                                        <span className="dot filled"></span>
                                        <span className="dot filled"></span>
                                        <span className="dot filled"></span>
                                        <span className="dot"></span>
                                    </div>
                                    <p>& up</p>
                                </button>
                            </div>
                        </div>
                        <div className="places">
                            {filteredPlaces.length === 0 ? (
                                <p>No places found</p>
                            ) : (

                                filteredPlaces.map((place => (
                                    <button className="placeBtn" onClick={()=>navigate(`/detail/${place.id}`)}>
                                        <div key={place.id} className="placeCard">

                                            <div className="imagecontainer">
                                                <img className="placeImg" src={place.photos[0]} alt={place.title} />
                                            </div>
                                            <div className="aboutcontainer">
                                                <h3>{place.id}. {place.title}</h3>                                             <div className="rating8">
                                                    <p>{place.rating}</p>
                                                    {[...Array(Math.floor(place.rating))].map((_, i) => (
                                                        <span key={"f" + i} className="circle8 full"></span>
                                                    ))}
                                                    {place.rating % 1 >= 0.5 && <span className="circle8 half"></span>}
                                                    {[...Array(5 - Math.floor(place.rating) - (place.rating % 1 >= 0.5 ? 1 : 0))].map((_, i) => (
                                                        <span key={"e" + i} className="circle8 empty"></span>
                                                    ))}
                                                    <p id="review8">{`( ${place.reviewsCount} reviews8)`}</p>
                                                </div>
                                                <p>{place.description}</p>
                                                <p>working hours: {place.workingHours}</p>
                                                <p>{place.category}</p>
                                            </div>
                                        </div>
                                    </button>
                                )
                                ))
                            )}
                        </div>

                    </div>
                    <div className="mapContainer">
                        <MapContainer className="map" center={position} zoom={13}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            />
                            <Marker position={position}>
                                <Popup>Bakı!</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
};
export default FilterPage