import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
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
                Learning outcomes
              </span>
            </div>
            <p className="text-sm text-foreground/60">
              Empowering learners worldwide with world-class courses and expert
              instruction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-foreground/60 hover:text-primary transition"
                >
                  Contact
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
            <h4 className="font-semibold mb-4 text-foreground">Categories</h4>
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
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-foreground/60">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>support@Learning outcomes.app</span>
              </div>
              <div className="flex items-start gap-2 text-foreground/60">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2 text-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {currentYear} Learning outcomes. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
