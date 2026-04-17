import {ImageListResponse, useListImagesQuery} from "@/lib/api/api.generated.ts";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EyeIcon} from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {useState} from "react";
import previewCloudinary from "@/components/previewCloudinary.ts";

export default function AdminImagesPage() {
    const {
        setFilter,
        filter,
    } = useCustomTable<ImageListResponse>();

    const {currentData, isLoading, isFetching} = useListImagesQuery({
        ...filter
    }, {refetchOnMountOrArgChange: true});
    const images = currentData?.contents ?? [];
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Images</h1>
                    <p className="text-muted-foreground mt-1">Manage uploaded images</p>
                </div>
            </div>

            <CustomTable<ImageListResponse>
                filter={filter}
                setFilter={setFilter}
                columns={[
                    {key: 'title', label: 'Title', sortable: true},
                    {key: 'publicId', label: 'PublicId', sortable: true},
                ]}
                data={images}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                quickAction={(r) => {
                    return <Button onClick={() => r.publicId && setPreviewImage(r?.publicId)}><EyeIcon/> </Button>
                }}

                isLoading={isLoading || isFetching}
                isDeleting={false}

            />
            <AlertDialog open={previewImage !== null} onOpenChange={() => {
                console.log("previewImage", previewImage);
                setPreviewImage(null)
            }}>
                <AlertDialogContent>
                    <AlertDialogTitle>View Image</AlertDialogTitle>
                    <AlertDialogDescription>
                        {
                            previewImage &&
                            <img
                                src={previewCloudinary({publicId: previewImage, type: "image"})}
                                className="object-cover rounded-md border"
                                alt={previewImage ?? "Loading"}
                                loading="eager"
                            />
                        }
                    </AlertDialogDescription>

                    <div className="flex justify-end gap-3">
                        <AlertDialogCancel>Back</AlertDialogCancel>
                    </div>
                </AlertDialogContent>
            </AlertDialog>


        </div>
    );
}
