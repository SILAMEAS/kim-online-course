import {HTMLAttributes} from "react";
import TriggerTheme from "@/components/providers/theme/TriggerTheme.tsx";
import TriggerLanguage from "@/components/providers/i18n/TriggerLanguage.tsx";
import {cn} from "@/lib/utils.ts";

type ThemeLanguageProps = HTMLAttributes<HTMLDivElement>;

const ThemeLanguage = ({className, ...rest}: ThemeLanguageProps) => {
    return (
        <div
            {...rest}
            className={cn(
                "space-x-2.5 flex justify-center items-center",
                className
            )}
        >
            <TriggerTheme/>
            <TriggerLanguage/>
        </div>
    );
};

export default ThemeLanguage;