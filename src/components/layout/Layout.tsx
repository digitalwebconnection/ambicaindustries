import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";
import QuoteSideTab from "../ui/QuoteSideTab";

function ScrollHandler() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);
  
  return null;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollHandler />
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <QuoteSideTab />
    </>
  );
}
