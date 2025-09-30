export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Common header, nav, or styling for all movie pages */}
      <div className="text-4xl font-bold flex justify-center z-50">Navbar</div>
      <div className="container mx-auto">{children}</div>
      <div className="text-4xl font-bold flex justify-center">Footer</div>
    </div>
  );
}
