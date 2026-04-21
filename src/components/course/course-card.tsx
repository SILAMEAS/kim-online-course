import {Link} from "react-router-dom";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Clock, Heart, Loader, Star, Users} from "lucide-react";
import {
    CourseResponse,
    useAddToWishlistMutation,
    useGetUserWishlistQuery,
    useRemoveFromWishlistMutation
} from "@/lib/api/api.generated.ts";
import {formatDurationVideo} from "@/lib/utils/formatDurationVideo.ts";
import {useAppSelector} from "@/lib/redux/hooks.ts";
import {cn} from "@/lib/utils.ts";
import {toast} from "sonner";

import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export function CourseCard({course}: Readonly<{ course: CourseResponse }>) {
    const {currentUser} = useAppSelector(state => state.auth)
    const [addWishlist, reAdd] = useAddToWishlistMutation();
    const [removeWishlist, reRemove] = useRemoveFromWishlistMutation();
    const {t} = useTranslation();
    const wishlistQuery = useGetUserWishlistQuery({userId: Number(currentUser?.id)}, {skip: !currentUser?.id});
    const levelColors = {
        BEGINNER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        INTERMEDIATE:
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        ADVANCE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    const checkedWishlist = () => {
        return wishlistQuery?.currentData?.contents?.find((item) => item.course.id === course.id);
    }
    const isLoading = wishlistQuery.isLoading || reAdd.isLoading || reRemove.isLoading;
    return (
        <div
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col relative">
            {/* Course Image */}
            <Button variant="outline" className={'absolute left-1 top-1 z-20 bg-green-200'} onClick={async (e) => {
                if (!currentUser) {
                    toast.warning("You must be logged in to add courses to your wishlist.");
                    return;
                }
                if (checkedWishlist()) {
                    await removeWishlist({
                        courseId: course.id,
                    }).unwrap();
                } else {
                    try {
                        await addWishlist({
                            courseId: course.id
                        }).unwrap();
                    } catch (e: any) {
                        return toast.error("Failed to add course to wishlist :" + e?.data?.message);
                    }
                }
                wishlistQuery.refetch();
                e.preventDefault();
                e.stopPropagation();
            }}>{
                isLoading ? <Loader/> :
                    <Heart
                        className={cn(checkedWishlist() ? 'fill-red-500' : '')}/>
            }
            </Button>
            <Link to={`/courses/${course.id}`}>
                {
                    course.imageUrl &&
                    <div className="relative w-full h-48 bg-secondary overflow-hidden">
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 right-3 bg-primary">
                            ${course.price}
                        </Badge>
                    </div>
                }


                {/* Course Content */}
                <div className="flex-1 p-4 flex flex-col">
                    {/* Category and Level */}
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                            {course?.category?.name}
                        </Badge>
                        {
                            course?.level &&
                            <Badge className={`text-xs ${levelColors[course.level]}`}>
                                {course.level}
                            </Badge>
                        }
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                        {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                        {course.description}
                    </p>

                    {/* Instructor */}
                    {
                        course.instructor &&
                        <div className="flex items-center gap-2 mb-4">
                            <div
                                className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                                {course.instructor?.firstName?.charAt(0)}
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-foreground/80">
                                    {course.instructor?.firstName} {course.instructor?.lastName}
                                </p>
                                <p className="text-xs text-foreground/60">
                                    {course.instructor?.role}
                                </p>
                            </div>
                        </div>
                    }


                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                            <span>{course.rating}</span>
                            <span className="text-xs">({0})</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4"/>
                            <span className="text-xs">
                {course?.studentsCount?.toLocaleString() ?? 0}
              </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4"/>
                            <span className="text-xs">{formatDurationVideo(Number(course.duration))}</span>
                        </div>
                    </div>

                    {/* Button */}
                    <Button className="w-full mt-auto" size="sm">
                        {t(Localization("course", "view_course"))}
                    </Button>
                </div>
            </Link>
        </div>
    );
}
