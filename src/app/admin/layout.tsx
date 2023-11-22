import AdminLayoutProvider from "@/components/admin/AdminLayoutProvider";

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
