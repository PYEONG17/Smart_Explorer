import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CoursesSection from "@/components/home/CoursesSection";
import AISection from "@/components/home/AISection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

/**
 * Homepage: Composes all landing page sections.
 * Business logic stays in individual section components.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <AISection />
      <CTASection />
      <Footer />
    </>
  );
}
