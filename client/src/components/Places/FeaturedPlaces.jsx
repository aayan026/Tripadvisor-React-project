import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { featuredFetch } from "../store/slices/placesSlice"
import FeaturedPlacesItem from "./FeaturedPlacesItem"

function FeaturedPlaces() {

    const listRef = useRef(null); 
    const scrollRight = () => {
        listRef.current.scrollBy({ left: 500, behavior: "smooth" });
    };

    const scrollLeft = () => {
        listRef.current.scrollBy({ left: -500, behavior: "smooth" });
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(featuredFetch())
    }, [dispatch])
    const { featured, loading, error } = useSelector(state => state.placesState)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    if (!featured || featured.length === 0) {
        return null; 
    }

    return (
        <div className="featuredPlacesList">
            <h2>Featured Places</h2>

            <div className="slider-wrapper">
                <button className="nav left" onClick={scrollLeft}>‹</button>

                <ul className="featured-row" ref={listRef}>
                    {featured.map(place => (
                        <FeaturedPlacesItem key={place.id} place={place} />
                    ))}
                </ul>
                <button className="nav right" onClick={scrollRight}>›</button>
            </div>
        </div>
    );
};
export default FeaturedPlaces