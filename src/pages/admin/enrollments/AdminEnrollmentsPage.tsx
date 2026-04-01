// import React from 'react';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
// import {z} from 'zod';
import {CustomTable} from "@/components/table/CustomTable.tsx";
import {EnrollmentResponse, ListCourseResponse, useGetAllEnrollmentsQuery} from "@/lib/api/api.generated.ts";
import {toast} from "sonner";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";

// const enrollmentSchema = z.object({
//     userId: z.string().min(1, 'User is required'),
//     courseId: z.string().min(1, 'Course is required'),
//     status: z.enum(['ACTIVE', 'COMPLETED', 'DROPPED']),
//     enrolledAt: z.string().min(1, 'Enrollment date is required'),
// });



export default function AdminEnrollmentsPage() {
    const {
        setPage,
        page,
        limit,
        setSortDirection,
        setSortBy,
        sortBy,
        sortDirection,
        setLimit,
        setSelectedItem
    } = useCustomTable<EnrollmentResponse>();
    const {currentData, refetch} = useGetAllEnrollmentsQuery(DefaultPaginationRequest);
    const enrollments = currentData?.contents ?? [];
    // const [open, setOpen] = React.useState(false);
    // const [selectedEnrollment, setSelectedEnrollment] = React.useState<EnrollmentResponse | null>(null);
    //
    // const form = useForm<EnrollmentFormData>({
    //     resolver: zodResolver(enrollmentSchema),
    //     defaultValues: {
    //         userId: '',
    //         courseId: '',
    //         status: 'ACTIVE',
    //         enrolledAt: '',
    //     },
    // });
    //
    // React.useEffect(() => {
    //     if (selectedEnrollment) {
    //         form.reset({
    //             userId: selectedEnrollment.userId,
    //             courseId: selectedEnrollment.courseId,
    //             status: selectedEnrollment.status as any,
    //             enrolledAt: selectedEnrollment.enrolledAt,
    //         });
    //     } else {
    //         form.reset({
    //             userId: '',
    //             courseId: '',
    //             status: 'ACTIVE',
    //             enrolledAt: new Date().toISOString().split('T')[0],
    //         });
    //     }
    // }, [selectedEnrollment, form]);


    const handleAdd = () => {
        // setSelectedEnrollment(null);
        // setOpen(true);
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Enrollments</h1>
                    <p className="text-muted-foreground mt-1">Manage student enrollments</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Enrollment
                </Button>
            </div>

            <CustomTable<EnrollmentResponse>
                columns={[
                    {key: 'id', label: 'ID', sortable: true},
                    {key: 'status', label: 'Status', sortable: true},
                    {key: 'course', label: 'Course',render:(r)=>{
                        const data=r as ListCourseResponse;
                        return <p> {data.title} </p>
                        }},
                ]}
                data={enrollments}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={(key, dir) => {
                    setSortBy(key);
                    setSortDirection(dir);
                }}
                pagination={{page, limit, total: currentData?.total ?? 0}}
                onPageChange={setPage}
                onEdit={async (payment) => {
                    setSelectedItem(payment);
                    // setOpen(true);
                }}
                onDelete={async (course) => {
                    try {
                        if (course?.id) {
                            // await deleteCourse({courseId: course.id}).unwrap();

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
                // isDeleting={resultDeleteCourse.isLoading}
                onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                }}
            />

        </div>
    );
}
