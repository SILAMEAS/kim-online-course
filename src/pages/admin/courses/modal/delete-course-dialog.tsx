import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {CourseResponse, useDeleteCourseByIdMutation} from "@/lib/api/api.generated.ts";
import {toast} from "sonner";

interface IProps {
    deleteOpen: boolean;
    setDeleteOpen: (open: boolean) => void;
    courseToDelete: CourseResponse | null;
    handleSuccess: () => void
    // handleDelete: () => void;
}

const DeleteCourseDialog = (props: IProps) => {
    const {deleteOpen, setDeleteOpen, courseToDelete, handleSuccess} = props;
    const [deleteCourse] = useDeleteCourseByIdMutation();
    const handleDelete = async () => {
        try {
            if (courseToDelete?.id) {
                await deleteCourse({courseId: courseToDelete.id}).unwrap();

            }
        } catch (e: any) {
            if (e?.originalStatus !== 200) {
                toast.error("Failed to delete course. Please try again later." + e?.data?.message);
            }
            toast.success("success to delete course");
            setDeleteOpen(false);
            handleSuccess();
        }
    };
    return <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete Course</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete "{courseToDelete?.title}"? This action
                    cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600">
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
};

export default DeleteCourseDialog;
