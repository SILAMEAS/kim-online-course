import { Navbar } from "@/components/navbar.tsx";
import { Footer } from "@/components/footer.tsx";

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default CustomLayout;
