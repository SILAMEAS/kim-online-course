import {useTheme} from "@/components/providers/theme/theme-provider.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Moon, Sun} from "lucide-react";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";


const TriggerTheme = () => {
    const {theme, setTheme} = useTheme();
    const {t} = useTranslation();
    return   <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button>{theme=='light'?<Sun size={20}/>:<Moon size={20}/>}</button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            sideOffset={5}
        >
            <DropdownMenuItem onSelect={() =>setTheme('light')}>
                {t(Localization("form","light"))}
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() =>setTheme('dark')}>
                {t(Localization("form","dark"))}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() =>setTheme('system')}>
                {t(Localization("form","system"))}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
};

export default TriggerTheme;