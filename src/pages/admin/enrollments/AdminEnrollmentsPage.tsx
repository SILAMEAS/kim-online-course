import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {CustomTable} from "@/components/table/CustomTable.tsx";
import {EnrollmentResponse, ListCourseResponse, useGetAllEnrollmentsQuery} from "@/lib/api/api.generated.ts";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";


export default function AdminEnrollmentsPage() {
    const {
        setFilter, filter,
    } = useCustomTable<EnrollmentResponse>();
    const {currentData} = useGetAllEnrollmentsQuery(filter, {refetchOnMountOrArgChange: true,});
    const enrollments = currentData?.contents ?? [];


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Enrollments</h1>
                    <p className="text-muted-foreground mt-1">Manage student enrollments</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Enrollment
                </Button>
            </div>

            <CustomTable<EnrollmentResponse>
                setFilter={setFilter}
                filter={filter}
                columns={[
                    {key: 'id', label: 'ID', sortable: true},
                    {key: 'status', label: 'Status', sortable: true},
                    {
                        key: 'course', label: 'Course', render: (r) => {
                            const data = r as ListCourseResponse;
                            return <p> {data.title} </p>
                        }
                    },
                ]}
                data={enrollments}

                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                isLoading={false}

            />

        </div>
    );
}
