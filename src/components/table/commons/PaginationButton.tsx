import {IPaginationCustomTable} from "@/components/table/CustomTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export const PaginationButton = ({
                                     pagination,
                                     onPageChange,
                                 }: {
    pagination: IPaginationCustomTable;
    onPageChange?: (page: number) => void;
}) => {
    // Use Math.ceil to ensure partial pages count as a page
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    const {t} = useTranslation();

    return (
        <div className="flex items-center gap-1">
            <Button
                size="sm"
                variant="outline"
                disabled={pagination.page <= 1}
                onClick={() => onPageChange?.(pagination.page - 1)}
            >
                {t(Localization("pagination", "prev"))}
            </Button>

            {[...Array(totalPages || 1).keys()].map((p) => (
                <Button
                    key={p + 1}
                    size="sm"
                    variant={p + 1 === pagination.page ? "default" : "outline"}
                    onClick={() => onPageChange?.(p + 1)}
                >
                    {p + 1}
                </Button>
            ))}

            <Button
                size="sm"
                variant="outline"
                disabled={pagination.page >= totalPages}
                onClick={() => onPageChange?.(pagination.page + 1)}
            >
                {t(Localization("pagination", "next"))}
            </Button>
        </div>
    );
};