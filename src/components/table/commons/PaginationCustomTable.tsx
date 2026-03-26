import {PageInfo} from "@/components/table/commons/PageInfo.tsx";
import {ItemPerPageDropdown} from "@/components/table/commons/ItemPerPageDropdown.tsx";
import {PaginationButton} from "@/components/table/commons/PaginationButton.tsx";
import {IPaginationCustomTable} from "@/components/table/CustomTable.tsx";

const PaginationCustomTable = ({pagination, onPageChange, onLimitChange}: {
    pagination: IPaginationCustomTable,
    onPageChange?: (page: number) => void;
    onLimitChange?: (limit: number) => void;
}) => {
    return <div className="flex items-center justify-between mt-4 px-2 py-1  rounded-md">
        {/* Page Info */}
        <PageInfo pagination={pagination}/>

        {/* Pagination Buttons */}
        <PaginationButton pagination={pagination} onPageChange={onPageChange}/>

        {/* Items Per Page Dropdown */}
        <ItemPerPageDropdown pagination={pagination} onLimitChange={onLimitChange}/>
    </div>
};

export default PaginationCustomTable;