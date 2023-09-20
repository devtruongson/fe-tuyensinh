import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useRef, useState } from "react";

import axios from "../../../../axios";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function PostHandle() {
    const [filePost, setFilePost] = useState(null);
    const [title, setTitle] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [type, setType] = useState("");
    const [cateBlog, setCateBlog] = useState(null);
    const [thumbnail, setThumbnail] = useState("");

    const ref = useRef(null);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await axios.get(
                    "/api/v1/get-all-code-by-type?type=bl"
                );

                if (res && res.errCode === 0) {
                    setCateBlog(res.data);
                } else {
                    alert(res.msg);
                }
            } catch (err) {
                console.log(err);
            }
        };

        _fetch();
    }, []);

    const onImageUpload = async (file) => {
        const ResImage = await axios.post(
            "/api/v1/upload-file",
            {
                filesUploaded: file,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return Promise.resolve(
            `http://localhost:8080/files/${ResImage.file?.filename}`
        );
    };

    const handleChangeUploadFilePost = async (e) => {
        const file = e.target.files[0];

        const ResFile = await axios.post(
            "/api/v1/upload-file",
            {
                filesUploaded: file,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (ResFile && ResFile.errCode === 0) {
            setFilePost(ResFile?.file?.filename);
        } else {
            alert(ResFile.msg);
        }
    };

    const handleClickThumbnail = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const handleUploadThumbnail = async (e) => {
        const file = e.target.files[0];

        const ResImage = await axios.post(
            "/api/v1/upload-file",
            {
                filesUploaded: file,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (ResImage && ResImage.errCode === 0) {
            setThumbnail(ResImage.file.filename);
        } else {
            alert(ResImage.msg);
        }
    };

    const validate = () => {
        let arr = [title, contentHTML, contentMarkdown, type, thumbnail];

        let IsValid = true;

        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                IsValid = false;
                break;
            }
        }

        return IsValid;
    };

    const handleChangeEditor = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleResetState = () => {
        setFilePost(null);
        setTitle("");
        setContentHTML("");
        setContentMarkdown("");
        setType("");
        setThumbnail("");
    };

    const handleSubmitData = async () => {
        const checkValid = validate();

        if (!checkValid) {
            alert("Bạn Vui Lòng Nhập Đầy Đủ Các Trường!");
            return;
        }

        const dataBuild = {
            thumbnail,
            title,
            file: filePost,
            contentHTML,
            contentMarkdown,
            type,
        };

        const res = await axios.post("/api/v1/create-blog", dataBuild);

        if (res && res.errCode === 0) {
            alert("Đã tạo bài viết thành công!");
            handleResetState();
        } else {
            alert(res.msg);
        }
    };

    return (
        <div className="handle-post-wp">
            <h2 className="text-center py-4">Tạo Bài Viết Của Bạn</h2>
            <div>
                <div className="nav-post">
                    <input
                        ref={ref}
                        onChange={handleUploadThumbnail}
                        type="file"
                        hidden
                    />
                    <div
                        onClick={handleClickThumbnail}
                        className="thumbnail"
                        style={{
                            backgroundImage: `url(${
                                thumbnail
                                    ? `http://localhost:8080/files/${thumbnail}`
                                    : "https://gaixinhbikini.com/wp-content/uploads/2022/10/anh-cua-cuc-tinh-y.jpg"
                            })`,
                        }}
                    >
                        <span>+ Thêm Ảnh Bài Viết</span>
                    </div>
                    <div className="row pb-3">
                        <div className="col-6">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control"
                                placeholder="Nhập tên bài viết của bạn..."
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="file"
                                className="form-control"
                                placeholder="File Upload"
                                onChange={handleChangeUploadFilePost}
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <select
                                className="form-control"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="null">Chọn loại bài viết</option>
                                {cateBlog &&
                                    cateBlog.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {item.title}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </div>
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onImageUpload={onImageUpload}
                    onChange={handleChangeEditor}
                />
                <div className="mt-4 d-flex justify-content-end">
                    <button
                        onClick={handleSubmitData}
                        className="btn btn-primary"
                    >
                        Tạo Bài Viết
                    </button>
                </div>
            </div>
        </div>
    );
}
