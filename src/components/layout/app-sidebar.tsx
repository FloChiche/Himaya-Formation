// src/components/layout/app-sidebar.tsx
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard as LayoutDashboardIcon,
  CalendarClock as CalendarIcon,
  GraduationCap as GraduationIcon,
  Users as UsersIcon,
  FileText as FileTextIcon,
  Database as DatabaseIcon,
  ChevronDown,
  Layers as LayersIcon,
  List as ListIcon,
  BookOpen as BookOpenIcon,
  Folder as FolderIcon,
  FileStack as FileStackIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  Search as SearchIcon,
  ArrowUpCircle as ArrowUpCircleIcon,
} from "lucide-react";

import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (href: string) =>
    href === "/protected"
      ? path === "/protected" || path === "/protected/"
      : path.startsWith(href);

  // Ouvrir "Data" automatiquement si on est déjà dans /protected/admin/...
  const [openData, setOpenData] = React.useState(
    path.startsWith("/protected/admin")
  );

  const mainNav = [
    { label: "Dashboard", to: "/protected", icon: LayoutDashboardIcon },
    { label: "Agenda", to: "/protected/admin/agenda", icon: CalendarIcon },
    { label: "Formations", to: "/protected/admin/formations", icon: GraduationIcon },
    { label: "Formateurs", to: "/protected/admin/formateurs", icon: UsersIcon },
    { label: "Documents", to: "/protected/admin/documents", icon: FileTextIcon },
  ];

  const dataChildren = [
    { label: "Références",        to: "/protected/admin/references",        icon: FileTextIcon },
    { label: "Thématiques",       to: "/protected/admin/thematiques",       icon: LayersIcon },
    { label: "Catégories",        to: "/protected/admin/categories",        icon: ListIcon },
    { label: "Footer",            to: "/protected/admin/footer",            icon: FileTextIcon },
    { label: "SafetyActivities",  to: "/protected/admin/safety-activities", icon: FolderIcon },
    { label: "Catalogues",        to: "/protected/admin/catalogues",        icon: BookOpenIcon },
    { label: "Documents",         to: "/protected/admin/documents",         icon: FileStackIcon },
  ];

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      {/* Brand */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/protected" aria-label="Aller au Dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Himaya-Formation.ma</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* MAIN */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)}>
                    <Link to={item.to} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* DATA (dépliant) */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <button
              type="button"
              onClick={() => setOpenData((v) => !v)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="inline-flex items-center gap-2">
                <DatabaseIcon className="h-4 w-4" />
                <span>Data</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openData ? "rotate-180" : ""}`}
              />
            </button>
          </SidebarGroupLabel>

          {openData && (
            <SidebarGroupContent>
              <SidebarMenu>
                {dataChildren.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={isActive(item.to)}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* SECONDARY */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Autres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/protected/settings")}>
                  <Link to="/protected/settings">
                    <SettingsIcon className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/protected/help")}>
                  <Link to="/protected/help">
                    <HelpCircleIcon className="h-4 w-4" />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/protected/search")}>
                  <Link to="/protected/search">
                    <SearchIcon className="h-4 w-4" />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User */}
      <SidebarFooter>
        <NavUser user={{ name: "Admin", email: "admin@himaya.ma", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
