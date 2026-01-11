export default function DashboardPage() {
  return (
    <section className="rounded-xl bg-white p-8 shadow">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Page</h1>

      <p className="mt-3 text-gray-600">
        This page uses a route-specific layout. Only routes under{" "}
        <code className="rounded bg-gray-100 px-1">/dashboard</code> are wrapped by
        this layout.
      </p>
    </section>
  );
}
