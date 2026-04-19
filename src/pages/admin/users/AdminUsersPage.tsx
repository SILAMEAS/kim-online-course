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
import {formatWord} from "@/lib/utils/FormatWord.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";


export default function AdminUsersPage() {
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') as EnumRole | undefined;
    const {
        setFilter, filter,
        selectedItem,
        setSelectedItem,
        currentUser,
    } = useCustomTable<UserResponse>();

    const {currentData, refetch, isLoading, isFetching} = useListUsersQuery({
        ...filter,
        role: role ?? undefined
    }, {refetchOnMountOrArgChange: true,});
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
                    <h1 className="text-3xl font-bold">{t(Localization("admin_user", "title"))}</h1>
                    <p className="text-muted-foreground mt-1">{t(Localization("admin_user", "subtitle"))}</p>
                </div>
                <Button onClick={() => {
                    setSelectedItem(null);
                    setOpen(true);
                }}>
                    <Plus className="mr-2 h-4 w-4"/>
                    {t(Localization("actions", "addUser"))}
                </Button>
            </div>

            <CustomTable<UserResponse>
                setFilter={setFilter}
                filter={filter}
                columns={[
                    {key: 'firstName', label: t(Localization("tableHeaders", "firstName")), sortable: true},
                    {key: 'lastName', label: t(Localization("tableHeaders", "lastName")), sortable: true},
                    {key: 'email', label: t(Localization("tableHeaders", "email")), sortable: true},
                    {
                        key: 'role',
                        label: t(Localization("tableHeaders", "role")),
                        sortable: true,
                        render: (r) => <Badge key={r?.toString()}
                                              variant={'outline'}>{formatWord(r?.toString())}</Badge>
                    },
                    {
                        key: 'status',
                        label: t(Localization("tableHeaders", "status")),
                        sortable: true,
                        render: (r => <Badge key={r?.toString()} variant={r === "ACTIVE" ? "default" : "destructive"}>
                            {formatWord(r.toString())}
                        </Badge>)
                    },
                ]}
                data={users}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
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
                            toast.error(`${t(Localization('error_message', "failed_delete_course"))}` + e?.data?.message);
                        }
                        toast.success(`${t(Localization('success_message', "success_delete_course"))}`);
                        refetch();
                    }
                }}
                isLoading={isLoading || isFetching}
                isDeleting={ladingDelete}
            />
            {/* Dialog */}

            <DynamicFormDialog
                open={open}
                setOpen={setOpen}
                title={t(Localization('admin_user', selectedItem ? "edit_user" : "add_user"))}
                description={`${t(Localization('admin_user', selectedItem ? "update_user_information" : "create_new_user_account"))}`}
                form={form}
                fields={[
                    {
                        name: "firstName",
                        label: t(Localization("tableHeaders", "firstName")),
                        type: "text",
                        placeholder: "John"
                    },
                    {
                        name: "lastName",
                        label: t(Localization("tableHeaders", "lastName")),
                        type: "text",
                        placeholder: "Doe"
                    },
                    {
                        name: "email", label: t(Localization("tableHeaders", "email")),
                        type: "email", placeholder: "john@example.com"
                    },
                    {
                        name: "role",
                        label: t(Localization("tableHeaders", "role")),
                        type: "select",
                        options: [
                            {label: "Student", value: "STUDENT"},
                            {label: "Instructor", value: "INSTRUCTOR"},
                            {label: "Admin", value: "ADMIN", disabled: currentUser?.role !== EnumRole.ADMIN},
                        ],
                    },
                    {
                        name: "status",
                        label: t(Localization("tableHeaders", "status")),
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
