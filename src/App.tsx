import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


// Lazy load pages for better code splitting
const Home = lazy(() => import("./pages/Home"));
const CoursesPage = lazy(() => import("./pages/Courses"));
const CourseDetailPage = lazy(() => import("./pages/details/CourseDetail"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const CartPage = lazy(() => import("./pages/Cart"));

// Lazy load auth pages
const LoginPage = lazy(() => import("./components/form/Login"));
const RegisterPage = lazy(() => import("./components/form/Register"));
const AuthLayout = lazy(() => import("./components/layout/AuthLayout"));

// Lazy load student dashboard pages
const StudentLayout = lazy(() => import("./components/layout/StudentLayout"));
const DashboardOverview = lazy(() => import("./pages/dashboard/DashboardOverview"));
const MyCoursesPage = lazy(() => import("./pages/dashboard/MyCourses"));
const ProfilePage = lazy(() => import("./pages/dashboard/Profile"));
const WishlistPage = lazy(() => import("./pages/dashboard/Wishlist"));
const AdminCategoriesPage = lazy(() => import("@/pages/admin/categories/AdminCategoriesPage.tsx"));

// Lazy load admin pages
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/users/AdminUsersPage"));
const AdminCoursesPage = lazy(() => import("./pages/admin/courses/AdminCoursesPage"));
const AdminVideosPage = lazy(() => import("./pages/admin/videos/AdminVideosPage"));
const AdminPaymentsPage = lazy(() => import("./pages/admin/payments/AdminPaymentsPage"));
const AdminEnrollmentsPage = lazy(() => import("./pages/admin/enrollments/AdminEnrollmentsPage"));
const AdminImagesPage = lazy(() => import("./pages/admin/images/AdminImagesPage"));

// Lazy load not found page
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Loading fallback component
function LoadingFallback() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Suspense fallback={<LoadingFallback/>}>
                <Routes>
                    {/** PUBLIC ROUTES */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/courses" element={<CoursesPage/>}/>
                    <Route path="/courses/:id" element={<CourseDetailPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route
                        element={
                            <Suspense fallback={<LoadingFallback/>}>
                                <AuthLayout/>
                            </Suspense>
                        }
                    >
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </Route>

                    {/** STUDENT ROUTES */}
                    <Route
                        path="/dashboard"
                        element={
                            <Suspense fallback={<LoadingFallback/>}>
                                <StudentLayout/>
                            </Suspense>
                        }
                    >
                        <Route index element={<DashboardOverview/>}/>
                        <Route path="my-courses" element={<MyCoursesPage/>}/>
                        <Route path="profile" element={<ProfilePage/>}/>
                        <Route path="wishlist" element={<WishlistPage/>}/>
                    </Route>

                    {/** ADMIN TEACHER ROUTES */}
                    <Route
                        path="/admin"
                        element={
                            <Suspense fallback={<LoadingFallback/>}>
                                <AdminLayout/>
                            </Suspense>
                        }
                    >
                        <Route index element={<AdminDashboardPage/>}/>
                        <Route path="users" element={<AdminUsersPage/>}/>
                        <Route path="courses" element={<AdminCoursesPage/>}/>
                        <Route path="videos" element={<AdminVideosPage/>}/>
                        <Route path="payments" element={<AdminPaymentsPage/>}/>
                        <Route path="enrollments" element={<AdminEnrollmentsPage/>}/>
                        <Route path="images" element={<AdminImagesPage/>}/>
                        <Route path="categories" element={<AdminCategoriesPage/>}/>
                    </Route>

                    {/** Fallback route */}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;