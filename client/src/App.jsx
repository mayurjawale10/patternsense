// Root router — all application routes.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import ThemeSync from './components/common/ThemeSync.jsx';
import AuthProvider from './components/auth/AuthProvider.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AuthPage from './pages/Auth/index.jsx';
import DashboardPage from './pages/Dashboard/index.jsx';
import AnalysePage from './pages/Analyse/index.jsx';
import HintsPage from './pages/Hints/index.jsx';
import HintsLanding from './pages/Hints/HintsLanding.jsx';
import PatternsPage from './pages/Patterns/index.jsx';
import GeneratePage from './pages/Generate/index.jsx';
import CompaniesPage from './pages/Companies/index.jsx';
import InterviewPage from './pages/Interview/index.jsx';
import NotesPage from './pages/Notes/index.jsx';
import RoadmapPage from './pages/Roadmap/index.jsx';
import VisualiserPage from './pages/Visualiser/index.jsx';
import BlindSpotsPage from './pages/BlindSpots/index.jsx';
import BattlePage from './pages/Battle/index.jsx';
import ProfilePage from './pages/Profile/index.jsx';
import ComparePage from './pages/Compare/index.jsx';
import CompareLanding from './pages/Compare/CompareLanding.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ThemeSync />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/analyse" element={<ProtectedRoute><AnalysePage /></ProtectedRoute>} />
            <Route path="/hints" element={<ProtectedRoute><HintsLanding /></ProtectedRoute>} />
            <Route path="/hints/:problemId" element={<ProtectedRoute><HintsPage /></ProtectedRoute>} />
            <Route path="/patterns" element={<ProtectedRoute><PatternsPage /></ProtectedRoute>} />
            <Route path="/generate" element={<ProtectedRoute><GeneratePage /></ProtectedRoute>} />
            <Route path="/companies" element={<ProtectedRoute><CompaniesPage /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
            <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
            <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
            <Route path="/visualiser" element={<ProtectedRoute><VisualiserPage /></ProtectedRoute>} />
            <Route path="/blindspots" element={<ProtectedRoute><BlindSpotsPage /></ProtectedRoute>} />
            <Route path="/battle" element={<ProtectedRoute><BattlePage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/compare" element={<ProtectedRoute><CompareLanding /></ProtectedRoute>} />
            <Route path="/compare/:problemId" element={<ProtectedRoute><ComparePage /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
