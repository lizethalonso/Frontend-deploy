import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import ContextProvider from './utils/global.context';
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  return (

    <div className="App">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
