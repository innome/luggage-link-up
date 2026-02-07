import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Registro from "./pages/Registro";
import Entrar from "./pages/Entrar";
import Reservar from "./pages/Reservar";
import Preferencias from "./pages/Preferencias";
import Resumen from "./pages/Resumen";
import Pago from "./pages/Pago";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/entrar" element={<Entrar />} />
              <Route path="/reservar" element={<Reservar />} />
              <Route path="/reservar/preferencias" element={<Preferencias />} />
              <Route path="/reservar/resumen" element={<Resumen />} />
              <Route path="/reservar/pago" element={<Pago />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
