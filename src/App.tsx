import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { LandingPage } from "@/pages/LandingPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { NewProjectPage } from "@/pages/NewProjectPage"
import { AnalysisPage } from "@/pages/AnalysisPage"
import { AnalysisLoadingPage } from "@/pages/AnalysisLoadingPage"
import { HistoryPage } from "@/pages/HistoryPage"
import { ProfilePage } from "@/pages/ProfilePage"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/new-project" element={<NewProjectPage />} />
          <Route path="/projects/:id/loading" element={<AnalysisLoadingPage />} />
          <Route path="/projects/:id/analysis" element={<AnalysisPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
