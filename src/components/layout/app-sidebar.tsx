import { Link } from "react-router-dom";
import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  BarChartIcon,
  FolderIcon,
  UsersIcon,
  DatabaseIcon,
  ClipboardListIcon,
  FileIcon,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  BookOpen, // 👈 icône pour Formations (Admin)
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
    name: "flo.chiche",
    email: "flo.chiche@icloud.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Home", url: "/protected", icon: LayoutDashboardIcon },
    { title: "Nos formations", url: "/nos-formations", icon: ListIcon },
    { title: "Nos formateurs", url: "/nos-formateurs", icon: UsersIcon },
    { title: "Safety Day", url: "/safety-days", icon: BarChartIcon },
    // 👇 Onglet admin demandé
    { title: "Formations (Admin)", url: "/protected/admin/formations", icon: BookOpen },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: DatabaseIcon },
    { name: "Reports", url: "#", icon: ClipboardListIcon },
    { name: "Word Assistant", url: "#", icon: FileIcon },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: SettingsIcon },
    { title: "Get Help", url: "#", icon: HelpCircleIcon },
    { title: "Search", url: "#", icon: SearchIcon },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              {/* 👇 brand cliquable avec Link */}
              <Link to="/protected">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Himaya-Formation.ma</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
