import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="left-info-panel">
        <h1>StudySwan</h1>
        <div className= "blurb">
        <h2> Unlock the power of personalized learning with StudySwan, your ultimate study companion. </h2>
          <p>StudySwan allows you to transform your educational materials into interactive lessons tailored just for you! Dive into a variety of question formats such as true/false, fill in the blanks, multiple choice, and long answer questions to reinforce your understanding and knowledge. </p>
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
