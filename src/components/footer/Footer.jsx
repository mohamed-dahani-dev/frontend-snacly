import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content ">
        <div className="footer-content-left">
          <h1>Snackly</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
            enim eius suscipit itaque labore unde excepturi quibusdam sapiente
            pariatur inventore, voluptatem exercitationem! Dolorum praesentium
            asperiores, possimus eveniet qui velit maxime incidunt, repellat,
            quasi iure accusantium. Illum alias consequuntur cumque maxime porro
            quasi, voluptatem amet ab, necessitatibus labore suscipit
          </p>
          <div className="footer-social-icons">
            <div>
              <span className="icon-facebook-square"></span>
            </div>
            <div>
              <span className="icon-instagram"></span>
            </div>
            <div>
              <span className="icon-x"></span>
            </div>
            <div>
              <span className="icon-linkedin-square"></span>
            </div>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+212 634847173</li>
            <li>contact@company.com</li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">
        Copyright 2024 © Mohamed Dahani - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
