// Object.freeze dùng để đóng băng đối tượng
export const router = Object.freeze({
    home: "/",
    detailPost: "/blog/:slug",
    ungTuyen: "/ung-tuyen",
    blog: "/blog/:slug",
    admin: {
        all: "/admin/*",
        login: "/admin/login",
        dashboard: "/dashboard",
        handlePost: "/handle-post",
        allPost: "/allPost",
        ungTuyen: "/ung-tuyen",
    },
});
