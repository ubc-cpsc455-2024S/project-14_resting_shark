import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Lesson from "./pages/Lesson";
import PageNotFound from "./pages/PageNotFound";
import Test from "./api/mock/Test";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import BackgroundUpdater from "./context/BackgroundUpdater";

function App() {
  return (
    <Router>
      <BackgroundUpdater />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/test" element={<Test />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
