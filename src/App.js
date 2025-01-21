import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="">
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
