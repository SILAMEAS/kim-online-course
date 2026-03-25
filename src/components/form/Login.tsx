import {Link} from "react-router-dom";
import {LoginForm} from "@/components/auth/login-form.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export default function LoginPage() {
    const {t}=useTranslation();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
          <h2 className="text-3xl font-bold">{t(Localization("loginPage", "welcome"))}</h2>
        <p className="text-foreground/60">
            {t(Localization("loginPage", "login_continue_learning"))}
        </p>
      </div>

      <LoginForm />

      <div className="text-center text-sm">
          <span className="text-foreground/60">{t(Localization("loginPage", "not_have_acc"))} </span>
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
            {t(Localization("form","sign_up"))}
        </Link>
      </div>
    </div>
  );
}
