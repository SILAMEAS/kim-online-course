import {useTranslation} from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

const TriggerLanguage = () => {
    const {i18n,} = useTranslation();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>{i18n.language?.toUpperCase()}</button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                sideOffset={5}
            >
                <DropdownMenuItem onSelect={() =>i18n.changeLanguage("en")}>
                    English
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={() =>i18n.changeLanguage("km")}>
                    ខ្មែរ
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TriggerLanguage;