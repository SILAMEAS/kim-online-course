import {useEffect} from 'react';
import {useAppDispatch} from "@/lib/redux/hooks.ts";
import Cookies from "js-cookie";
import {UserResponse} from "@/lib/types.ts";
import {loginSuccess} from "@/lib/redux/slices/auth.slice.ts";
import {useGetUserByJwtTokenQuery} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";

const useRestoreUserByToken = () => {
    const dispatch = useAppDispatch();
    const {currentData, isLoading, isFetching, isError, error} = useGetUserByJwtTokenQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true
    });
    const token = Cookies.get("token");
    console.log("useRestoreUserByToken", token)

    useEffect(() => {
        // Fetch user immediately
        if (currentData) {
            const mockUser: UserResponse = {
                firstName: currentData.firstName,
                lastName: currentData.lastName,
                id: currentData.id.toString(),
                email: currentData.email,
                name: `${currentData.firstName} ${currentData.lastName}`,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentData.email}`,
                bio: "Passionate learner",
                enrolled_courses: [],
                role: currentData.role as EnumRole,
                certificates: [],
                created_at: new Date().toString()
            };

            dispatch(loginSuccess(mockUser));
        }
    }, [currentData]);
    return {currentData, isLoading, isFetching, isError, error}
};

export default useRestoreUserByToken;