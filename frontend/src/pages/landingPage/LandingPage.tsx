import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; 

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="left-info-panel">
          <h1>StudySwan</h1>
          <p>
            Join our learning platform to access interactive lessons and customized for your needs and interests!
          </p>
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
