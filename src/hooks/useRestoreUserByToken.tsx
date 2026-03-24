import {useEffect} from 'react';
import {useAppDispatch} from "@/lib/redux/hooks.ts";
import {useMeQuery} from "@/lib/api/apiSlice.ts";
import Cookies from "js-cookie";
import {UserResponse} from "@/lib/types.ts";
import {loginSuccess} from "@/lib/redux/slices/auth.slice.ts";

const useRestoreUserByToken = () => {
    const dispatch = useAppDispatch();
    const {currentData, isLoading, isFetching, isError, error} = useMeQuery(undefined, {
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
                role: currentData.role,
                certificates: [],
                created_at: new Date().toString()
            };

            dispatch(loginSuccess(mockUser));
        }
    }, [currentData]);
    return {currentData, isLoading, isFetching, isError, error}
};

export default useRestoreUserByToken;