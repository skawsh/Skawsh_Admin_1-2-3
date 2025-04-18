
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Drivers from "./pages/Drivers";
import Orders from "./pages/Orders"; // Added import for Orders page
import NotFound from "./pages/NotFound";
import OrderAssignment from "./pages/OrderAssignment";
import DriverDetails from "./pages/DriverDetails";
import DriverOrdersDetails from "./pages/DriverOrdersDetails";
import DriverOnboarding from "./pages/DriverOnboarding";
import OrderDetails from "./pages/OrderDetails";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/orders" element={<Orders />} /> {/* Added route for Orders page */}
          <Route path="/driver/:driverId" element={<DriverDetails />} />
          <Route path="/driver/:driverId/orders" element={<DriverOrdersDetails />} />
          <Route path="/driver/onboarding" element={<DriverOnboarding />} />
          <Route path="/order-assignment" element={<OrderAssignment />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
