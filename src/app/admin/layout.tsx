import AdminLayoutProvider from "@/components/AdminLayoutProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminLayoutProvider>{children}</AdminLayoutProvider>
    </>
  );
}
