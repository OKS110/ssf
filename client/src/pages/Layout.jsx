import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";


export default function Layout() {
return (
    <div>
        <Header>

        </Header>

        <Outlet>

        </Outlet>

        <Footer>

        </Footer>
    </div>
    );
};