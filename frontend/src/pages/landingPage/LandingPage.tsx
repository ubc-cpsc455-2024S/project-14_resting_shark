import { useNavigate } from 'react-router-dom';
import mangoose from '../../assets/mangoose.png';
import "./LandingPage.css";



export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="left-info-panel">
      <h1 className="header-with-logo">
          mangoose
          <div className="logo-container">
            <img src={mangoose} alt="logosmall" className="logosmall" />
          </div>
        </h1>
        <div className= "blurb">
        <h2> Unlock the power of personalized learning with mangoose, your ultimate study companion. </h2>
          <p>mangoose allows you to transform your educational materials into interactive lessons tailored just for you! Dive into a variety of questions to reinforce your knowledge and understanding. </p>
      </div>
      </div>
      <div className="right-options-panel">
        <div className="right-content">
          <h1>Get Started</h1>
          <div className="button-group">
            <button className="option-button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="option-button" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
