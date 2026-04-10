export type LicMainServiceLink = {
  href: string;
  label: string;
};

export type LicMainServiceBox = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  overlayTitle: string;
  overlayText: string;
  links: LicMainServiceLink[];
};

export const LIC_MAIN_SERVICE_BOXES: LicMainServiceBox[] = [
  {
    title: "Web Design",
    imageSrc: "/assets/webimg.png",
    imageAlt: "",
    overlayTitle: "Web Design",
    overlayText:
      "Clean, conversion-first interfaces that feel effortless on every screen size. We craft layouts that guide attention and turn browsing into action.",
    links: [
      { href: "#", label: "UX audits" },
      { href: "#", label: "Design systems" },
      { href: "#", label: "Rapid prototypes" },
    ],
  },
  {
    title: "Development",
    imageSrc: "/assets/devimg.png",
    imageAlt: "",
    overlayTitle: "Development",
    overlayText:
      "Fast, stable builds with performance baked in. From landing pages to custom apps, we ship clean code that scales.",
    links: [
      { href: "#", label: "Frontend engineering" },
      { href: "#", label: "API integrations" },
      { href: "#", label: "Performance tuning" },
    ],
  },
  {
    title: "Mobile Apps",
    imageSrc: "/assets/mobileimg.png",
    imageAlt: "",
    overlayTitle: "Mobile Apps",
    overlayText:
      "Thoughtful app experiences that keep users moving. We design flows that feel intuitive and perform like native.",
    links: [
      { href: "#", label: "iOS and Android" },
      { href: "#", label: "Launch strategy" },
      { href: "#", label: "Ongoing support" },
    ],
  },
  {
    title: "Digital Strategy",
    imageSrc: "/assets/digitalimg.png",
    imageAlt: "",
    overlayTitle: "Digital Strategy",
    overlayText:
      "A clear roadmap for growth across channels. We align your brand, content, and tech stack into a measurable plan.",
    links: [
      { href: "#", label: "Positioning" },
      { href: "#", label: "Content planning" },
      { href: "#", label: "Analytics setup" },
    ],
  },
];
