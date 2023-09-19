import { Link } from "react-router-dom";

import Logo from "../../../assets/imgs/logo.png";

import "./header.scss";

export default function Header() {
    return (
        <div className="header-wp">
            <div className="container">
                <div className="row">
                    <div className="col-4 left-header">
                        <img src={Logo} alt="Hình ảnh trang chủ" />
                    </div>
                    <div className="col-8 right-header">
                        <ul>
                            <li>
                                <Link to="/tuyen-sinh">Tuyển Sinh</Link>
                            </li>
                            <li>
                                <Link to="/login">Đăng Nhập</Link>
                            </li>
                            <li className="search-header">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm bài viết có liên quan..."
                                />
                                <button>
                                    <i className="bi bi-search"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
