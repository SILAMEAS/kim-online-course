import React from 'react';
import {useAppSelector} from "@/lib/redux/hooks.ts";

const useCustomTable = <T, >() => {
    const [sortBy, setSortBy] = React.useState<keyof T | undefined>();
    const [sortDirection, setSortDirection] = React.useState<'ASC' | 'DES'>('ASC');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
    const {currentUser} = useAppSelector(state => state.auth)
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
        // filter,
        // setFilter,
        currentUser
    }
};

export default useCustomTable;