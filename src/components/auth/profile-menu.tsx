import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/redux/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BookMarked, LogOut, Settings, User} from "lucide-react";
import {useLogout} from "@/hooks/useLogout";

export function ProfileMenu() {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const {handleLogout} = useLogout();

    if (!currentUser) return null;

    const initials = currentUser.name
        .split(" ")
        .map((n: any) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name}/>
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-1">
                    <div className="text-sm font-semibold">{currentUser.name}</div>
                    <div className="text-xs text-foreground/60">{currentUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>

                <DropdownMenuItem asChild>
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <User className="w-4 h-4"/>
                        Dashboard
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        to="/dashboard/my-courses"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <BookMarked className="w-4 h-4"/>
                        My Courses
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Settings className="w-4 h-4"/>
                        Advance Manage
                    </Link>
                </DropdownMenuItem>


                <DropdownMenuSeparator/>

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-destructive cursor-pointer"
                >
                    <LogOut className="w-4 h-4"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
