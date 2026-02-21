import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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
