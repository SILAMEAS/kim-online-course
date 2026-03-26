import {IPaginationCustomTable} from "@/components/table/CustomTable.tsx";

export const PageInfo = ({pagination}: { pagination: IPaginationCustomTable }) => {
    return <div className="text-sm text-gray-600">
        Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
    </div>
}