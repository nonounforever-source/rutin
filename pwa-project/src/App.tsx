import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProvider, useApp } from "@/lib/store";
import { BottomNav } from "@/components/BottomNav";
import { HabitsPage } from "@/pages/Habits";
import { QuotesPage } from "@/pages/Quotes";
import { JournalPage } from "@/pages/Journal";
import { GoalsPage } from "@/pages/Goals";
import { CalendarPage } from "@/pages/Calendar";
import { OnboardingPage } from "@/pages/Onboarding";

function AppContent() {
  const [activeTab, setActiveTab] = useState("habits");
  const { settings } = useApp();

  if (settings.isFirstTime) {
    return <OnboardingPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 transition-colors duration-300 overflow-x-hidden">
      <main className="pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.32, 0.72, 0, 1] 
            }}
          >
            {activeTab === "habits" && <HabitsPage />}
            {activeTab === "quotes" && <QuotesPage />}
            {activeTab === "journal" && <JournalPage />}
            {activeTab === "goals" && <GoalsPage />}
            {activeTab === "calendar" && <CalendarPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
