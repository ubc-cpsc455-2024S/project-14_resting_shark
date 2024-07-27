// BackgroundUpdater.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";

const BackgroundUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.body.style.backgroundColor = "#F8F9FB";
        break;
      default:
        document.body.style.backgroundColor = "white";
    }
  }, [location]);

  return null;
};

export default BackgroundUpdater;
