import {useEffect} from "react";
import {useAppSelector} from "@/lib/redux/hooks.ts";
import {useNavigate} from "react-router-dom";
import {EnumRole} from "@/lib/enum.ts";
import CustomLayout from "@/components/layout/CustomLayout.tsx";

export default function AdminLayout() {
    const {currentUser} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) return; // ⛔ wait for data

        if (currentUser.role !== EnumRole.ADMIN) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    return (
        <CustomLayout>AdminLayout</CustomLayout>
    );
}