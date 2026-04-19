import {IPaginationCustomTable} from "@/components/table/CustomTable.tsx";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";

export const ItemPerPageDropdown = ({pagination, onLimitChange}: {
    pagination: IPaginationCustomTable,
    onLimitChange?: (limit: number) => void;
}) => {
    const {t} = useTranslation();
    return <div className="flex items-center gap-2 text-sm">
        <span className={'hidden md:block'}>
            {t(Localization("pagination", "itemsPerPage"))}
        </span>
        <select
            className="border rounded px-2 py-1 text-sm focus:outline-none bg-background"
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