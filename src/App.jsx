import { Route, Routes } from "react-router-dom";

import { router } from "./utils/constant";
import Home from "./page/home/home";
import "./style/globalStyles.scss";
import Header from "./page/components/Header/header";
import Footer from "./page/components/Footer/Footer";
import Login from "./page/auth/Login";
import DashBoard from "./page/DashBoard/DashBoard";
import Blog from "./page/Blog/Blog";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route element={<Home />} path={router.home} />
                <Route element={<Login />} path={router.admin.login} />
                <Route element={<DashBoard />} path={router.admin.all} />
                <Route element={<Blog />} path={router.blog} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
