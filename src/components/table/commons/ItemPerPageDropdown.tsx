import {IPaginationCustomTable} from "@/components/table/CustomTable.tsx";

export const ItemPerPageDropdown = ({pagination, onLimitChange}: {
    pagination: IPaginationCustomTable,
    onLimitChange?: (limit: number) => void;
}) => {
    return <div className="flex items-center gap-2 text-sm">
        <span>Items per page:</span>
        <select
            className="border rounded px-2 py-1 text-sm focus:outline-none"
            value={pagination.limit}
            onChange={(e) => onLimitChange?.(+e.target.value)}
        >
            {[10, 20, 30].map((size) => (
                <option key={size} value={size}>
                    {size}
                </option>
            ))}
        </select>
    </div>
}