import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Lesson from "./pages/Lesson";
import { AstronomyLesson } from "./api/mock/astronomy";
import PageNotFound from "./pages/PageNotFound";
import Test from "./api/mock/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/lesson"
          element={<Lesson contentList={AstronomyLesson} />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
