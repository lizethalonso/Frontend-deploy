
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative w-screen ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
