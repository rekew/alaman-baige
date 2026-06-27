import Header from "./layouts/Header";
import HeroSection from "./sections/HeroSection";
import StatisticsSection from "./sections/StatisticsSection";
import TopHorsesSection from "./sections/TopHorsesSection";
import LeaderboardPreviewSection from "./sections/LeaderboardPreviewSection";
import UpcomingEventsSection from "./sections/UpcomingEventsSection";
import CommunitySection from "./sections/CommunitySection";
import Footer from "./layouts/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <StatisticsSection />
        <TopHorsesSection />
        <LeaderboardPreviewSection />
        <UpcomingEventsSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
