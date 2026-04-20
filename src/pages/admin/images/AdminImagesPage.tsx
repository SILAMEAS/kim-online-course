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
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";
import {PreviewImage} from "@/pages/admin/images/PreviewImage.tsx";

export default function AdminImagesPage() {
    const {t} = useTranslation();
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
                    <h1 className="text-3xl font-bold">{t(Localization("dashboard","images"))}</h1>
                    <p className="text-muted-foreground mt-1">{t(Localization("tableHeaders","manage_images"))}</p>
                </div>
            </div>

            <CustomTable<ImageListResponse>
                filter={filter}
                setFilter={setFilter}
                columns={[
                    {key: 'title', label: 'Title', sortable: true},
                    {key: 'publicId', label: 'PublicId', sortable: false},
                ]}
                data={images}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                quickAction={(r) => {
                    return <Button variant={"outline"} onClick={() => r.publicId && setPreviewImage(r?.publicId)}><EyeIcon/> </Button>
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
                        {previewImage && (
                            <PreviewImage
                                src={previewCloudinary({
                                    publicId: previewImage,
                                    type: "image",
                                })}
                                alt={previewImage}
                            />
                        )}
                    </AlertDialogDescription>

                    <div className="flex justify-end gap-3">
                        <AlertDialogCancel>Back</AlertDialogCancel>
                    </div>
                </AlertDialogContent>
            </AlertDialog>


        </div>
    );
}
