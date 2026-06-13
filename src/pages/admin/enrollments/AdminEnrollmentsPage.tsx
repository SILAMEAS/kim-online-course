import {CustomTable} from "@/components/table/CustomTable.tsx";
import {EnrollmentResponse, ListCourseResponse, useGetAllEnrollmentsQuery} from "@/lib/api/api.generated.ts";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";


export default function AdminEnrollmentsPage() {
    const {
        setFilter, filter,
    } = useCustomTable<EnrollmentResponse>();
    const {t} = useTranslation();
    const {currentData} = useGetAllEnrollmentsQuery(filter, {refetchOnMountOrArgChange: true,});
    const enrollments =  (currentData?.contents ?? []).map((item, index) => ({
        ...item,
        displayId: index + 1
    }));
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{t(Localization("tableHeaders","enrollments"))}</h1>
                    <p className="text-muted-foreground mt-1">{t(Localization("tableHeaders","manage_enrollments"))}</p>
                </div>

            </div>

            <CustomTable<EnrollmentResponse>
                setFilter={setFilter}
                filter={filter}
                columns={[
                    {key: 'displayId', label: 'no', sortable: false},
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
