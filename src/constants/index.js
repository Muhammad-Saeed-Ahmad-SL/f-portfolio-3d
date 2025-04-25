import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  solutionsloft,
  ntdc,
  eventzero,
  edily,
  tripguide,
  metavivor,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Front-end Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Solutionsloft",
    icon: solutionsloft,
    iconBg: "#383E56",
    date: "Feb 2022 - Apr 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "MERN stack Developer",
    company_name: "NTDC(National Transmission and dispatch company)",
    icon: ntdc,
    iconBg: "#E6DEDD",
    date: "May 2023 - Aug 2023",
    points: [
      "Assisting in the design and implementation of new features for NTDC's web products, such as dashboards and other applications.",
      "Handling frontend and backend tasks, crafting user-friendly React interfaces, and implementing robust Node.js and Express.js backends",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Solutionsloft",
    icon: solutionsloft,
    iconBg: "#E6DEDD",
    date: "September 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js for frontend and Node.js for backend development",
      "Collaborating with the team to define user stories and requirements, ensuring alignment with project objectives.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Integrating third-party libraries and APIs to enhance the functionality and features of the applications.",
      "Participating actively in code reviews, providing valuable feedback to enhance the overall code quality and maintain best practices.",
      "Embracing Agile methodologies to facilitate efficient project management and ensure timely delivery of high-quality software.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Susan Fitzgerald",
    designation: "CEO",
    company: "Huddle Agency",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "EventZero",
    description:
      "Web-based carbon calculation tool made for event planners by event planners to make measuring the impact of events a breeze!",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "styled-component",
        color: "pink-text-gradient",
      },
    ],
    image: eventzero,
    source_code_link: "https://github.com/Muhammad-Saeed-Ahmad-SolutionsLoft",
  },
  {
    name: "Edily",
    description:
      "Web application Short-form learning videos for Gen-Z students. Built by education-passionate creators. Co-creating the future of education.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: edily,
    source_code_link: "https://github.com/Muhammad-Saeed-Ahmad-SolutionsLoft",
  },
  {
    name: "METAvivor",
    description:
      "Web application for METAvivor, non-profit organization dedicated to increasing awareness of advanced breast cancer and equity in research and patient support.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: metavivor,
    source_code_link: "https://github.com/Muhammad-Saeed-Ahmad-SolutionsLoft",
  },
];

export { services, technologies, experiences, testimonials, projects };
