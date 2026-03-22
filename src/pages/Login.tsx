import {Link} from "react-router-dom";
import {LoginForm} from "@/components/auth/login-form";
import {useTranslation} from "react-i18next";

export default function LoginPage() {
    const {t}=useTranslation();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{t("loginPage.welcome")}</h2>
        <p className="text-foreground/60">
            {t("loginPage.login_continue_learning")}
        </p>
      </div>

      <LoginForm />

      <div className="text-center text-sm">
        <span className="text-foreground/60">{t("loginPage.not_have_acc")} </span>
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
            {t("form.sign_up")}
        </Link>
      </div>
    </div>
  );
}
