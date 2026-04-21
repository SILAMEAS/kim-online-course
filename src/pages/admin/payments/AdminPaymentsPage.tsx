import {
    CourseResponse,
    ListPaymentResponse,
    useApproveMutation,
    useGetAllPaymentsQuery,
    UserResponse
} from "@/lib/api/api.generated.ts";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EnumRole} from "@/lib/enum.ts";
import {toast} from "sonner";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";


export default function AdminPaymentsPage() {
    const {
        setFilter,
        filter,
        currentUser
    } = useCustomTable<ListPaymentResponse>();
    const {
        currentData,
        refetch,
        isLoading,
        isFetching
    } = useGetAllPaymentsQuery(filter, {refetchOnMountOrArgChange: true,});
    const {t} = useTranslation();
    const [approve, approveResult] = useApproveMutation();
    const payments = currentData?.contents ?? [];


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{t(Localization("tableHeaders","payments"))}</h1>
                    <p className="text-muted-foreground mt-1">{t(Localization("tableHeaders","manage_payments"))}</p>
                </div>
            </div>

            <CustomTable<ListPaymentResponse>
                setFilter={setFilter}
                filter={filter}
                columns={[
                    {
                        key: 'user', label: 'Email', sortable: false, render: (r) => {
                            const user = (r as UserResponse);
                            return <p>{`${user.email} (${user.firstName} ${user.lastName})`}</p>
                        }
                    },
                    {
                        key: 'course', label: 'Course', sortable: false, render: (r) => {
                            return <p> {(r as CourseResponse)?.title}</p>
                        }
                    },
                    {key: 'amount', label: 'Amount', sortable: true},
                    {key: 'status', label: 'Status', sortable: true},
                ]}
                data={payments}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                quickAction={(row) => <Button
                    disabled={Boolean(currentUser?.role !== EnumRole.ADMIN) || approveResult?.isLoading || row.status === "DONE"}
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                        try {
                            if (row?.id) {
                                await approve({paymentId: row?.id}).unwrap();
                                refetch();
                            }
                        } catch (e: any) {
                            toast.error(e?.data?.message)
                        }
                    }}
                >
                    {approveResult?.isLoading ? "Approving ..." : "Approve"}
                </Button>}
                isLoading={isLoading || isFetching}

            />
        </div>
    );
}
