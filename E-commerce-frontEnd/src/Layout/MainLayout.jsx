import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar"; // Import your NavBar component
import Footer from "../components/Footer"; // Import your Footer component

const MainLayout = () => {
    return (
        <div>
            <NavBar /> {/* Always displayed at the top */}
            <div className="container mt-4">
                <Outlet /> {/* Dynamic rendering of child components */}
            </div>
            <Footer /> {/* Always displayed at the bottom */}
        </div>
    );
};

export default MainLayout;
