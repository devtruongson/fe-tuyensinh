import { Route, Routes } from "react-router-dom";

import { router } from "./utils/constant";
import Home from "./page/home/home";
import "./style/globalStyles.scss";
import Header from "./page/components/Header/header";
import Footer from "./page/components/Footer/Footer";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route element={<Home />} path={router.home} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
