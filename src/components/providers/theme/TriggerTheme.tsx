import {useTheme} from "@/components/providers/theme/theme-provider.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Moon, Sun} from "lucide-react";


const TriggerTheme = () => {
    const {theme, setTheme} = useTheme();
    return   <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button>{theme=='light'?<Sun size={20}/>:<Moon size={20}/>}</button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            sideOffset={5}
        >
            <DropdownMenuItem onSelect={() =>setTheme('light')}>
                Light
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() =>setTheme('dark')}>
                Dark
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() =>setTheme('system')}>
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
};

export default TriggerTheme;