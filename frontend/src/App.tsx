import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import RoutesPage from "./pages/Routes";
import Issues from "./pages/Issues";
import MapView from "./pages/MapView";
import Verification from "./pages/Verification";
import ChatBotPage from "./pages/ChatBotPage";
import ChatBotWidget from "./components/ChatBotWidget";
import NotFound from "./pages/NotFound";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/chat" element={<ChatBotPage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
