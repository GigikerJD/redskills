import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footers";
import { Header } from "../components/Headers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RedSkillProvider } from "./AppProvider";

export const Layout = () => {
  const appQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true
      }
    }
  });

  return (
    <QueryClientProvider client={appQueryClient}>
      <RedSkillProvider>
        <div id="main-content" className="flex flex-col min-h-screen w-full">
          <Header />
          <main id="main-layout" className="relative grow shrink flex-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      </RedSkillProvider>
    </QueryClientProvider>
  );
};