import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar akan ditampilkan di sisi kiri pada layar medium ke atas */}
      <Sidebar />

      {/* Konten utama akan ada di sisi kanan */}
      <div className="flex flex-col">
        {/* Header akan berisi menu mobile dan dropdown user */}
        <Header />
        
        {/* 'children' adalah komponen halaman spesifik (misal: page.tsx untuk dashboard atau employees) */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}