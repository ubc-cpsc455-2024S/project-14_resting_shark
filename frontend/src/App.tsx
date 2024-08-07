import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Lesson from "./pages/lesson/Lesson";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import RegisterLogin from "./pages/Auth/RegisterLogin";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import BackgroundUpdater from "./context/BackgroundUpdater";
import LandingPage from "./pages/landingPage/LandingPage";
import * as React from "react";
import FinishedLesson from "./pages/FinishedLesson/FinishedLesson";

function App() {
  return (
    <div className="app-container">
      <Router>
        <BackgroundUpdater />
        <Routes>
          <Route path="login" element={<RegisterLogin />} />
          <Route path="register" element={<RegisterLogin />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/finished" element={<FinishedLesson />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lesson/:lessonId" element={<Lesson />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
