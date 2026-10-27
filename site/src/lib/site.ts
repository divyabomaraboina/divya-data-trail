import projectsJson from "@/data/projects.json";
import journeyJson from "@/data/journey.json";

export type Theme = { bg1: string; bg2: string; accent: string; accent2: string; ink: string };
export type Project = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  built: string;
  value: string;
  stack: string[];
  twists: { title: string; text: string }[];
  github: string;
  live: string;
  logo: string;
  theme: Theme;
};
export type Stop = {
  title: string;
  sub: string;
  mission: string;
  reward: string;
  thought: string;
  story: string;
};

export const projects = projectsJson as Project[];
export const journey = journeyJson as Stop[];

export const categories = [
  { name: "Professional Work", blurb: "Business problems solved inside real reporting, data-quality, geospatial and stakeholder workflows." },
  { name: "Industry-Sponsored Project", label: "Industry-Sponsored Projects", blurb: "Projects shaped by sponsor questions, operational constraints, and a real delivery context." },
  { name: "Personal & Academic Project", label: "Personal & Academic Projects", blurb: "End-to-end systems built to explore validation, forecasting, healthcare, NLP, BI, databases, and deployment." },
];

export const featuredSlugs = [
  "nexodus-automation",
  "nexodus-nlp",
  "anachart",
  "traxidy",
  "warehouse-intelligence",
  "hospital-readmission",
];

export const profile = {
  name: "Divya Bomaraboina",
  roles: ["Data Analyst", "Data Scientist", "Analytics Engineer"],
  email: "divya.bomaraboina22@gmail.com",
  linkedin: "https://www.linkedin.com/in/divyabomaraboina",
  github: "https://github.com/divyabomaraboina",
  location: "United States",
  tools: ["SQL", "Python", "Power BI", "R", "Tableau", "BERT", "XGBoost", "GeoPandas", "BigQuery", "PostgreSQL", "Prophet", "Streamlit"],
};

export const logoOrg: Record<string, string> = {
  "livingstones-mark.png": "Living Stones Foundation",
  "nexodus-mark.png": "Nexodus Inc.",
  "traxidy-mark.png": "Traxidy",
  "northeastern-mark.png": "Northeastern University",
};

export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${p}`;

export const pad = (n: number) => String(n).padStart(2, "0");
