import React from "react";
import { Navbar } from "./navbar";

const CustomLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CustomLayout;
