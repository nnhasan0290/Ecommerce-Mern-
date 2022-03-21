import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div id="footer">
      <div className="left-footer">
        <h3>download our app</h3>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="Google play" />
        <img src={appStore} alt="app store" />
      </div>
      <div className="mid-footer">
        <h2>ecommerce</h2>
        <p>High quality is out first priority </p>
        <p>copyrights 2021 &copy; meNazmulHasan</p>
      </div>
      <div className="right-footer">
        <h4>Follow us</h4>
        <a href="#">Instagram</a>
        <a href="#">YouTube</a>
        <a href="#">Facebook</a>
      </div>
    </div>
  );
};

export default Footer;
