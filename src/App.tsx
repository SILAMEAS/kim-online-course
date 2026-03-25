import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import CoursesPage from "./pages/Courses";
import CourseDetailPage from "./pages/details/CourseDetail.tsx";
import AuthLayout from "./components/layout/AuthLayout";
import LoginPage from "@/components/form/Login.tsx";
import RegisterPage from "@/components/form/Register.tsx";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import CartPage from "./pages/Cart";
import StudentLayout from "./components/layout/StudentLayout.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import MyCoursesPage from "./pages/dashboard/MyCourses";
import ProfilePage from "./pages/dashboard/Profile";
import WishlistPage from "./pages/dashboard/Wishlist";
import AdminCourse from "@/pages/admin/AdminCourse.tsx";
import AdminVideo from "@/pages/admin/AdminVideo.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import AdminLayout from "@/components/layout/AdminLayout.tsx";
import AdminDashboardOverview from "@/pages/admin/AdminDashboardOverview.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/courses/:id" element={<CourseDetailPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Route>

                <Route path="/dashboard" element={<StudentLayout/>}>
                    <Route index element={<DashboardOverview/>}/>
                    <Route path="my-courses" element={<MyCoursesPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="wishlist" element={<WishlistPage/>}/>
                    <Route path="admin/course" element={<AdminCourse/>}/>
                    <Route path="admin/video" element={<AdminVideo/>}/>
                </Route>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<AdminDashboardOverview/>}/>
                    <Route path="course" element={<AdminCourse/>}/>
                    <Route path="video" element={<AdminVideo/>}/>
                </Route>
                {/* 🔥 Catch all route */}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
