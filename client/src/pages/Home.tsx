import Header from "../admin/layout/Header";
import {Outlet} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Header />
            <main className="main-container">
                <div className="flex gap-3">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Home;
