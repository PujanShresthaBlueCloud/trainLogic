import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {label: "About", href:"/about"},
  { label: "Services", 
    href: "#",
    submenu: [
      { label: "AI Chatbots", href: "/aichatbot"},
      { label: "AI Voice Agents", href: "/aivoiceagents"},
    ] },
  { label: " Pricing", href: "/pricing" },
  // {
  //   label: "Blog",
  //   href: "#",
  //   submenu: [
  //     { label: " BlogList", href: "/blog" },
  //     { label: "Blog Details", href: "/blog/blog_1" },
  //   ],
  // },
  { label: "Contact", href: "/contact" },
  // { label: "Docs", href: "/documentation#version" },
];
