import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {ImageListResponse, useListImagesQuery} from "@/lib/api/api.generated.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import {toast} from "sonner";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";

// const imageSchema = z.object({
//     filename: z.string().min(1, 'Filename is required'),
//     mimeType: z.string().min(1, 'MIME type is required'),
//     fileSize: z.coerce.number().min(1, 'File size must be at least 1 byte'),
//     url: z.string().url('Must be a valid URL'),
// });



export default function AdminImagesPage() {
    const {
        setPage,
        page,
        limit,
        setSortDirection,
        setSortBy,
        sortBy,
        sortDirection,
        setLimit,
        setSelectedItem,
    } = useCustomTable<ImageListResponse>();

    const {currentData, refetch, isLoading, isFetching} = useListImagesQuery({
        ...DefaultPaginationRequest,
        sortBy,
        page,
        limit
    });
    const images = currentData?.contents ?? [];


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Images</h1>
                    <p className="text-muted-foreground mt-1">Manage uploaded images</p>
                </div>
                <Button onClick={() => {
                }}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Image
                </Button>
            </div>

            <CustomTable<ImageListResponse>
                columns={[
                    {key: 'title', label: 'Title', sortable: true},
                    {key: 'publicId', label: 'PublicId', sortable: true},
                ]}
                data={images}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={(key, dir) => {
                    setSortBy(key);
                    setSortDirection(dir);
                }}
                pagination={{page, limit, total: currentData?.total ?? 0}}
                onPageChange={setPage}
                onEdit={async (course) => {
                    setSelectedItem(course);
                    // setOpen(true);
                }}
                onDelete={async (row) => {
                    try {
                        if (row?.id) {
                            // await deleteUser({id: course.id}).unwrap();

                        }
                    } catch (e: any) {
                        if (e?.originalStatus !== 200) {
                            toast.error("Failed to delete course. Please try again later." + e?.data?.message);
                        }
                        toast.success("success to delete course");
                        refetch();
                    }
                }}
                isLoading={isLoading || isFetching}
                isDeleting={false}
                onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                }}
            />


        </div>
    );
}
