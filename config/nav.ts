import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon, Newspaper, User } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Explore Colloors", icon: Globe },
  { href: "/account", title: "Account", icon: User },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/posts",
        title: "My Posts",
        icon: Newspaper,
      },
    ],
  },
];
