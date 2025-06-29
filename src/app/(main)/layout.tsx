import { ThemeProvider } from "next-themes";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* NavBar */}
      <Navbar />
      <div className="p-4">{children}</div>
      {/* Footer */}
    </ThemeProvider>
  );
}
