import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ProfileMenu} from "@/components/auth/profile-menu.tsx";
import {useEffect} from "react";
import {EnumRole} from "@/lib/enum.ts";
import useRestoreUserByToken from "@/hooks/useRestoreUserByToken.tsx";
import ThemeLanguage from "@/components/ThemeLanguage.tsx";
import Cookies from "js-cookie";
import {Sidebar} from "@/components/Sidebar.tsx";


export default function AdminLayout() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {currentData: currentUser, isLoading} = useRestoreUserByToken();
    const accessToken = Cookies.get("accessToken");
    useEffect(() => {
        // if not logged in
        if (!accessToken) {
            navigate("/", {replace: true});

        }
        // wait until auth is resolved
        if (!currentUser) return;

        //  not admin
        if (currentUser && currentUser?.role != EnumRole.ADMIN) {
            navigate("/", {replace: true});
        }
    }, [currentUser, navigate, accessToken]);
    if (isLoading) return <>loading ...</>
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar pathname={pathname}/>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className={'flex flex-grow flex-row justify-self-end mr-4 mt-4'}>
                    <ThemeLanguage className={"w-[100px]"}/>
                    <ProfileMenu/>
                </div>
                <div className="p-8">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
