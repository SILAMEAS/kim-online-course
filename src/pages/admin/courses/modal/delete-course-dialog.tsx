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
import {CourseResponse} from "@/lib/api/api.generated.ts";

interface IProps {
    deleteOpen: boolean;
    setDeleteOpen: (open: boolean) => void;
    courseToDelete: CourseResponse | null;
    handleDelete: () => void;
}

const DeleteCourseDialog = (props: IProps) => {
    const {deleteOpen, setDeleteOpen, handleDelete, courseToDelete} = props;
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
