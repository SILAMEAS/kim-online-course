import React from 'react';
import {useAppSelector} from "@/lib/redux/hooks.ts";
import {SORT} from "@/lib/enum.ts";

const useCustomTable = <T, >() => {
    const [sortBy, setSortBy] = React.useState<keyof T | undefined>();
    const [sortDirection, setSortDirection] = React.useState<'ASC' | 'DES'>('ASC');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
    const {currentUser} = useAppSelector(state => state.auth);
    const [filter, setFilter] = React.useState<{
        search: string,
        page: number,
        limit: number,
        sortBy: keyof T,
        sortOrder: SORT,
        maxPrice?: number,
        minPrice?: number,
        categoryId?: number,
        rating?: number,
        levelStatus?: "BEGINNER" | "INTERMEDIATE" | "ADVANCE"

    }>({
        search: "",
        limit: 10,
        sortBy: 'id' as any,
        page: 1,
        sortOrder: SORT.DESC
    });
    const handleAdd = () => {
        setSelectedItem(null);
        setOpen(true);
    };
    return {
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        page,
        setPage,
        limit,
        setLimit,
        open,
        setOpen,
        selectedItem,
        setSelectedItem,
        filter,
        setFilter,
        currentUser,
        handleAdd
    }
};

export default useCustomTable;