import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";
export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-primary">
                {t(Localization("footer","learning_outcome"))}
              </span>
            </div>
            <p className="text-sm text-foreground/60">
              {t(Localization("footer","empowering_learners_worldwide"))}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t(Localization("footer","quick_links"))}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  {t(Localization("footer","browse_course"))}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  {t(Localization("footer","about_us"))}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  {t(Localization("footer","contact"))}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t(Localization("footer","categories"))}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/courses?category=Web Development"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  to="/courses?category=Data Science"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  Data Science
                </Link>
              </li>
              <li>
                <Link
                  to="/courses?category=Design"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  to="/courses?category=Business"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t(Localization("footer","contact"))}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-foreground/60">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>moeurkkimsour@gmail.com</span>
              </div>
              <div className="flex items-start gap-2 text-foreground/60">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+855 16 43 91 44 </span>
              </div>
              <div className="flex items-start gap-2 text-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cambodia , Battambang city</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {currentYear} Learning outcomes. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-primary transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
