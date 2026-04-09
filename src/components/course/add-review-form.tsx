import {useState} from "react";
import {useAppSelector} from "@/lib/redux/hooks";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReviewFormData, reviewSchema} from "@/lib/validations/schemas";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Loader2, Star} from "lucide-react";
import {toast} from "sonner";
import {
    ReviewResponse,
    useCreateReviewsMutation,
    useGetRatingQuery,
    useListReviewsQuery
} from "@/lib/api/api.generated.ts";
import {useParams} from "react-router-dom";
import {RatingSummary, ReviewCard} from "@/components/course/review-section.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {CustomTable, MODE_TABLE} from "@/components/table/CustomTable.tsx";

interface AddReviewFormProps {
    courseId: string;
    onReviewAdded?: () => void;
    onSuccess: () => void;
}

export function AddReviewForm({onReviewAdded,onSuccess}: Readonly<AddReviewFormProps>) {
    const {id: courseId} = useParams<{ id: string }>();
    const ratingQuery = useGetRatingQuery({courseId: Number(courseId)}, {skip: !courseId})
    const stats = ratingQuery?.currentData;
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const [isLoading, setIsLoading] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [addReview] = useCreateReviewsMutation();
    const {
        filter,
        setFilter,
    } = useCustomTable<ReviewResponse>();
    const {currentData, isLoading: isLoadingList, refetch:refetchListReview} = useListReviewsQuery({
        ...filter,
        courseId: Number(courseId),
    }, {skip: !courseId, refetchOnMountOrArgChange: true});
    const reviews = currentData?.contents || [];

    const form = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 5,
            title: "",
            comment: "",
        },
    });

    const currentRating = form.watch("rating");

    async function onSubmit(data: ReviewFormData) {
        if (!currentUser) {
            toast.error("Please login to submit a review");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("rating", data.rating.toString());
            formData.append("title", data.title);
            formData.append("comment", data.comment);
            // Simulate API call
            // await new Promise((resolve) => setTimeout(resolve, 800));
            courseId && await addReview({
                courseId: Number(courseId),
                reviewRequest: formData as any
            });

            console.log("Submitting review with rating:", data);

            toast.success("Review submitted successfully!");
            form.reset();
            onReviewAdded?.();
            refetchListReview();
            ratingQuery?.refetch();
            onSuccess();
        } catch (error) {
            toast.error("Failed to submit review. Please try again.");
            console.error("Review error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!currentUser) {
        return (
            <div className="bg-secondary/50 border border-border rounded-lg p-6 text-center">
                <p className="text-foreground/70 mb-4">Sign in to leave a review</p>
                <Button asChild>
                    <a href="/login">Sign In</a>
                </Button>
            </div>
        );
    }


    return (
        <div className={'space-y-6'}>
            {
                stats &&
                <RatingSummary
                    average={stats.average}
                    total={stats.total}
                    breakdown={stats.breakdown}
                />
            }
            <CustomTable<ReviewResponse>
                mode={MODE_TABLE.GRID}
                setFilter={setFilter}
                filter={filter}
                data={reviews}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                isLoading={isLoading || isLoadingList}
                customRenderModeContent={review => <ReviewCard key={review.id} review={review}/>}

            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 bg-card border border-border rounded-lg p-6"
                >
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Share Your Feedback</h3>
                        <p className="text-sm text-foreground/60">
                            Help others discover this course by sharing your experience
                        </p>
                    </div>

                    {/* Rating */}
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                type="button"
                                                onClick={() => field.onChange(rating)}
                                                onMouseEnter={() => setHoveredRating(rating)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${
                                                        rating <= (hoveredRating || currentRating)
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-foreground/20"
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Review Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Summarize your experience..."
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Comment */}
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Your Review</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Share what you learned and what could be improved..."
                                        disabled={isLoading}
                                        className="min-h-32"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        {isLoading ? "Submitting..." : "Submit Review"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
