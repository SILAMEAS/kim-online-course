import React from 'react';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Plus} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
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

    const {currentData, refetch} = useListUsersQuery({...DefaultPaginationRequest, sortBy, page, limit});
    const users = currentData?.contents ?? []
    const [open, setOpen] = React.useState(false);
    const [createUser, {isSuccess: isSuccessCreateUser}] = useCreateUserMutation();
    const [updateUser, {isSuccess: isSuccessUpdateUser}] = useUpdateUserMutation();
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

    const onSubmit = async (data: any) => {

        try {
            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('role', data.role);


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
        } catch (e: any) {
            console.error(e);
            toast.error(e?.data?.message || 'Something went wrong');

        }
    };


    const handleAdd = () => {
        setSelectedItem(null);
        setOpen(true);
    };

    React.useEffect(() => {
        if (isSuccessCreateUser || isSuccessUpdateUser) {
            refetch()
        }
    }, [isSuccessUpdateUser, isSuccessCreateUser])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="text-muted-foreground mt-1">Manage system users</p>
                </div>
                <Button onClick={handleAdd}>
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
                isLoading={false}
                isDeleting={ladingDelete}
                onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                }}
            />


            {/* Add/Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedItem ? 'Edit User' : 'Add New User'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedItem
                                ? 'Update user information'
                                : 'Create a new user account'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, errors => console.error(errors))}
                              className="space-y-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="STUDENT">Student</SelectItem>
                                                <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                                                <SelectItem value="ADMIN"
                                                            disabled={currentUser?.role !== EnumRole.ADMIN}>Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(value === 'true')}
                                            defaultValue={field.value ? 'true' : 'false'}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="true">Active</SelectItem>
                                                <SelectItem value="false">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {selectedItem ? 'Update' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
