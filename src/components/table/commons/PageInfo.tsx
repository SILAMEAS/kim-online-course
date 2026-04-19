import {IPaginationCustomTable} from "@/components/table/CustomTable.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export const PageInfo = ({pagination}: { pagination: IPaginationCustomTable }) => {
    const {t} = useTranslation();
    return <div className="text-sm text-gray-600 hidden md:block">
        {t(Localization("pagination", "page"))} {pagination.page} {t(Localization("pagination", "of"))} {Math.ceil(pagination.total / pagination.limit)}
    </div>
}