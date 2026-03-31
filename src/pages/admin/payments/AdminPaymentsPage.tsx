import {
    CourseResponse,
    ListPaymentResponse,
    useApproveMutation,
    useGetAllPaymentsQuery,
    UserResponse
} from "@/lib/api/api.generated.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EnumRole} from "@/lib/enum.ts";
import {toast} from "sonner";

// const paymentSchema = z.object({
//     userId: z.string().min(1, 'User is required'),
//     courseId: z.string().min(1, 'Course is required'),
//     amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
//     paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER']),
//     status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']),
// });

export default function AdminPaymentsPage() {
    const {
        setPage,
        page,
        limit,
        setSortDirection,
        setSortBy,
        sortBy,
        sortDirection,
        setLimit,
        currentUser
    } = useCustomTable<ListPaymentResponse>();
    const {currentData, refetch} = useGetAllPaymentsQuery(DefaultPaginationRequest);
    const [approve, approveResult] = useApproveMutation();
    const payments = currentData?.contents ?? [];


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Payments</h1>
                    <p className="text-muted-foreground mt-1">Manage course payments</p>
                </div>
            </div>

            <CustomTable<ListPaymentResponse>
                columns={[
                    {key: 'id', label: 'ID', sortable: true},
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
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={(key, dir) => {
                    setSortBy(key);
                    setSortDirection(dir);
                }}
                pagination={{page, limit, total: currentData?.total ?? 0}}
                onPageChange={setPage}
                quickAction={(row) => <Button
                    disabled={Boolean(currentUser?.role !== EnumRole.ADMIN) || approveResult?.isLoading||row.status==="DONE"}
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
                    {approveResult?.isLoading?"Approving ...": "Approve"}
                </Button>}
                isLoading={false}
                onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                }}
            />
        </div>
    );
}
