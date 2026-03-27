export type NavDropdownItem = { href: string; label: string };

export type NavSection = {
  id: string;
  label: string;
  items: NavDropdownItem[];
};

export const SITE_NAV: NavSection[] = [
  {
    id: "about",
    label: "About",
    items: [
      { href: "/about", label: "About Us" },
      { href: "/about/core-values", label: "Core Values" },
      {
        href: "/about/problem-solving-approach",
        label: "Problem Solving Approach",
      },
      { href: "/about/team", label: "Team" },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      { href: "/services/web-design-ux", label: "Web Design & UX" },
      { href: "/services/web-development", label: "Web Development" },
      { href: "/services/website-maintenance", label: "Website Maintenance" },
      {
        href: "/services/mobile-app-development",
        label: "Mobile App Development",
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    items: [
      { href: "/work/industries", label: "Industries We Serve" },
      { href: "/work/featured-projects", label: "Featured Projects" },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    items: [
      { href: "/blog", label: "Blog" },
      { href: "/insights/industry", label: "Industry Insights" },
      { href: "/insights/guides", label: "Guides & Tutorials" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    items: [
      { href: "/contact/book-a-call", label: "Book a Call" },
      { href: "/contact/support", label: "Support" },
      { href: "/contact/locations", label: "Locations" },
    ],
  },
];
