import { useEffect, useState } from "react";
import Search from "../Search";
import { useDispatch, useSelector } from "react-redux";
import { allPlacesFetch, getSearchValue } from "../store/slices/placesSlice";
import { useNavigate } from "react-router-dom";


function SearchLayout() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("all");

    const { places, searchValue, } = useSelector((state) => state.placesState)

    useEffect(() => {
        dispatch(allPlacesFetch())
    }, [dispatch])

    const navigate=useNavigate()
    const config = {
        all: { title: "Where to?", placeholder: "Places to go, things to do, hotels..." },
        hotels: { title: "Stay somewhere great", placeholder: "Hotel name or destination" },
        things: { title: "Do something fun", placeholder: "Attraction,activity or destination" },
        restaurants: { title: "Find places to eat", placeholder: "Restaurant or destination", },
        cafe: { title: "Sip some tea", placeholder: "Search for cozy cafes" }
    };

    const filtered = places.filter((item) => {
        const textMatch =
            item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.address.toLowerCase().includes(searchValue.toLowerCase());
        const category = item.category.toLowerCase();
        const isCafeCategory = item.category.toLowerCase() === "cafe"
        const isHotelCategory = item.category.toLowerCase() === "hotel";
        const isRestaurantCategory = item.category.toLowerCase() === "restaurant"

        if (activeTab === "all") {
            return textMatch;
        }
        else if (activeTab === "hotels") {
            return isHotelCategory && textMatch;
        }
        else if (activeTab === "restaurants") {
            return isRestaurantCategory && textMatch
        }
        else if (activeTab === "things") {
            return ["museum", "attraction", "nature"].includes(category) && textMatch;
        }
        else if (activeTab === "cafe") {
            return isCafeCategory && textMatch
        }

    });
    console.log("places:", places);
    console.log("searchValue:", filtered);

    return (
        <main>
            <div className="main_container">
                <h1>{config[activeTab].title}</h1>
                <div className="buttons2">
                    <button onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
                        <img src="\public\images\home2-svgrepo-com.svg" alt="" /> Search All</button>
                    <button onClick={() => setActiveTab("hotels")} className={activeTab === "hotels" ? "active" : ""}>
                        <img src="\public\images\bed-svgrepo-com.svg" alt="" /> Hotels</button>
                    <button onClick={() => setActiveTab("things")} className={activeTab === "things" ? "active" : ""}>
                        <img src="\public\images\camera-svgrepo-com.svg" alt="" /> Things to Do</button>
                    <button onClick={() => setActiveTab("restaurants")} className={activeTab === "restaurants" ? "active" : ""}>
                        <img src="\public\images\restaurant-svgrepo-com.svg" alt="" /> Restaurants</button>
                    <button onClick={() => setActiveTab("cafe")} className={activeTab === "cafe" ? "active" : ""} ><img src="\public\images\coffee-cup-tea-svgrepo-com.svg" alt="" />  Cafes</button>
                </div>
            </div>
            <div className="search-wrapper">
                <img src="\public\images\magnifying-glass-svgrepo-com.svg" alt="" />
                <Search value={searchValue} onChange={(e) => dispatch(getSearchValue(e.target.value))} placeholder={config[activeTab].placeholder} />
                <button className="searchButton">Search</button>
                {searchValue.trim() !== "" && filtered.length > 0 && (
                    <ul className="suggestions">
                        <li className="nearby-item">
                            <button
                                className="filter-button" onClick={() => navigate("/filter", { state: { activeTab } })}><img src="\images\map-pin-svgrepo-com.svg" />Filter </button>
                        </li>
                        {filtered.map((item) => (
                            <li key={item.id}>
                                <div className="items">
                                    <img src={item.photos[0]} alt="" />
                                    <div>
                                        <button onClick={() => navigate(("/detail/" + item.id))} >{item.title}</button>
                                        <p>{item.address}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}
export default SearchLayout