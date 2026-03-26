import React from 'react';

const useCustomTable = <T, >() => {
    const [sortBy, setSortBy] = React.useState<keyof T | undefined>();
    const [sortDirection, setSortDirection] = React.useState<'ASC' | 'DES'>('ASC');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    return {sortBy, setSortBy, sortDirection, setSortDirection, page, setPage, limit, setLimit}
};

export default useCustomTable;