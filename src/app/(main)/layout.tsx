import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      {/* NavBar */}
      <Navbar />
      {children}
      {/* Footer */}
    </div>
  );
}
