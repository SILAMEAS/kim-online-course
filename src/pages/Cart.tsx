import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {clearCart, removeFromCart} from "@/lib/redux/slices/cart.slice";
import {Navbar} from "@/components/navbar.tsx";
import {Footer} from "@/components/footer.tsx";
import {CartItem} from "@/components/cart/cart-item";
import {CartSummary} from "@/components/cart/cart-summary";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ShoppingCart} from "lucide-react";
import {toast} from "sonner";
import {
    CourseResponse,
    ListPaymentResponse,
    useGetAllPaymentsQuery,
    UserResponse,
    useSubmitPaymentMutation
} from "@/lib/api/api.generated.ts";
import {EnumRole} from "@/lib/enum.ts";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export default function CartPage() {
    const {t} = useTranslation();
    const [submitPayment, {isLoading: paymentLoading}] = useSubmitPaymentMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {cart} = useAppSelector((state) => state);
    const [activeTab, setActiveTab] = useState("cart");
    const [verifyPayment, setVerifyPayment] = useState<boolean>(false)

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
    const payments = currentData?.contents ?? [];

    const handleRemove = (courseId: string) => {
        dispatch(removeFromCart(courseId));
        toast.success("Course removed from cart");
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success("Cart cleared");
    };

    const handleCheckout = () => {
        if (!cart.items.length) {
            toast.error("Cart is empty");
            return;
        }
        setActiveTab("checkout");
    };


    const TAX_RATE = 0.1;
    const tax = cart.total * TAX_RATE;
    const finalTotal = cart.total + tax;


    useEffect(() => {
        if (activeTab === 'payments')
            refetch()
    }, [activeTab])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                            <ShoppingCart className="w-8 h-8"/>
                            {t(Localization("cart_page", "title"))}
                        </h1>
                        <p className="text-sm md:text-lg text-foreground/60">
                            {cart.quantity} {t(Localization("cart_page", "items_in_cart"))}
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 mx-auto text-foreground/30 mb-4"/>
                        <h2 className="text-2xl font-semibold mb-2">
                            {t(Localization("cart_page", "empty_title"))}
                        </h2>
                        <p className="text-foreground/60 mb-6">
                            {t(Localization("cart_page", "empty_description"))}
                        </p>
                        <Button onClick={() => navigate("/courses")} size="lg">
                            {t(Localization("cart_page", "continue_shopping"))}
                        </Button>
                    </div>
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="grid w-full max-w-xs grid-cols-3 mb-8">
                            <TabsTrigger
                                value="cart">{t(Localization("cart_page", "tab_cart"), {count: cart?.items?.length ?? 0})}</TabsTrigger>
                            <TabsTrigger
                                value="checkout"
                            >
                                {t(Localization("cart_page", "tab_checkout"))}

                            </TabsTrigger>
                            <TabsTrigger
                                value="payments"
                            >
                                {t(Localization("cart_page", "tab_payment"), {count: currentData?.total ?? 0})}
                            </TabsTrigger>
                        </TabsList>

                        {/* Cart Items Tab */}
                        <TabsContent value="cart" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    {cart.items.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onRemove={handleRemove}
                                        />
                                    ))}

                                    {cart.items.length > 0 && (
                                        <Button
                                            variant="outline"
                                            onClick={handleClearCart}
                                            className="w-full mt-6"
                                        >
                                            Clear Cart
                                        </Button>
                                    )}
                                </div>

                                {/* Summary */}
                                {cart.items.length > 0 && (
                                    <CartSummary
                                        total={cart.total}
                                        quantity={cart.quantity}
                                        onCheckout={handleCheckout}
                                    />
                                )}
                            </div>
                        </TabsContent>

                        {/* Checkout Tab */}
                        <TabsContent value="checkout" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                                {/* Order Summary */}

                                <div className="bg-card border border-border rounded-lg p-6 h-fit  top-24">
                                    <h3 className="text-xl font-semibold mb-6">
                                        {t(Localization("cart_page", "order_summary_title"))}
                                    </h3>

                                    <div className="space-y-3 mb-6 pb-6 border-b">
                                        {cart.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between text-sm"
                                            >
                          <span className="text-foreground/60 truncate">
                            {item.course_title}
                          </span>
                                                <span className="font-medium flex-shrink-0">
                            ${item.price.toFixed(2)}
                          </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span
                                                className="text-foreground/60">{t(Localization("cart_page", "subtotal"))}</span>
                                            <span>${cart.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4 flex justify-between">
                                        <span className="font-semibold">{t(Localization("cart", 'total'))}</span>
                                        <span className="text-2xl font-bold text-primary">
                        ${finalTotal.toFixed(2)}
                      </span>
                                    </div>
                                </div>
                                {/* Form */}
                                <div className="lg:col-span-2 bg-card  rounded-lg  ">
                                    <img src={"/qr.webp"} alt="example" loading="lazy" className={'w-72 h-auto'}/>
                                </div>

                            </div>
                            <p className={'text-gray-500 text-sm'}> {t(Localization("cart", 'must_pay_with_qr'))}</p>
                            <p className={'text-gray-500 text-sm'}>
                                {t(Localization("footer", 'contact'))} :
                                <a className={'text-blue-500'}
                                   href={"https://t.me/moeurkkimsour"}> https://t.me/moeurkkimsour</a></p>
                            <Button onClick={() => setVerifyPayment(true)}

                                    disabled={currentUser?.role !== EnumRole.STUDENT || cart?.items?.length === 0}
                            >

                                {t(Localization("cart_page", "payment_button"))} {paymentLoading ? "..." : ""}</Button>
                        </TabsContent>

                        {/*    Payments Tab*/}
                        <TabsContent value={"payments"} className="space-y-6">
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
                                    {key: 'amount', label: 'price', sortable: true},
                                    {key: 'status', label: 'Status', sortable: true},
                                ]}
                                data={payments}
                                pagination={{
                                    page: filter.page,
                                    limit: filter.limit,
                                    total: currentData?.total ?? 0
                                }}
                                isLoading={isLoading || isFetching}

                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <AlertDialog open={verifyPayment} onOpenChange={() => setVerifyPayment(false)}>
                <AlertDialogContent>
                    <AlertDialogTitle> {t(Localization('cart_page', 'verify_payment_title'))}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t(Localization('cart_page', 'verify_payment'))}
                    </AlertDialogDescription>

                    <div className="flex justify-end gap-3 items-center">
                        <AlertDialogCancel
                            className="h-full text-red-500">{t(Localization('actions', 'cancel'))}</AlertDialogCancel>

                        <AlertDialogCancel
                            onClick={async () => {
                                try {
                                    if (!cart?.items) return;

                                    toast.warning("Are you pay with this QR ?");

                                    await Promise.all(
                                        cart.items.map((item) =>
                                            submitPayment({courseId: Number(item.course_id)}).unwrap()
                                        )
                                    );

                                    handleClearCart()

                                } catch (e: any) {
                                    toast.error(e?.data?.message);
                                }
                            }
                            }
                        >
                            {t(Localization('actions', 'submit'))}
                        </AlertDialogCancel>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <Footer/>
        </div>
    );
}
