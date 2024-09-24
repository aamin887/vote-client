import "./footer.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__container-content">
          <div className="footer__content-section logo">
            <h2>
              <img src={logo} />
            </h2>
            <small>The best way to conduct election secure without bias.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
