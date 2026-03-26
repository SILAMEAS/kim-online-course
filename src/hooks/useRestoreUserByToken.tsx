import {useEffect} from "react";
import {useAppDispatch} from "@/lib/redux/hooks.ts";
import Cookies from "js-cookie";
import {UserResponse} from "@/lib/types.ts";
import {loginSuccess} from "@/lib/redux/slices/auth.slice.ts";
import {useGetUserByJwtTokenQuery} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";

const useRestoreUserByToken = () => {
    const dispatch = useAppDispatch();
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const {
        currentData,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetUserByJwtTokenQuery(undefined, {
        skip: !accessToken&&!refreshToken,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    });

    // ✅ Refetch only when needed
    useEffect(() => {
        if (accessToken && !currentData && refreshToken) {
            refetch();
        }
    }, [accessToken, currentData, refreshToken]);

    // ✅ Sync Redux only when data arrives
    useEffect(() => {
        if (currentData) {
            const user: UserResponse = {
                firstName: currentData.firstName,
                lastName: currentData.lastName,
                id: currentData.id.toString(),
                email: currentData.email,
                name: `${currentData.firstName} ${currentData.lastName}`,
                avatar: currentData?.imageUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentData.email}`,
                bio: "Passionate learner",
                enrolled_courses: [],
                role: currentData.role as EnumRole,
                certificates: [],
                created_at: new Date().toString(),
            };

            dispatch(loginSuccess(user));
        }
    }, [currentData, dispatch]);

    return {currentData, isLoading, isFetching, isError, error};
};

export default useRestoreUserByToken;