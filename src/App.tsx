
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import VideoSchedulePage from "./pages/VideoSchedulePage";
import VideoChatPage from "./pages/VideoChatPage";
import FriendsPage from "./pages/FriendsPage";
import TalentSearchPage from "./pages/TalentSearchPage";
import TalentRegisterPage from "./pages/TalentRegisterPage";
import VideoClassesPage from "./pages/VideoClassesPage";
import ReservationsPage from "./pages/ReservationsPage";
import TalentDetailPage from "./pages/TalentDetailPage";
import "./animations.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:id" element={<MessagesPage />} />
          <Route path="/video-schedule" element={<VideoSchedulePage />} />
          <Route path="/video-chat" element={<VideoChatPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/talent-search" element={<TalentSearchPage />} />
          <Route path="/talent-register" element={<TalentRegisterPage />} />
          <Route path="/video-classes" element={<VideoClassesPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/talent/:id" element={<TalentDetailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
