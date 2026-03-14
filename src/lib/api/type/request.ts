import { SORT } from "./enum";

export interface PaginationRequest{

    search?:string;
    filterBy?:string;

    pageSize:number;
    sortBy:string;
    pageNo:number;
    sortOrder:SORT;

    price?:number;
    minPrice?:number;  // new field
    maxPrice?:number;  // new field

    foodType?:string;
}