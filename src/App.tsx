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
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import AdminLayout from "@/components/layout/AdminLayout.tsx";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage.tsx";
import AdminUsersPage from "@/pages/admin/users/AdminUsersPage.tsx";
import AdminCoursesPage from "@/pages/admin/courses/AdminCoursesPage.tsx";
import AdminVideosPage from "@/pages/admin/videos/AdminVideosPage.tsx";
import AdminPaymentsPage from "@/pages/admin/payments/AdminPaymentsPage.tsx";
import AdminEnrollmentsPage from "@/pages/admin/enrollments/AdminEnrollmentsPage.tsx";
import AdminImagesPage from "@/pages/admin/images/AdminImagesPage.tsx";

function App() {
    return (
        <Router>
            <Routes>

                {/** PUBLIC ROUTES */}
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

                {/** STUDENT ROUTES */}
                <Route path="/dashboard" element={<StudentLayout/>}>
                    <Route index element={<DashboardOverview/>}/>
                    <Route path="my-courses" element={<MyCoursesPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="wishlist" element={<WishlistPage/>}/>
                </Route>

                {/** ADMIN TEACHER ROUTES */}
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<AdminDashboardPage/>}/>
                    <Route path="users" element={<AdminUsersPage/>}/>
                    <Route path="courses" element={<AdminCoursesPage/>}/>
                    <Route path="videos" element={<AdminVideosPage/>}/>
                    <Route path="payments" element={<AdminPaymentsPage/>}/>
                    <Route path="enrollments" element={<AdminEnrollmentsPage/>}/>
                    <Route path="images" element={<AdminImagesPage/>}/>
                </Route>

                {/** All routes */}
                <Route path="*" element={<NotFoundPage/>}/>

            </Routes>
        </Router>
    );
}

export default App;
