import "@/styles/globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "Hotel Booking App",
  description: "A full-stack hotel booking application with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <SessionProvider>
          <Header />
          <main className="pt-20 flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
