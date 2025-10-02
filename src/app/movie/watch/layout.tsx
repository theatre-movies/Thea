import { Navbar } from "@/components/Navbar";

export default function WatchMovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen space-y-2 w-full">
      {/* Common header, nav, or styling for all movie pages */}
      <div className="z-100 w-full">
        <Navbar />
      </div>

      {children}
    </div>
  );
}
