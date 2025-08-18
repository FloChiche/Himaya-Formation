// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";

// Providers (contexte, thème, session…)
import Providers from "@/Providers";

// Pages publiques
import HomePage from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import QuiSommesNous from "@/pages/QuiSommesNous";
import NosFormations from "@/pages/NosFormations";
import NosFormateurs from "@/pages/NosFormateurs";
import SafetyDays from "@/pages/SafetyDays";
import NotFoundPage from "@/pages/404Page";

// Auth guard
import AuthProtectedRoute from "./AuthProtectedRoute";

// Layout protégé (sidebar + Outlet)
import AppLayout from "@/components/layout/AppLayout";

// Page par défaut à droite (tu pourras remplacer par de vraies pages ensuite)
import ProtectedPage from "@/pages/ProtectedPage";
import FormationsAdmin from "@/pages/Admin/FormationsAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // ----- PUBLIC -----
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/qui-sommes-nous", element: <QuiSommesNous /> },
      { path: "/nos-formations", element: <NosFormations /> },
      { path: "/nos-formateurs", element: <NosFormateurs /> },
      { path: "/safety-days", element: <SafetyDays /> },

      // ----- PROTÉGÉ (avec sidebar) -----
      {
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/protected",
            element: <AppLayout />, // sidebar à gauche + <Outlet /> à droite
            children: [
              // /protected
              { index: true, element: <ProtectedPage /> },

              // Onglets de ta sidebar (tu peux remplacer ProtectedPage par d'autres pages)
              { path: "admin/formations", element: <FormationsAdmin /> },
              { path: "nos-formateurs", element: <ProtectedPage /> },
              { path: "safety-day", element: <ProtectedPage /> },
              { path: "espace", element: <ProtectedPage /> },

              // Documents
              { path: "data-library", element: <ProtectedPage /> },
              { path: "reports", element: <ProtectedPage /> },
              { path: "assistant", element: <ProtectedPage /> },

              // Secondaire
              { path: "settings", element: <ProtectedPage /> },
              { path: "help", element: <ProtectedPage /> },
              { path: "search", element: <ProtectedPage /> },
            ],
          },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
