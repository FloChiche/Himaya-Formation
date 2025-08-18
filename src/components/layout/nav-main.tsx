import { NavLink } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";

type Item = { title: string; url: string; icon: LucideIcon };

export function NavMain({ items }: { items: Item[] }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            {/* 👇 NavLink gère l’état actif automatiquement */}
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2",
                  isActive ? "text-blue-600 font-semibold" : "",
                ].join(" ")
              }
              end={false}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
