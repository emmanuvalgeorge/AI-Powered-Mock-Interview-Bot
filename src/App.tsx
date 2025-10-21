import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { MockInterviewPage } from "./components/MockInterviewPage";
import { FeedbackPage } from "./components/FeedbackPage";
import { ResumeAnalysisPage } from "./components/ResumeAnalysisPage";

type Page = "landing" | "login" | "dashboard" | "interview" | "feedback" | "resume";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="size-full">
      {currentPage === "landing" && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === "login" && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === "dashboard" && <DashboardPage onNavigate={handleNavigate} />}
      {currentPage === "interview" && <MockInterviewPage onNavigate={handleNavigate} />}
      {currentPage === "feedback" && <FeedbackPage onNavigate={handleNavigate} />}
      {currentPage === "resume" && <ResumeAnalysisPage onNavigate={handleNavigate} />}
    </div>
  );
}
