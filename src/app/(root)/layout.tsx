import Navbar from "@/share/layout/navbar";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>
    <Navbar></Navbar>
    {children}
    </section>;
}
