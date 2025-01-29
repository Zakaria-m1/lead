export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 bg-gray-50 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
