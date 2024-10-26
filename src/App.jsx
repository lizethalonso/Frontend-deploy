import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/administracion" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
