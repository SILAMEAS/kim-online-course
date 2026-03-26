import {Link, Outlet} from "react-router-dom";
import {BookOpen} from "lucide-react";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";
import ThemeLanguage from "@/components/ThemeLanguage.tsx";

export default function AuthLayout() {
    const {t} = useTranslation();
    return (
        <div className="min-h-screen flex flex-col md:flex-row h-full">
            <ThemeLanguage className={"fixed right-4 top-4  "}/>
            {/* Left Side - Branding */}
            <div className="hidden md:flex md:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-8">
                <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
                    <BookOpen className="w-8 h-8"/>
                    Learning outcomes
                </Link>

                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        {t(Localization("loginPage","welcome_to_learning_outcomes"))}
                    </h1>
                    <p className="text-lg opacity-90">
                        {t(Localization("loginPage","join_our_website"))}
                    </p>
                </div>

                <div className="text-sm opacity-75">
                    <p>&copy; 2024 Learning outcomes. All rights reserved.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md">
                    <div className="md:hidden mb-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-bold text-xl text-primary"
                        >
                            <BookOpen className="w-6 h-6"/>
                            Learning outcomes
                        </Link>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
