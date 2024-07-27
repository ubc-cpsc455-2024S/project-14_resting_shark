import "./LoadingScreen.css";
import * as React from "react";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default LoadingScreen;
