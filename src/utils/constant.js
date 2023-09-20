// Object.freeze dùng để đóng băng đối tượng
export const router = Object.freeze({
    home: "/",
    detailPost: "/blog/:slug",
    ungTuyen: "/ung-tuyen",
    admin: {
        all: "/admin/*",
        login: "/admin/login",
        dashboard: "/dashboard",
        editPost: "/editPost/:slug",
        handlePost: "/handle-post",
        allPost: "/allPost",
        ungTuyen: "/ung-tuyen",
    },
});
