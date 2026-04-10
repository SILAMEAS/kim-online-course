import {
    Category,
    CreateCategoryRequest,
    useCreateCategoryMutation,
    useListCategoriesQuery,
    useUpdateCategoryMutation
} from "@/lib/api/api.generated.ts";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {DynamicFormDialog} from "@/components/dialog/DynamicFormDialog.tsx";
import {toast} from "sonner";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {firstNameSchema} from "@/lib/validations/global-schema.ts";
import {z} from "zod";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";

export default function AdminCategoriesPage() {
    const {
        setFilter,
        filter,
        setSelectedItem,
        selectedItem,
        open,
        setOpen,
        handleAdd
    } = useCustomTable<Category>();

    const {currentData, isLoading, isFetching, refetch} = useListCategoriesQuery({
        ...filter
    }, {refetchOnMountOrArgChange: true});
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const images = currentData?.contents ?? [];
    const form = useForm<CreateCategoryRequest>({
        resolver: zodResolver(z.object({
            name: firstNameSchema
        }))
    });

    React.useEffect(() => {
        if (selectedItem) {
            form.reset({
                name: selectedItem.name,
            });
        } else {
            form.reset({
                name: ""
            });
        }
    }, [selectedItem, form]);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <p className="text-muted-foreground mt-1">Manage uploaded categories</p>

                </div>
                    <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4"/>
                        Add Category
                    </Button>
            </div>

            <CustomTable<Category>
                filter={filter}
                setFilter={setFilter}
                columns={[
                    {key: 'id', label: 'Id', sortable: true},
                    {key: 'name', label: 'Name', sortable: true},
                ]}
                data={images}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}

                isLoading={isLoading || isFetching}
                isDeleting={false}
                onEdit={async (course) => {
                    setSelectedItem(course);
                    setOpen(true);
                }}

            />
            <DynamicFormDialog
                open={open}
                setOpen={setOpen}
                title={selectedItem ? "Edit User" : "Add User"}
                description={selectedItem ? "Update user information" : "Create a new user account"}
                form={form}
                fields={[
                    {name: "name", label: "Category Name", type: "text", placeholder: "web development"},
                ]}
                onSubmit={async (data: any) => {

                    try {
                        const formData = new FormData();
                        formData.append('name', data.name);


                        if (selectedItem?.id) {
                            await updateCategory({
                                id: selectedItem.id,
                                createCategoryRequest: formData as any
                            }).unwrap();
                        } else {
                            data?.email &&
                            formData.append('email', data?.email);
                            formData.append('password', "#Kim346414");
                            if (data?.role) {
                                formData.append('role', data.role);
                            }

                            await createCategory({
                                createCategoryRequest: formData as any
                            }).unwrap();
                        }
                        setOpen(false);
                        setSelectedItem(null);
                        form.reset();
                        refetch();
                    } catch (e: any) {
                        console.error(e);
                        toast.error(e?.data?.message || 'Something went wrong');

                    }
                }}
            />

        </div>
    );
}
