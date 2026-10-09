import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import QuoteSideTab from "@/components/global/QuoteSideTab";
import CookieConsent from "@/components/global/CookieConsent";

function ScrollHandler() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        if (lenis) {
          lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 50);
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    }
  }, [pathname, hash, lenis]);
  
  return null;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  const lenis = useLenis();

  useEffect(() => {
    if (isAdminRoute && lenis) {
      lenis.stop();
      return () => {
        lenis.start();
      };
    } else if (lenis) {
      lenis.start();
    }
  }, [isAdminRoute, lenis]);

  if (isAdminRoute) {
    return (
      <main data-lenis-prevent className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <ScrollHandler />
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <QuoteSideTab />
      <CookieConsent />
    </>
  );
}
