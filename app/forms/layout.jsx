import Navbar from "@/components/Navbar";

export const metadata = {
  title: "FormFlow – Build Forms Fast",
  description: "Create, share, and analyze forms with ease",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh - 60px)]">{children}</main>
    </>
  );
}
