import { Booking } from "@/components/site/booking";
import { BookingProvider } from "@/components/site/booking-context";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";
import { Fleet } from "@/components/site/fleet";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { MobileBar } from "@/components/site/mobile-bar";
import { Rates } from "@/components/site/rates";
import { Reviews } from "@/components/site/reviews";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <Fleet />
        <Rates />
        <HowItWorks />
        <Booking />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </BookingProvider>
  );
}
