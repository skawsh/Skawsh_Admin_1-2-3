
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Riders from "./pages/Drivers";
import NotFound from "./pages/NotFound";
import OrderAssignment from "./pages/OrderAssignment";
import RiderDetails from "./pages/DriverDetails";
import RiderOrdersDetails from "./pages/DriverOrdersDetails";
import RiderOnboarding from "./pages/DriverOnboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/riders" element={<Riders />} />
          <Route path="/rider/:driverId" element={<RiderDetails />} />
          <Route path="/rider/:driverId/orders" element={<RiderOrdersDetails />} />
          <Route path="/rider/onboarding" element={<RiderOnboarding />} />
          <Route path="/order-assignment" element={<OrderAssignment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
