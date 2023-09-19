// Object.freeze dùng để đóng băng đối tượng
export const router = Object.freeze({
    home: "/",
    detailPost: "/blog/:slug",
    ungTuyen: "/ung-tuyen",
    admin: {
        login: "/admin/login",
        dashboard: "/admin/dashboard",
        editPost: "/admin/editPost/:slug",
        allPost: "/admin/allPost",
        ungTuyen: "/admin/ung-tuyen",
    },
});
