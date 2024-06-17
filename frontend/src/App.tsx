import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Lesson from "./pages/Lesson";
import PageNotFound from "./pages/PageNotFound";
import Test from "./api/mock/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/lesson/:lessonId"
          element={<Lesson />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
