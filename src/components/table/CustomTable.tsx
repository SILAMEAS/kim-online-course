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
import {ArrowUpDown, Edit2, Loader2, Trash2} from 'lucide-react';
import PaginationCustomTable from "@/components/table/commons/PaginationCustomTable.tsx";

type SortDirection = 'ASC' | 'DES';

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

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;

    // actions
    onEdit?: (row: T) => Promise<void>;
    onDelete?: (row: T) => Promise<void>;
    isDeleting?: boolean;

    // sorting (controlled)
    sortBy?: keyof T;
    sortDirection?: SortDirection;
    onSortChange?: (key: keyof T, direction: SortDirection) => void;

    // pagination (controlled)
    pagination: IPaginationCustomTable;
    onPageChange?: (page: number) => void;

    onLimitChange?: (limit: number) => void;  // <-- new
}

// @ts-ignore
export function CustomTable<T extends Record<string, any>>({
                                                               columns,
                                                               data,
                                                               isLoading,

                                                               onEdit,
                                                               onDelete,
                                                               isDeleting,

                                                               sortBy,
                                                               sortDirection = 'ASC',
                                                               onSortChange,

                                                               pagination, onLimitChange,
                                                               onPageChange
                                                           }: Readonly<DataTableProps<T>>) {
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [deleteItem, setDeleteItem] = React.useState<T | null>(null);

    const handleSort = (key: keyof T) => {
        if (!onSortChange) return;

        const newDirection: SortDirection =
            sortBy === key && sortDirection === 'ASC' ? 'DES' : 'ASC';

        onSortChange(key, newDirection);
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

    return (
        <>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={String(col.key)}>
                                    <div className="flex items-center gap-2">
                                        {col.label}
                                        {col.sortable && (
                                            <button
                                                onClick={() => handleSort(col.key)}
                                                className="hover:opacity-70"
                                            >
                                                <ArrowUpDown className="h-4 w-4"/>
                                            </button>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                            <TableHead className={actionColumnStyle}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((row, idx) => (
                            <TableRow key={row?.id ?? idx}>
                                {columns.map((col) => {
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
                                                disabled={Boolean(row?.role==="ADMIN")}
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
                                                    disabled={Boolean(row?.role==="ADMIN")}
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
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <PaginationCustomTable pagination={pagination} onPageChange={onPageChange} onLimitChange={onLimitChange}/>
            {/* Delete Dialog */}
            <AlertDialog open={Boolean(deleteId)} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogTitle>Delete Item</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this item? This action cannot be undone.xxxxx
                    </AlertDialogDescription>

                    <div className="flex justify-end gap-3">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

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
                                    console.log("error", e)
                                }
                            }
                            }
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting && (
                                <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                            )}
                            Delete
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}