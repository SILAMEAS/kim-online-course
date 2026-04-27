import {Edit, Loader2, Star, Trash2} from 'lucide-react';
import {formatDistanceToNow} from 'date-fns';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {CourseRatingDto, ReviewResponse, useDeleteReviewsMutation} from "@/lib/api/api.generated.ts";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button.tsx";
import {useAppSelector} from "@/lib/redux/hooks.ts";
import {EnumRole} from "@/lib/enum.ts";
import {UseFormReturn} from "react-hook-form";
import {Dispatch, SetStateAction} from "react";

export function RatingSummary({average, total, breakdown}: Readonly<CourseRatingDto>) {
    const {t} = useTranslation();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-secondary/10 p-6 rounded-xl">
            <div>
                <div className="text-xl font-extrabold mb-2">{average}</div>
                <div className="flex items-center gap-1 mb-2">
                    <StarRating rating={Number(average)} size="w-5 h-5"/>
                </div>
                <p className="text-sm text-foreground/60">

                    {t(Localization("course_detail", "based_on_reviews"), {count: total})}
                </p>
            </div>

            <div className="space-y-2">
                {breakdown && Object.entries(breakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3 text-sm">
                        <span className="w-4">{key}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/>
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-400 transition-all"
                                style={{width: value > 0 && total ? `${(value / total) * 100}%` : 0}}
                            />
                        </div>
                        <span className="w-8 text-right text-foreground/60">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ReviewCard({review, refetchListReview, setReviewId,form}: Readonly<{
    review: ReviewResponse,
    refetchListReview: any,
    setReviewId: Dispatch<SetStateAction<number | null>>,
    form: UseFormReturn<{
        rating: number
        title: string
        comment: string
    }, any, {
        rating: number
        title: string
        comment: string
    }>

}>) {
    const {currentUser} = useAppSelector((state) => state.auth);
    const canAction = (currentUser?.role === EnumRole.ADMIN || review.user?.id === Number(currentUser?.id));
    const userName = `${review?.user?.firstName} ${review?.user?.lastName}`;
    const dateLabel = review?.createdAt
        ? formatDistanceToNow(new Date(review.createdAt), {addSuffix: true})
        : "";

    const [deleteReview, deleteReviewRes] = useDeleteReviewsMutation();



    return (
        <div className="border border-border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src={review?.user?.imageUrl} alt={userName}/>
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold">{userName}</p>
                        <span className="text-xs text-muted-foreground">{dateLabel}</span>
                    </div>

                    <div className="flex mb-3">
                        <StarRating rating={review.rating}/>
                    </div>

                    <p className="font-bold text-sm mb-1">{review.title}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>

                    <div className={'flex items-end justify-end '}>
                        {
                            canAction &&
                            <Button variant="outline" onClick={async () => {
                                review.course.id && await deleteReview({
                                    reviewId: review.id,
                                    courseId: review.course.id
                                }).unwrap();
                                refetchListReview()
                            }}
                                    className="mt-2">
                                {
                                    deleteReviewRes.isLoading
                                        ? <Loader2 className="h-4 w-4 animate-spin"/>
                                        : <Trash2 className="h-4 w-4"/>
                                }
                            </Button>
                        }
                        {
                            canAction &&
                            <Button variant="outline"
                                onClick={ () => {
                                    setReviewId(review.id);
                                    form.setValue('rating', review.rating);
                                    form.setValue('title', review.title);
                                    form.setValue('comment', review.comment);
                                } }
                            >
                                <Edit className="w-4 h-4 mr-2"/>
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function StarRating({rating, size = "w-4 h-4"}: Readonly<{ rating: number; size?: string }>) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`${size} ${
                        i < Math.round(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted/30 fill-muted/10'
                    }`}
                />
            ))}
        </div>
    );
}