export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Dashboard Section
        </h2>
      </header>

      <main className="mx-auto max-w-5xl p-6">
        {children}
      </main>
    </div>
  );
}
