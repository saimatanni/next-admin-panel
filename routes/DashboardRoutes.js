import { v4 as uuid } from "uuid";

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    link: "/",
  },
  {
    id: uuid(),
    title: "Cost Analysis",
    icon: "dollar-sign",
    link: "/cost-analysis",
  },
  {
    id: uuid(),
    title: "Applications",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Accounts",
    icon: "layers",
    children: [
      { id: uuid(), link: "/applications/leads", name: "Leads" },
      { id: uuid(), link: "/applications/opportunities", name: "opportunities" },

      { id: uuid(), link: "/applications/new-applications", name: "New Applications" },
      { id: uuid(), link: "/applications/all-applications", name: "All Applications" },
    ],
  },
  {
    id: uuid(),
    icon: "tag",
    title: "Commission Hub",
    children: [
      {
        id: uuid(),
        link: "/commission-hub/upfront-commission",
        name: "Upfront Commission",
      },
      { id: uuid(), link: "/commission-hub/residual", name: "Residuals" },
      {
        id: uuid(),
        link: "/commission-hub/commission-statement",
        name: "Commission statement",
      },
      { id: uuid(), link: "/commission-hub/clawbacks", name: "Clawbacks" },
    ],
  },

  {
    id: uuid(),
    title: "Others",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Invoice",
    icon: "file",
    link: "/invoice",
  },
  {
    id: uuid(),
    title: "Information Hub",
    icon: "edit",
    link: "/information-hub",
  },
  {
    id: uuid(),
    title: "Support",
    icon: "star",
    children: [
      { id: uuid(), link: "#", name: "Tickets" },
      { id: uuid(), link: "#", name: "Task" },
      {
        id: uuid(),
        link: "#",
        name: "Chat",
      },
    ],
  },
  {
    id: uuid(),
    title: "Calendar",
    icon: "calendar",
    link: "#",
  },
  {
    id: uuid(),
    title: "Change Password",
    icon: "lock",
    link: "#",
  },
  {
    id: uuid(),
    title: "Logout",
    icon: "power",
    link: "/authentication/sign-in",
  },
];

export default DashboardMenu;
