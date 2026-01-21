import { Outlet } from "react-router-dom"
import Header from "../Layout/Header"
import FeaturedPlaces from "../Places/FeaturedPlaces"
import Footer from "../Layout/Footer"
import "../../styles/MainPage.css";

function MainPage() {

    return (
        <>
            <div className="mainContainer">
                <Header />
                <main>
                    <Outlet />
                    <div className="rewards">
                        <img src="\public\images\Screenshot 2026-01-09 200553.png" alt="" />
                    </div>
                    <FeaturedPlaces />
                    <section className="donate-wrapper">
                        <div className="donate-left">
                            <img src="/images/caption.jpg" alt="Kiva donation" />
                        </div>

                        <div className="donate-right">
                            <div className="donate-brand">
                                <span className="brand-icon"><img src="\images\logo.svg" alt="" /></span>
                                <span className="brand-text">Tripadvisor Foundation</span>
                            </div>

                            <h2 className="donate-title">
                                Show some love to small businesses
                            </h2>

                            <p className="donate-text">
                                Donate to Kiva.org today to provide loans to local entrepreneurs
                                and the Tripadvisor Foundation will match it, up to $150,000 USD
                                collectively. Terms apply.
                            </p>

                            <button className="donate-button">Donate now</button>
                        </div>
                    </section>

                </main>
            </div>
            <Footer />

        </>
    )
}
export default MainPage