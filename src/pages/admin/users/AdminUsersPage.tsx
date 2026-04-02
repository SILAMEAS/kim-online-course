import React from 'react';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
    CreateUserRequest,
    UpdateUserRequest,
    useCreateUserMutation,
    useDeleteUserMutation,
    useListUsersQuery,
    UserResponse,
    useUpdateUserMutation
} from "@/lib/api/api.generated.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {toast} from "sonner";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {EnumRole} from "@/lib/enum.ts";
import {
    emailSchema,
    firstNameSchema,
    lastNameSchema,
    roleSchema,
    statusSchema
} from "@/lib/validations/global-schema.ts";
import {DynamicFormDialog} from "@/components/dialog/DynamicFormDialog.tsx";


export default function AdminUsersPage() {
    const {
        setPage,
        page,
        limit,
        setSortDirection,
        setSortBy,
        sortBy,
        sortDirection,
        setLimit,
        selectedItem,
        setSelectedItem,
        currentUser,
    } = useCustomTable<UserResponse>();

    const {currentData, refetch, isLoading, isFetching} = useListUsersQuery({
        ...DefaultPaginationRequest,
        sortBy,
        page,
        limit
    });
    const users = currentData?.contents ?? []
    const [open, setOpen] = React.useState(false);
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser, {isLoading: ladingDelete}] = useDeleteUserMutation();

    const form = useForm<CreateUserRequest | UpdateUserRequest>({
        resolver: zodResolver(z.object({
            firstName: firstNameSchema,
            lastName: lastNameSchema,
            role: roleSchema,
            email: emailSchema,
            status: statusSchema
        }))
    });

    React.useEffect(() => {
        if (selectedItem) {
            form.reset({
                firstName: selectedItem.firstName,
                lastName: selectedItem.lastName,
                email: selectedItem.email,
                role: selectedItem.role as any,
                status: selectedItem.status,
            });
        } else {
            form.reset({
                firstName: '',
                lastName: '',
                email: '',
                role: 'STUDENT',
                status: "ACTIVE"
            });
        }
    }, [selectedItem, form]);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="text-muted-foreground mt-1">Manage system users</p>
                </div>
                <Button onClick={() => {
                    setSelectedItem(null);
                    setOpen(true);
                }}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add User
                </Button>
            </div>

            <CustomTable<UserResponse>
                columns={[
                    {key: 'firstName', label: 'FirstName', sortable: true},
                    {key: 'lastName', label: 'LastName', sortable: true},
                    {key: 'email', label: 'Email', sortable: true},
                    {key: 'role', label: 'Role', sortable: true},
                    {key: 'status', label: 'Status', sortable: true},
                ]}
                data={users}
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
                    setOpen(true);
                }}
                onDelete={async (course) => {
                    try {
                        if (course?.id) {
                            await deleteUser({id: course.id}).unwrap();

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
                isDeleting={ladingDelete}
                onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                }}
            />
            {/* Dialog */}

            <DynamicFormDialog
                open={open}
                setOpen={setOpen}
                title={selectedItem ? "Edit User" : "Add User"}
                description={selectedItem ? "Update user information" : "Create a new user account"}
                form={form}
                fields={[
                    {name: "firstName", label: "First Name", type: "text", placeholder: "John"},
                    {name: "lastName", label: "Last Name", type: "text", placeholder: "Doe"},
                    {name: "email", label: "Email", type: "email", placeholder: "john@example.com"},
                    {
                        name: "role",
                        label: "Role",
                        type: "select",
                        options: [
                            {label: "Student", value: "STUDENT"},
                            {label: "Instructor", value: "INSTRUCTOR"},
                            {label: "Admin", value: "ADMIN", disabled: currentUser?.role !== EnumRole.ADMIN},
                        ],
                    },
                    {
                        name: "status",
                        label: "Status",
                        type: "select",
                        options: [
                            {label: "Active", value: "ACTIVE"},
                            {label: "Inactive", value: "INACTIVE"},
                        ],
                    },
                ]}
                onSubmit={async (data: any) => {

                    try {
                        const formData = new FormData();
                        formData.append('firstName', data.firstName);
                        formData.append('lastName', data.lastName);
                        formData.append('role', data.role);
                        formData.append('status', data.status);


                        if (selectedItem?.id) {
                            await updateUser({
                                id: selectedItem.id,
                                updateUserRequest: formData as any
                            }).unwrap();
                        } else {
                            data?.email &&
                            formData.append('email', data?.email);
                            formData.append('password', "#Kim346414");
                            if (data?.role) {
                                formData.append('role', data.role);
                            }

                            await createUser({
                                createUserRequest: formData as any
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
