import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import SideBar from "./components/sideBar/SideBar";
import { router } from "../../utils/constant";
import HomeDashBoard from "./components/HomeDashBoard/HomeDashBoard";
import AllPost from "./components/AllPost/AllPost";
import "./dashboard.scss";
import PostHandle from "./components/PostHandle/PostHandle";

export default function DashBoard() {
    const isLoginIn = JSON.parse(localStorage.getItem("isLoginIn"));

    useEffect(() => {
        if (!isLoginIn) {
            window.location.href = "/";
        }
    }, [isLoginIn]);

    return (
        <div className="dashboard-wp">
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <SideBar />
                    </div>
                    <div className="col py-3">
                        <Routes>
                            <Route
                                path={router.admin.dashboard}
                                element={<HomeDashBoard />}
                            />
                            <Route
                                path={router.admin.allPost}
                                element={<AllPost />}
                            />
                            <Route
                                path={router.admin.handlePost}
                                element={<PostHandle />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}
