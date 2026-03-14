import { SORT } from "./enum";
import { PaginationRequest } from "./request";
export interface IProfileResponse {
    id:         number;
    profile?:    string;
    profileImage?: string;
    fullName:   string;
    email:      string;
    role:       string;
    bio?:       string;
    createdAt : string;
    updatedAt : string;
    orders:number;
}


/** Pagination  */

export interface IPagination<T> {
    contents: T[];
    page: number;
    pageSize?: number;
    totalPages?: number;
    total?: number;
    hasNext?: boolean;
    totalInvalid?: number;
}



export const PaginationRequestDefault:PaginationRequest={
    pageSize :10,
    sortBy:"id",
    pageNo:1,
    sortOrder: SORT.DESC
}

export interface PaginationRequestWithIngoreCase {
    params?: PaginationRequest;
    caseIgnoreFilter?: boolean;
    restaurantId?: number;
}
export interface IResponseQuery<T>{
    currentData?:IPagination<T>,
    isLoading:boolean,
    data?:T,
    isError:boolean,
    isFetching:boolean,
    isSuccess:boolean
}


export interface RestaurantResponse {
    id: number
    name: string
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;

}