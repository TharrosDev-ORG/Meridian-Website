import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <TransitionWrapper>
        {children}
      </TransitionWrapper>
      <Footer />
      <MobileMenu />
    </>
  );
}
