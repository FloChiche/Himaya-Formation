import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import ProtectedPage from "../pages/ProtectedPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import { AuthPage } from "@/pages/AuthPage.tsx";
import QuiSommesNous from "../pages/QuiSommesNous.tsx";
import NosFormations from "@/pages/NosFormations.tsx";
import NosFormateurs from "@/pages/NosFormateurs.tsx";
import SafetyDays from "@/pages/SafetyDays.tsx";

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
     
      {
        path: "/qui-sommes-nous",
        element: <QuiSommesNous />,
      },

      {
        path: "/nos-formations",
        element: <NosFormations />,
      },

      {
        path: "/nos-formateurs",
        element: <NosFormateurs />,
      },

      {
        path: "/safety-days",
        element: <SafetyDays />,
      },
      // Auth Protected routes

      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/protected",
            element: <ProtectedPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
