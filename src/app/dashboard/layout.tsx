"use client";

import Header from "@/src/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex ">
      <Header />
      {children}
    </div>
  );
}
