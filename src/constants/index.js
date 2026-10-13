import {
  solutionsloft,
  ntdc,
  intelliscence,
  transistor,
  brandpulse,
  eventzero,
  polypo,
  edily,
  metavivor,
  smartfaktura,
  tubetycoon,
  restaurant,
  tapatcare,
  mail,
  profitpilot,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "projects", title: "Work" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Product development",
    description:
      "I can take a SaaS idea from the database design all the way to a working app that people use every day.",
  },
  {
    title: "Frontend and UI",
    description:
      "Clean, responsive React and Next.js interfaces that match the design closely, with animation where it actually helps.",
  },
  {
    title: "Backend and APIs",
    description:
      "Node.js and NestJS services, webhooks, background jobs and connections to the third-party tools your team already uses.",
  },
  {
    title: "AI and automation",
    description:
      "Chatbots, LLM features and n8n workflows that take repetitive manual work off your team's plate.",
  },
];

const stats = [
  { value: "4+", label: "Years shipping" },
  { value: "11", label: "Products live" },
  { value: "4", label: "Teams" },
];

/** Short list for the scrolling marquees */
const marqueeSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "Node.js",
  "Three.js",
  "Tailwind",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "Docker",
  "LLMs",
];

const skillGroups = [
  {
    title: "Frontend",
    items: [
      "Angular",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Responsive Web Design",
      "Component-Based Architecture",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Python",
      "FastAPI",
      "Flask",
      "Django",
      "REST API Design & Integration",
      "Webhooks",
      "Cron Jobs",
    ],
  },
  {
    title: "Architecture",
    items: [
      "Microservices",
      "System Design",
      "Event-Driven Architecture",
      "Monolith",
      "Monorepo",
      "Caching",
      "Job Queues",
      "BullMQ",
    ],
  },
  {
    title: "Data",
    items: [
      "SQL",
      "NoSQL",
      "MongoDB",
      "Database & Schema Design",
      "Query Optimization",
      "Indexing",
    ],
  },
  {
    title: "AI & Automation",
    items: [
      "Generative AI",
      "LLM Integration",
      "RAG",
      "Chatbots",
      "Digital Human",
      "Workflow Automation",
      "n8n",
    ],
  },
  {
    title: "Quality & Delivery",
    items: [
      "Unit Testing",
      "TDD",
      "Sonar",
      "Git",
      "GitHub",
      "PR Reviews",
      "Docker",
      "Deployments",
      "Jira",
      "ClickUp",
      "Slack",
    ],
  },
];

const experiences = [
  {
    title: "Full-Stack Engineer, Product UI",
    company_name: "Transistor Tech",
    icon: transistor,
    iconBg: "#08090a",
    date: "Oct 2026 to Present",
    points: [
      "I build B2B marketing websites in Next.js, from page design through to launch on Vercel or Cloudflare.",
      "I connect forms to the CRM, set up GA4 and Google Tag Manager, and check that every conversion is actually recorded.",
      "I fix the technical SEO: indexing, meta tags, sitemaps, schema, redirects, plus llms.txt so AI assistants can read the site too.",
      "I turn page designs into reusable components and written rules, so the client's team can add pages later without breaking the site.",
    ],
  },
  {
    title: "Software Engineer, promoted to Senior Software Engineer",
    company_name: "Solutionsloft",
    icon: solutionsloft,
    iconBg: "#151030",
    date: "Nov 2022 to Sep 2026",
    points: [
      "I build full features across the stack with React, Next.js and Node.js, for client projects and our own products.",
      "My work covers dashboards, sign-up and login flows, integrations, admin tools and marketing websites.",
      "I work closely with designers and product managers to plan milestones, run demos and hand projects over cleanly.",
      "I review pull requests and help the team keep the codebase in good shape.",
    ],
  },
  {
    title: "Software Engineer Intern (MERN)",
    company_name: "National Transmission & Despatch Company (NTDC)",
    icon: ntdc,
    iconBg: "#1d1836",
    date: "Jun 2023 to Aug 2023",
    points: [
      "Worked on internal web apps and dashboards for Pakistan's national power transmission company.",
      "Built React screens connected to Node.js and Express APIs.",
      "Worked with other teams on responsive layouts and kept clear notes on every change I made.",
      "Learned how software is planned, built and reviewed inside a large organisation.",
    ],
  },
  {
    title: "Frontend Developer Trainee",
    company_name: "Intelliscence",
    icon: intelliscence,
    iconBg: "#0B1F3A",
    date: "Jun 2022 to Oct 2022",
    points: [
      "Built real user interfaces with HTML, CSS, JavaScript and React as part of a client delivery team.",
      "Turned designs into responsive pages and reusable components.",
      "Learned a lot from senior engineers through code reviews and their feedback.",
      "Got used to working from tickets and shipping in small, regular steps.",
    ],
  },
];

/** Real client work described plainly, not invented quotes */
const testimonials = [
  {
    testimonial:
      "I converted 12 ClickFunnels pages into responsive HTML and CSS for Daniel Brock's Tube Tycoon and Deadbeat sites, including the main sales funnels and the AI series pages. The whole job was delivered as one fixed milestone and paid in full.",
    name: "Tube Tycoon page migration",
    designation: "Client delivery",
    company: "tubetycoon.com",
    image: "",
  },
  {
    testimonial:
      "I built the marketing website for SmartFaktura, an invoicing app. The aim was to explain the product simply and lay out the page so visitors naturally end up signing up.",
    name: "SmartFaktura website",
    designation: "Website build",
    company: "SmartFaktura",
    image: "",
  },
];

const certificates = [
  {
    name: "JavaScript Programming Essentials",
    issuer: "IBM on Coursera",
    credentialId: "84DJFU6HEK5B",
    url: "https://www.coursera.org/account/accomplishments/verify/84DJFU6HEK5B",
  },
  {
    name: "Front-end Development with React",
    issuer: "Credly",
    credentialId: "XMNG4B9P99GV",
    url: "https://www.credly.com/badges/455b5e9e-dfde-4498-a210-840cb108ffa1/linked_in_profile",
  },
  {
    name: "Web Development with HTML, CSS, JavaScript Essentials",
    issuer: "Credly",
    credentialId: "MB69T8VHSX3W",
    url: "https://www.credly.com/badges/03e0de33-37a4-41b0-a41a-2e30a8831829/linked_in_profile",
  },
  {
    name: "Node and Express Essentials",
    issuer: "Credly",
    credentialId: "CRC55BTUHYFU",
    url: "https://www.credly.com/badges/60dc0b0d-cf06-4fa4-a635-0db36181dd4e/linked_in_profile",
  },
];

const projects = [
  {
    name: "EventZero",
    description:
      "A carbon reporting platform for event companies. Teams enter data from their events and suppliers, the system works out the emissions, and the dashboards and reports are ready for an audit.",
    tags: [
      { name: "next.js" },
      { name: "rules engine" },
      { name: "integrations" },
      { name: "saas" },
    ],
    image: eventzero,
    live_demo_link: "https://eventzero.io/",
    role: "Full-stack development",
  },
  {
    name: "BrandPulse",
    description:
      "A research platform that helps brands and agencies test their ads by watching how real audiences react. It includes attention testing, audience targeting, dashboards and reports for leadership teams.",
    tags: [
      { name: "next.js" },
      { name: "react" },
      { name: "analytics" },
      { name: "saas" },
    ],
    image: brandpulse,
    live_demo_link: "https://brandpulse-analytics.com/",
    role: "Full-stack development",
  },
  {
    name: "Polypo",
    description:
      "Fit and sizing technology for fashion brands. Shoppers get better size advice and can see how clothes will fit before they buy, so brands deal with fewer returns.",
    tags: [
      { name: "react" },
      { name: "product ui" },
      { name: "ai ux" },
      { name: "ecommerce" },
    ],
    image: polypo,
    live_demo_link: "https://polypo.io/",
    role: "Frontend development",
  },
  {
    name: "Tapat Care",
    description:
      "A home care platform that helps families find and hire caregivers. It covers browsing services, matching with the right caregiver and choosing how to hire.",
    tags: [
      { name: "next.js" },
      { name: "product" },
      { name: "marketplace" },
    ],
    image: tapatcare,
    live_demo_link: "https://stage.tapatcare.com/",
    role: "Full-stack development",
  },
  {
    name: "Restaurant Billing System",
    description:
      "Billing and order management for Dining Lounge B.B.Q & Karahi. The staff use it every day for bills, tables and orders, with a NestJS API running behind it.",
    tags: [
      { name: "next.js" },
      { name: "nestjs" },
      { name: "pos" },
      { name: "billing" },
    ],
    image: restaurant,
    live_demo_link: "https://billing-system-frontend-psi.vercel.app/",
    role: "Full-stack development",
  },
  {
    name: "Transistor Mail",
    description:
      "A private webmail app for transistor-tech.com. The team can send and receive email from several company addresses without paying for a mailbox service.",
    tags: [
      { name: "next.js" },
      { name: "nestjs" },
      { name: "postgres" },
      { name: "email" },
    ],
    image: mail,
    live_demo_link: "https://mail.transistor-tech.com/login",
    role: "Full-stack development",
  },
  {
    name: "ProfitPilot",
    description:
      "A shared money ledger for business partners. Each partner records what they promised to invest, what they actually put in and what was spent, so everyone can see how much cash is left.",
    tags: [
      { name: "next.js" },
      { name: "mongodb" },
      { name: "finops" },
    ],
    image: profitpilot,
    live_demo_link: "https://expense-system-navy.vercel.app/app",
    role: "Full-stack development",
  },
  {
    name: "SmartFaktura",
    description:
      "The marketing website for SmartFaktura, an invoicing and accounting app for businesses in Rwanda. It explains what the product does and guides visitors toward creating an account.",
    tags: [
      { name: "next.js" },
      { name: "landing" },
      { name: "saas" },
    ],
    image: smartfaktura,
    live_demo_link: "https://smartfaktura.tech/",
    role: "Frontend development",
  },
  {
    name: "Tube Tycoon",
    description:
      "I moved the Tube Tycoon and Deadbeat sales pages off ClickFunnels and rebuilt them in responsive HTML and CSS. They look the same as before, work well on phones and run on the client's own hosting.",
    tags: [
      { name: "html/css" },
      { name: "responsive" },
      { name: "migration" },
    ],
    image: tubetycoon,
    live_demo_link: "https://tubetycoon.com/",
    role: "Frontend development",
  },
  {
    name: "Edily",
    description:
      "A short video learning app for Gen Z. Creators post educational clips, and learners follow learning maps and a discovery feed to find what to watch next.",
    tags: [
      { name: "react" },
      { name: "edtech" },
      { name: "rest api" },
    ],
    image: edily,
    live_demo_link: "https://edily.io/",
    role: "Frontend and full-stack",
  },
  {
    name: "METAvivor",
    description:
      "A web app for METAvivor, a nonprofit focused on metastatic breast cancer. It supports their awareness, research funding and patient support work.",
    tags: [
      { name: "react" },
      { name: "supabase" },
      { name: "nonprofit" },
    ],
    image: metavivor,
    live_demo_link: "",
    role: "Frontend development",
  },
];

export {
  services,
  stats,
  marqueeSkills,
  skillGroups,
  experiences,
  testimonials,
  certificates,
  projects,
};
