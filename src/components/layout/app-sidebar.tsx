// src/components/layout/app-sidebar.tsx
import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  CalendarDaysIcon,
  GraduationCapIcon,
  UsersIcon,
  FileTextIcon,
  DatabaseIcon,
  ShieldIcon,
  HomeIcon,
  BookOpenIcon,
  UserSquare2Icon,
  FlameIcon,
  HelpCircleIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import { NavDocuments } from "@/components/layout/nav-documents";
import { NavMain } from "@/components/layout/nav-main";
import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser } from "@/components/layout/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  // 👇 NAV PRINCIPALE (Admin)
  navMain: [
    { title: "Dashboard (Admin)", url: "/protected/admin/dashboard", icon: LayoutDashboardIcon },
    { title: "Agenda (Admin)", url: "/protected/admin/agenda", icon: CalendarDaysIcon },
    { title: "Formations (Admin)", url: "/protected/admin/formations", icon: GraduationCapIcon },
    { title: "Formateurs (Admin)", url: "/protected/admin/formateurs", icon: UsersIcon },
    { title: "Documents (Admin)", url: "/protected/admin/documents", icon: FileTextIcon },
    { title: "Data (Admin)", url: "/protected/admin/data", icon: DatabaseIcon },
  ],

  // 👇 Liens rapides “Documents” (tu peux garder/retirer)
  documents: [
    { name: "Accueil", url: "/", icon: HomeIcon },
    { name: "Nos formations (public)", url: "/nos-formations", icon: BookOpenIcon },
    { name: "Nos formateurs (public)", url: "/nos-formateurs", icon: UserSquare2Icon },
    { name: "Safety Day (public)", url: "/safety-days", icon: FlameIcon },
  ],

  // 👇 Bas de barre
  navSecondary: [
    { title: "Paramètres", url: "#", icon: SettingsIcon },
    { title: "Aide", url: "#", icon: HelpCircleIcon },
    { title: "Recherche", url: "#", icon: SearchIcon },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/protected">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Himaya-Formation.ma</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Bloc Admin */}
        <NavMain items={data.navMain} />

        {/* Bloc liens publics / documents rapides */}
        <NavDocuments items={data.documents} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
