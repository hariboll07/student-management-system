import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import StudentDetails from "./pages/StudentDetails";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e9f0e9]">
        {/* Main content */}
        <div>
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm}/>} />
            <Route path="/students/:id" element={<StudentDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
