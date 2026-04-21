import React from 'react';
import {Button} from '@/components/ui/button';
import {Plus, Video} from 'lucide-react';
import {
    Category,
    CourseResponse,
    useDeleteCourseByIdMutation,
    useListAllCoursesQuery
} from "@/lib/api/api.generated.ts";
import {AddEditCourseDialog} from "@/pages/admin/courses/add-edit-course-dialog.tsx";
import {CustomTable} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {toast} from "sonner";
import {formatDurationVideo} from "@/lib/utils/formatDurationVideo.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {formatWord} from "@/lib/utils/FormatWord.ts";
import {useNavigate} from "react-router-dom";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";


export default function AdminCoursesPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {
        filter,
        setFilter,
    } = useCustomTable<CourseResponse>();
    const {
        currentData,
        refetch,
        isLoading,
        isFetching
    } = useListAllCoursesQuery(filter, {refetchOnMountOrArgChange: true,});
    const courses = currentData?.contents || [];
    const [open, setOpen] = React.useState(false);
    const [deleteCourse, resultDeleteCourse] = useDeleteCourseByIdMutation();
    const [selectedCourse, setSelectedCourse] = React.useState<CourseResponse | null>(null);

    const handleAdd = () => {
        setSelectedCourse(null);
        setOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{t(Localization("dashboard", "courses"))}</h1>
                    <p className="text-muted-foreground mt-1">{t(Localization("dashboard", "manage_all_course"))}</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4"/>
                    {t(Localization("actions", "add_course"))}
                </Button>
            </div>

            <CustomTable<CourseResponse>
                setFilter={setFilter}
                filter={filter}
                columns={[
                    {key: 'title', label: 'Title', sortable: true},
                    {
                        key: 'category', label: 'Category', sortable: true, render: (r) => {
                            return <p>{(r as Category)?.name}</p>
                        }
                    },
                    {
                        key: 'level', label: 'Level', sortable: true, render: (r) => {
                            return <p>{formatWord(r as string)}</p>
                        }
                    },
                    {key: 'price', label: 'Price', sortable: true},
                    {
                        key: 'duration', label: 'Duration', sortable: true, render: (r) => {
                            return <p>{formatDurationVideo(Number(r))}</p>
                        }
                    },
                    {
                        key: 'studentsCount', label: 'Students', sortable: true, render: (r) => {
                            return <p>{Number(r)}</p>
                        }
                    },
                    {
                        key: 'status', label: 'Status', sortable: true, render: (r) => {
                            return <Badge
                                key={r as string}
                                variant={r === "DRAFT" ? "destructive" : "outline"}
                            >
                                {formatWord((r as string))}
                            </Badge>
                        }
                    },
                ]}
                data={courses}
                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                onEdit={async (course) => {
                    setSelectedCourse(course);
                    setOpen(true);
                }}
                onDelete={async (course) => {
                    try {
                        if (course?.id) {
                            await deleteCourse({courseId: course.id}).unwrap();
                        }
                    } catch (e: any) {
                        if (e?.originalStatus !== 200) {
                            toast.error("Failed to delete course. Please try again later." + e?.data?.message);
                        }
                        toast.success("success to delete course");
                        refetch();
                    }
                }}
                quickAction={(row) => <Button
                    onClick={() => navigate(`/admin/videos?courseId=${row.id}`)} variant={"outline"}><Video/></Button>}
                isLoading={isLoading || isFetching}
                isDeleting={resultDeleteCourse.isLoading}

            />

            {/* Add/Edit Dialog */}
            <AddEditCourseDialog open={open} onOpenChange={setOpen} selectedCourse={selectedCourse}
                                 handleSuccess={() => {
                                     refetch();
                                     setOpen(false);
                                     setSelectedCourse(null);
                                 }}/>

        </div>
    );
}
