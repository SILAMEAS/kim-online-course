import {Heart, Loader, ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Link} from "react-router-dom";
import {useGetUserWishlistQuery, WishlistResponse} from "@/lib/api/api.generated.ts";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks.ts";
import {addToCart} from "@/lib/redux/slices/cart.slice.ts";
import {EnumRole} from "@/lib/enum.ts";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {CustomTable, MODE_TABLE} from "@/components/table/CustomTable.tsx";

export default function WishlistPage() {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const {
        setFilter,
        filter,
    } = useCustomTable<WishlistResponse>();
    const wishlistQuery = useGetUserWishlistQuery({
        ...filter,
        userId: Number(currentUser?.id)
    }, {refetchOnMountOrArgChange: true, skip: !currentUser?.id});
    const wishlistItems = wishlistQuery?.currentData?.contents || [];
    const dispatch = useAppDispatch();
    if (wishlistQuery?.isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader/>
        </div>
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold mb-2">Wishlist</h1>
                <p className="text-foreground/60">
                    Save courses you want to learn later
                </p>
            </div>

            {wishlistItems?.length === 0 ? (
                <Card className="p-12 border border-border text-center">
                    <Heart className="w-16 h-16 mx-auto text-foreground/30 mb-4"/>
                    <h2 className="text-2xl font-semibold mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-foreground/60 mb-6">
                        Add courses to your wishlist to save them for later
                    </p>
                    <Link to="/courses">
                        <Button size="lg">Browse Courses</Button>
                    </Link>
                </Card>
            ) : (
                <CustomTable<WishlistResponse>
                    setFilter={setFilter}
                    filter={filter}
                    data={wishlistItems}
                    pagination={{page: filter.page, limit: filter.limit, total: wishlistQuery?.currentData?.total ?? 0}}
                    isLoading={wishlistQuery?.isLoading || wishlistQuery?.isFetching}
                    mode={MODE_TABLE.GRID}
                    customRenderModeContent={(w) => <Card
                        key={w.id}
                        className="p-6 border border-border hover:shadow-lg transition-shadow overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Image */}
                            <div
                                className="relative w-full md:w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                    src={w?.course?.imageUrl}
                                    alt={w?.course?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {w.course.title}
                                    </h3>
                                    <p className="text-sm text-foreground/60 mb-3">
                                        by {w.course.instructor.firstName} {w.course.instructor.lastName}
                                    </p>

                                </div>

                                {/* Button */}
                                <Button disabled={currentUser?.role !== EnumRole.STUDENT} variant="outline"
                                        size="sm" className="gap-2" onClick={() => {
                                    w.course && dispatch(addToCart({
                                        course_id: `${w.course?.id}`,
                                        course_title: w.course?.title,
                                        id: `${w.course.id}`,
                                        price: w.course?.price,
                                        image: w.course?.imageUrl,
                                        instructor_name: `${w.course?.instructor?.firstName} ${w.course?.instructor?.lastName}`,
                                    }))

                                }}>
                                    <ShoppingCart/>
                                </Button>
                            </div>
                        </div>
                    </Card>}

                />
            )}
        </div>
    );
}
