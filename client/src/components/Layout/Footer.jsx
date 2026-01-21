import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <h2>TripAdvisor</h2>
          <p>
            Discover places to stay, eat, and explore — reviewed by real travelers.
            Join millions of travelers sharing reviews, photos, and tips worldwide.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>About</h4>
            <a href="#">About us</a>
            <a href="#">Careers</a>
            <a href="#">Trust & Safety</a>
            <a href="#">Press Center</a>
            <a href="#">Contact</a>
          </div>

          <div>
            <h4>Explore</h4>
            <a href="#">Hotels</a>
            <a href="#">Restaurants</a>
            <a href="#">Things to do</a>
            <a href="#">Flights</a>
            <a href="#">Vacation Rentals</a>
          </div>

          <div>
            <h4>Business</h4>
            <a href="#">Owners</a>
            <a href="#">Advertise</a>
            <a href="#">Business Advantage</a>
            <a href="#">Partnerships</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">FAQs</a>
            <a href="#">Cancellation Options</a>
            <a href="#">Safety</a>
            <a href="#">Accessibility</a>
          </div>

          <div>
            <h4>Community</h4>
            <a href="#">Forums</a>
            <a href="#">Events</a>
            <a href="#">Travelers' Choice</a>
            <a href="#">Blog</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 TripAdvisor Clone</span>
        <span>Made with ❤️ by Ayan</span>
      </div>
    </footer>
  );
}

export default Footer;
