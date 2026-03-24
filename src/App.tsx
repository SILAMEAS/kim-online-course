import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import CoursesPage from "./pages/Courses";
import CourseDetailPage from "./pages/CourseDetail";
import AuthLayout from "./components/layout/AuthLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import CartPage from "./pages/Cart";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import MyCoursesPage from "./pages/dashboard/MyCourses";
import ProfilePage from "./pages/dashboard/Profile";
import WishlistPage from "./pages/dashboard/Wishlist";
import AdminCourse from "@/pages/dashboard/AdminCourse.tsx";
import AdminVideo from "@/pages/dashboard/AdminVideo.tsx";
import AdminControlLayout from "@/pages/dashboard/AdminControlLayout.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";

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

                <Route path="/dashboard" element={<DashboardLayout/>}>
                    <Route index element={<DashboardOverview/>}/>
                    <Route path="my-courses" element={<MyCoursesPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="wishlist" element={<WishlistPage/>}/>
                    <Route path="admin-control" element={<AdminControlLayout/>}>
                        <Route index element={<AdminCourse/>}/>
                        <Route path="manage-video" element={<AdminVideo/>}/>
                    </Route>
                </Route>
                {/* 🔥 Catch all route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
