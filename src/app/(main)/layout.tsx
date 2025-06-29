export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      This is main layout
      {/* NavBar */}
      {children}
      {/* Footer */}
    </div>
  );
}
