import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table.tsx';
import {Button} from '@/components/ui/button.tsx';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx';
import {ArrowDown, ArrowRightLeft, ArrowUp, Edit2, Loader2, Trash2} from 'lucide-react';
import PaginationCustomTable from "@/components/table/commons/PaginationCustomTable.tsx";
import {SORT} from "@/lib/enum.ts";
import {cn} from "@/lib/utils.ts";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";


interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface IPaginationCustomTable {
    page: number;
    limit: number;
    total: number;
}

export enum MODE_TABLE {
    GRID = "grid",
    TABLE_PAGINATION = "table-pagination",
}

interface DataTableProps<T> {
    columns?: Column<T>[];
    data: T[];
    isLoading?: boolean;
    // actions
    onEdit?: (row: T) => Promise<void>;
    onDelete?: (row: T) => Promise<void>;
    quickAction?: (row: T) => React.ReactNode;
    isDeleting?: boolean;
    pagination: IPaginationCustomTable;
    setFilter: React.Dispatch<React.SetStateAction<{
        search: string
        page: number
        limit: number
        sortBy: keyof T
        sortOrder: SORT
    }>>;

    filter: {
        search: string
        page: number
        limit: number
        sortBy: keyof T
        sortOrder: SORT
    },
    mode?: MODE_TABLE;
    customRenderModeContent?: (row: T) => React.ReactNode;
    styles?: { classNameGrid?: string }
}

// @ts-ignore
export function CustomTable<T extends Record<string, any>>({
                                                               columns,
                                                               data,
                                                               isLoading,
                                                               onEdit,
                                                               onDelete,
                                                               isDeleting,
                                                               pagination,
                                                               quickAction,
                                                               setFilter,
                                                               filter,
                                                               mode = MODE_TABLE.TABLE_PAGINATION,
                                                               customRenderModeContent,
                                                               styles
                                                           }: Readonly<DataTableProps<T>>) {
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [deleteItem, setDeleteItem] = React.useState<T | null>(null);
    const {t} = useTranslation();

    const handleSort = (key: keyof T) => {

        if (!filter) return;

        const newDirection: SORT =
            filter.sortBy === key && filter.sortOrder === SORT.ASC ? SORT.DESC : SORT.ASC;

        setFilter({...filter, sortBy: key, sortOrder: newDirection, page: 1});
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No data found</p>
            </div>
        );
    }
    const actionColumnStyle = "flex items-center justify-center gap-2";

    const handleIconSort = (col: Column<T>) => {
        if (filter.sortBy && col.key === filter.sortBy) {
            if (filter.sortOrder === SORT.ASC) {
                return <ArrowUp className="h-4 w-4"/>
            }
            return <ArrowDown className="h-4 w-4"/>
        }
        return <ArrowRightLeft className="h-4 w-4"/>;
    }
    const renderMode = () => {
        switch (mode) {
            case MODE_TABLE.GRID:
                return {
                    contents: <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", styles?.classNameGrid)}>
                        {data.map((row) => (
                            customRenderModeContent ? customRenderModeContent(row) :
                                <div className={'col-span-1 h-40 flex justify-center items-center border-2'}
                                     key={row?.id}> {row.id}</div>
                        ))}
                    </div>,
                    footer: <PaginationCustomTable pagination={pagination}
                                                   onPageChange={page => setFilter({...filter, page})}
                                                   onLimitChange={limit => setFilter({...filter, limit, page: 1})}/>
                }
            case MODE_TABLE.TABLE_PAGINATION:
                return {
                    contents: <Table>
                        <TableHeader>
                            <TableRow>
                                {columns?.map((col) => (
                                    <TableHead key={String(col.key)}>
                                        <div className="flex items-center gap-2">
                                            {t(Localization('tableHeaders', col.label?.toLowerCase() as any))}

                                            {col.sortable && (
                                                <button
                                                    onClick={() => handleSort(col.key)}
                                                    className="hover:opacity-70"
                                                >
                                                    {
                                                        handleIconSort(col)
                                                    }

                                                </button>
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                                {
                                    (onDelete || onEdit || quickAction) &&
                                    <TableHead
                                        className={actionColumnStyle}>{t(Localization("actions", "title"))}</TableHead>
                                }

                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.map((row, idx) => (
                                <TableRow key={row?.id ?? idx}>
                                    {columns?.map((col) => {
                                        const value = row[col.key];

                                        return (
                                            <TableCell key={String(col.key)}>
                                                {col.render
                                                    ? col.render(value, row)
                                                    : (value as React.ReactNode) ?? '-'}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <div className={actionColumnStyle}>
                                            {onEdit && (
                                                <Button
                                                    disabled={Boolean(row?.role === "ADMIN")}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(row)}
                                                >
                                                    <Edit2 className="h-4 w-4"/>
                                                </Button>
                                            )}


                                            {onDelete && (
                                                (isDeleting && row?.id == deleteItem?.id) ?
                                                    <Loader2 className="h-4 w-4 animate-spin"/> :
                                                    <Button
                                                        disabled={Boolean(row?.role === "ADMIN")}
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setDeleteId(row.id ?? null);
                                                            setDeleteItem(row);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                            )}

                                            {quickAction?.(row)}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>,
                    footer: <PaginationCustomTable pagination={pagination}
                                                   onPageChange={page => setFilter({...filter, page})}
                                                   onLimitChange={limit => setFilter({...filter, limit, page: 1})}/>,
                    modal: <AlertDialog open={Boolean(deleteId)} onOpenChange={() => setDeleteId(null)}>
                        <AlertDialogContent>
                            <AlertDialogTitle>{t(Localization('info_message', 'delete_item'))}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {t(Localization('info_message', 'confirm_delete_item'))}
                            </AlertDialogDescription>

                            <div className="flex justify-end gap-3">
                                <AlertDialogCancel>{t(Localization('actions', "cancel"))}</AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={async () => {
                                        try {
                                            if (onDelete && deleteItem) {
                                                await onDelete(deleteItem).then(() => {
                                                    setDeleteId(null);
                                                    setDeleteItem(null);
                                                })
                                            }
                                        } catch (e) {
                                            console.error("error", e)
                                        }
                                    }
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    {isDeleting && (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                                    )}
                                    {t(Localization("actions", "delete"))}
                                </AlertDialogAction>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                }
            default:
                return null;
        }

    }


    return (
        <React.Fragment>
            <div className="border rounded-lg overflow-hidden ">
                {/* Content */}
                {renderMode()?.contents}
            </div>
            {/* Footer */}
            {renderMode()?.footer}
            {/* Delete Dialog */}
            {renderMode()?.modal}
        </React.Fragment>
    );
}