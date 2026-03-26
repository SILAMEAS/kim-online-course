import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/auth/register-form.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export default function RegisterPage() {
    const {t} = useTranslation();
    return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{t(Localization("form","create_account"))}</h2>
        <p className="text-foreground/60">
            {t(Localization("loginPage","start_your_learning"))}
        </p>
      </div>

      <RegisterForm />

      <div className="text-center text-sm">
        <span className="text-foreground/60">{t(Localization("loginPage","already_have_an_account"))} </span>
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          {t(Localization("form","sign_in"))}
        </Link>
      </div>
    </div>
  );
}
