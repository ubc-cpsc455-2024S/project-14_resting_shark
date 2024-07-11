import { useNavigate } from 'react-router-dom';
import mangoose from '../../assets/mangoose.png';
import s from "./LandingPage.module.css";



export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <div className={s.leftPanel}>
      <h1 className={s.headerLogo}>
          mangoose
          <div className={s.logoContainer}>
            <img src={mangoose} alt="logosmall" className={s.logoSmall} />
          </div>
        </h1>
        <div className= {s.blurb}>
        <h2> Unlock the power of personalized learning with mangoose, your ultimate study companion. </h2>
          <p>mangoose allows you to transform your educational materials into interactive lessons tailored just for you! Dive into a variety of questions to reinforce your knowledge and understanding. </p>
      </div>
      </div>
      <div className={s.rightPanel}>
        <div className={s.rightContent}>
          <h1>Get Started</h1>
          <div className={s.buttonGroup}>
            <button className={s.optionButton} onClick={() => navigate("/login")}>
              Login
            </button>
            <button className={s.optionButton} onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
