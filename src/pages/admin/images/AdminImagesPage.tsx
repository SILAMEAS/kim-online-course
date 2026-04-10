import {ImageListResponse, useListImagesQuery} from "@/lib/api/api.generated.ts";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";

export default function AdminImagesPage() {
    const {
        setFilter,
        filter,
    } = useCustomTable<ImageListResponse>();

    const {currentData, isLoading, isFetching} = useListImagesQuery({
        ...filter
    }, {refetchOnMountOrArgChange: true});
    const images = currentData?.contents ?? [];


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

                isLoading={isLoading || isFetching}
                isDeleting={false}

            />


        </div>
    );
}
