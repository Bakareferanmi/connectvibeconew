export const site = {
  name: "connectvibeco",
  legalName: "Connect eVibe Trust (Incorporated Trustees)",
  tagline: "Sustainable infrastructure · Community · Opportunity",
  shortTag: "Real solutions. Lasting impact.",
  description:
    "We connect people, ideas and resources to create resilient infrastructure and lasting social value.",
  email: "hello@connectvibeco.org",
  web: "connectvibeco.org",
  charityLine: "Registered charity in England and Wales",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "What we do", href: "/what-we-do" },
  { label: "Community", href: "/community" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Impact", href: "/impact" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const social = [
  { label: "Instagram", href: "https://instagram.com/connectvibeco" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/connectvibeco" },
  { label: "X", href: "https://x.com/connectvibeco" },
  { label: "YouTube", href: "https://youtube.com/@connectvibeco" },
] as const;

export const approach = [
  {
    key: "Build",
    title: "Build",
    text: "Sustainable infrastructure and retrofit that communities can actually use — low-carbon, climate-resilient, built to last.",
  },
  {
    key: "Connect",
    title: "Connect",
    text: "People, partners and resources in the same room. Local groups, public bodies, funders and enterprise, working as one.",
  },
  {
    key: "Empower",
    title: "Empower",
    text: "Skills, employment and enterprise so infrastructure creates livelihoods — not just buildings.",
  },
  {
    key: "Sustain",
    title: "Sustain",
    text: "Long-term impact and community ownership. We stay until the work belongs to the people it serves.",
  },
] as const;

export const pillars = [
  {
    slug: "sustainable-infrastructure",
    title: "Sustainable infrastructure",
    kicker: "01",
    summary:
      "Low-carbon, climate-resilient buildings, retrofit and civic infrastructure.",
    body: "From whole-house retrofit to new community buildings, we design and deliver assets that cut carbon, survive the climate we have, and cost less to run. Fabric-first. Local labour. Measurable performance.",
    image: "/images/engineer.jpg",
    points: [
      "Deep retrofit and fabric-first upgrades",
      "Climate-resilient new build",
      "Energy, water and public realm",
      "Net-zero pathway for existing stock",
    ],
  },
  {
    slug: "community-assets",
    title: "Community assets",
    kicker: "02",
    summary:
      "Schools, clinics, water, sanitation, public spaces and community facilities.",
    body: "Places people gather, learn, heal and play. We work with residents to specify, fund and deliver assets that stay in community hands — halls, hubs, gardens, sports and care spaces.",
    image: "/images/housing.jpg",
    points: [
      "Community hubs and halls",
      "Health and wellbeing spaces",
      "Water, sanitation and public realm",
      "Asset lock and community ownership",
    ],
  },
  {
    slug: "social-development",
    title: "Social development",
    kicker: "03",
    summary: "Education, skills, health, wellbeing and opportunity.",
    body: "Infrastructure is a means. We wrap every project with skills programmes, youth pathways, women's enterprise and wellbeing work so the building is never the whole story.",
    image: "/images/skills.jpg",
    points: [
      "Youth and women's programmes",
      "Skills academies on live sites",
      "Health, sport and wellbeing",
      "Local enterprise support",
    ],
  },
  {
    slug: "social-value",
    title: "Social value",
    kicker: "04",
    summary:
      "Local employment, enterprise, training and measurable community impact.",
    body: "We count what matters: jobs created, pounds kept local, tonnes of carbon avoided, hours of training, and whether people say the place feels like theirs. Social value is a design requirement, not a report at the end.",
    image: "/images/solar.jpg",
    points: [
      "Local labour and supply chain",
      "Apprenticeships on every site",
      "TOMs and SROI reporting",
      "Community wealth building",
    ],
  },
] as const;

export const stats = [
  { value: 24, suffix: "", label: "Communities reached" },
  { value: 8, suffix: "", label: "Infrastructure projects", pad: 2 },
  { value: 350, suffix: "+", label: "People engaged" },
  { value: 1.2, suffix: "m", prefix: "£", label: "Social value created", decimals: 1 },
] as const;

export type ProjectStatus = "live" | "delivery" | "coming";

export type Project = {
  slug: string;
  number: string;
  title: string;
  place: string;
  status: ProjectStatus;
  theme: string;
  summary: string;
  body: string;
  image: string;
  outcomes: string[];
  year: string;
};

export const projects: Project[] = [
  {
    slug: "riverside-retrofit",
    number: "01",
    title: "Riverside Retrofit",
    place: "Leeds",
    status: "live",
    theme: "Sustainable retrofit",
    summary:
      "A street-scale deep retrofit of 42 homes — warmer rooms, lower bills, and a skills academy on the doorstep.",
    body: "Working with residents and the local authority, we are delivering fabric-first upgrades, heat-pump ready systems, solar where roofs allow, and a street that finally feels looked-after. Every trade package includes an apprenticeship seat. The community energy group will own the generation assets.",
    image: "/images/retrofit.jpg",
    outcomes: [
      "42 homes in delivery",
      "Predicted 68% space-heat reduction",
      "12 retrofit technician apprentices",
      "Community energy vehicle in place",
    ],
    year: "2025–26",
  },
  {
    slug: "oak-community-hub",
    number: "02",
    title: "Oak Community Hub",
    place: "Birmingham",
    status: "delivery",
    theme: "Community infrastructure",
    summary:
      "A timber-and-brick hub with clinic rooms, a hall, kitchen and courtyard — designed with the people who will run it.",
    body: "Oak replaces a condemned prefab with a civic building that can host health clinics, youth sessions, worship, enterprise and a weekday café. The brief was written in six resident workshops. The asset will be held by a community land trust.",
    image: "/images/community-centre.jpg",
    outcomes: [
      "1,240 m² civic floor space",
      "Community land trust ownership",
      "Integrated health rooms",
      "18 local jobs in operation",
    ],
    year: "2025–27",
  },
  {
    slug: "north-greenway",
    number: "03",
    title: "North Greenway",
    place: "Manchester",
    status: "live",
    theme: "Green infrastructure",
    summary:
      "A 3.2 km walking and cycling spine through restored parkland, rain gardens and a safer route to school.",
    body: "North Greenway reconnects three neighbourhoods that a ring road had split. Rain gardens take the flood peak. Lighting, seating and play are specified with young people. Native planting is maintained by a resident steward crew we trained and pay.",
    image: "/images/greenway.jpg",
    outcomes: [
      "3.2 km active-travel spine",
      "1.4 ha of rain gardens",
      "Safer routes to three schools",
      "Resident steward crew of 10",
    ],
    year: "2024–26",
  },
  {
    slug: "mill-quarter",
    number: "04",
    title: "Mill Quarter",
    place: "Cardiff",
    status: "coming",
    theme: "Future projects",
    summary:
      "A mixed-tenure, low-carbon neighbourhood on a former mill — homes, workspace and a public dock garden.",
    body: "Mill Quarter is in co-design. We are assembling land, community shares and public partners for a neighbourhood that keeps the mill's brick bones, adds timber upper floors, and opens the dock as a public garden. Homes will be genuinely affordable. Workspace is reserved for local makers and care enterprises.",
    image: "/images/housing.jpg",
    outcomes: [
      "Co-design under way",
      "Community share offer 2027",
      "Mixed tenure, mixed use",
      "Dock garden as public realm",
    ],
    year: "2027—",
  },
];

export type EventKind =
  | "workshop"
  | "training"
  | "fundraising"
  | "conference"
  | "launch"
  | "community";

export type SiteEvent = {
  slug: string;
  title: string;
  kind: EventKind;
  date: string;
  end?: string;
  place: string;
  city: string;
  summary: string;
  body: string;
  image: string;
  past?: boolean;
  gallery?: string[];
};

export const events: SiteEvent[] = [
  {
    slug: "skills-for-green-jobs",
    title: "Skills for Green Jobs",
    kind: "training",
    date: "2026-10-18",
    place: "Oak Community Hub",
    city: "Birmingham",
    summary:
      "A one-day taster covering retrofit basics, site safety and how to apply for our technician pathway.",
    body: "Whether you are changing career or supporting a young person, this open training day is the front door to paid pathways on our live sites. Lunch provided. No prior experience required. Bring boots if you have them — we have spares if not.",
    image: "/images/skills.jpg",
  },
  {
    slug: "retrofit-open-day",
    title: "Riverside Retrofit Open Day",
    kind: "community",
    date: "2026-11-02",
    place: "Riverside Street",
    city: "Leeds",
    summary:
      "Walk a home mid-upgrade, meet the crew, and ask anything about bills, disruption and the resident offer.",
    body: "Residents leading residents. We'll have a show home, a kids' making table, and advisors on grants. Come for the tea, stay for the U-values.",
    image: "/images/retrofit.jpg",
  },
  {
    slug: "youth-climate-lab",
    title: "Youth Climate Lab",
    kind: "workshop",
    date: "2026-11-15",
    place: "North Greenway Pavilion",
    city: "Manchester",
    summary:
      "A weekend lab for 18–25 year olds mapping heat, flood and missing places — then pitching what to build next.",
    body: "Two days of mapping, making and pitching. Mentors from design, engineering and community organising. The strongest ideas feed our 2027 pipeline. Travel bursaries available.",
    image: "/images/greenway.jpg",
  },
  {
    slug: "partners-forum",
    title: "Partners Forum 2026",
    kind: "conference",
    date: "2026-12-04",
    place: "Civic Hall",
    city: "Leeds",
    summary:
      "A half-day for local authorities, housing providers, funders and community trusts. Practice, not panels.",
    body: "Short case studies, a live social-value clinic, and structured matchmaking. If you want to partner on infrastructure that creates opportunity, this is the room.",
    image: "/images/community-centre.jpg",
  },
  {
    slug: "winter-assembly",
    title: "Winter Assembly & Fundraiser",
    kind: "fundraising",
    date: "2027-01-22",
    place: "Town Warehouse",
    city: "Manchester",
    summary:
      "Supper, stories from residents, and a quiet ask. Tickets fund three apprenticeship seats.",
    body: "No black tie. Good food from a local kitchen, three short talks from people who live in the work, and a raffle of things we actually like. All proceeds to the skills fund.",
    image: "/images/aerial.jpg",
  },
  {
    slug: "riverside-launch",
    title: "Riverside Gardens Launch",
    kind: "launch",
    date: "2027-02-08",
    place: "Riverside",
    city: "Leeds",
    summary:
      "We open the street garden and the first ten completed homes. Residents host.",
    body: "A project launch that belongs to the street. Music, a keys ceremony that is actually just neighbours handing neighbours a plant, and the first look at the shared garden.",
    image: "/images/hero.jpg",
  },
  {
    slug: "harvest-gathering",
    title: "Harvest Gathering",
    kind: "community",
    date: "2026-09-14",
    place: "North Greenway",
    city: "Manchester",
    summary: "A late-summer neighbourhood gathering to mark the first mile of the greenway.",
    body: "Food, a short ride-out, and a photo wall. The day we stopped calling it a scheme and started calling it a street.",
    image: "/images/greenway.jpg",
    past: true,
    gallery: ["/images/greenway.jpg", "/images/aerial.jpg", "/images/skills.jpg"],
  },
  {
    slug: "apprentice-showcase",
    title: "Apprentice Showcase",
    kind: "training",
    date: "2026-07-03",
    place: "Training shed",
    city: "Birmingham",
    summary: "Eight apprentices presented live work from Riverside and Oak.",
    body: "Families, site managers and college tutors in one room. Two job offers were made before the tea flasks were empty.",
    image: "/images/skills.jpg",
    past: true,
    gallery: ["/images/skills.jpg", "/images/engineer.jpg", "/images/careers.jpg"],
  },
  {
    slug: "solar-school",
    title: "Solar School Switch-on",
    kind: "launch",
    date: "2026-05-21",
    place: "Parkside Primary roof — community array",
    city: "Cardiff",
    summary: "A community-owned array went live on a school roof.",
    body: "The first kilowatt-hour was celebrated with juice and a very serious ribbon. Generation now funds a breakfast club.",
    image: "/images/solar.jpg",
    past: true,
    gallery: ["/images/solar.jpg", "/images/housing.jpg", "/images/aerial.jpg"],
  },
];

export const eventKinds: { id: EventKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "community", label: "Community" },
  { id: "workshop", label: "Workshops" },
  { id: "training", label: "Training" },
  { id: "fundraising", label: "Fundraising" },
  { id: "conference", label: "Conferences" },
  { id: "launch", label: "Launches" },
];

export const communityProgrammes = [
  {
    title: "Youth pathways",
    text: "Climate labs, site tasters and paid traineeships for 18–25 year olds who want to build the places they live in.",
    image: "/images/skills.jpg",
  },
  {
    title: "Women's enterprise",
    text: "Peer circles, micro-grants and workspace for women starting care, food, making and retrofit businesses.",
    image: "/images/housing.jpg",
  },
  {
    title: "Skills on site",
    text: "Every live project carries a training shed — retrofit, joinery, planting, digital and site safety.",
    image: "/images/engineer.jpg",
  },
  {
    title: "Local enterprise",
    text: "We ring-fence spend for neighbourhood suppliers and help them tender. Wealth that stays put.",
    image: "/images/community-centre.jpg",
  },
] as const;

export const volunteerRoles = [
  {
    title: "Site welcomers",
    text: "Help residents on open days, pour tea, and make a building site feel like a street.",
  },
  {
    title: "Garden stewards",
    text: "Planting days on greenways and rain gardens. No expertise required — we teach.",
  },
  {
    title: "Skills mentors",
    text: "A few hours a month with trainees. Trades, professional services, and life admin all needed.",
  },
  {
    title: "Event crew",
    text: "Workshops, fundraisers and launches. The people who make the room work.",
  },
] as const;

export const stories = [
  {
    slug: "keys-and-kettles",
    title: "Keys, kettles and a street that talks again",
    place: "Leeds",
    date: "August 2026",
    excerpt:
      "Amira hosted the first Riverside open house. Twenty-six neighbours came. Two had never spoken.",
    image: "/images/retrofit.jpg",
  },
  {
    slug: "first-seat",
    title: "The first apprenticeship seat",
    place: "Birmingham",
    date: "July 2026",
    excerpt:
      "Jordan had been out of work eleven months. He is now setting out timber on Oak Hub — and teaching the next intake.",
    image: "/images/skills.jpg",
  },
  {
    slug: "after-the-flood",
    title: "After the flood, a garden that holds water",
    place: "Manchester",
    date: "June 2026",
    excerpt:
      "North Greenway's rain gardens took a 1-in-30 storm in May. The school field next door stayed dry.",
    image: "/images/greenway.jpg",
  },
] as const;

export type JobKind = "employed" | "volunteer" | "apprenticeship";

export type Job = {
  slug: string;
  title: string;
  kind: JobKind;
  location: string;
  type: string;
  team: string;
  closing: string;
  summary: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    slug: "project-manager-infrastructure",
    title: "Project Manager — Infrastructure",
    kind: "employed",
    location: "Leeds / hybrid",
    type: "Full-time",
    team: "Delivery",
    closing: "31 Oct 2026",
    summary:
      "Own live retrofit and civic projects from brief to handover. Residents in the room, social value in the programme.",
    points: [
      "3+ years delivering built projects",
      "Comfortable with public and community clients",
      "TOMs / social value reporting a plus",
    ],
  },
  {
    slug: "community-engagement-officer",
    title: "Community Engagement Officer",
    kind: "employed",
    location: "Birmingham / community-based",
    type: "Full-time",
    team: "Community",
    closing: "21 Oct 2026",
    summary:
      "Design and hold the rooms where people decide what gets built. Workshops, youth labs, partner tables.",
    points: [
      "Facilitation in mixed rooms",
      "Youth or women's programme experience welcome",
      "Evenings and occasional weekends",
    ],
  },
  {
    slug: "graduate-civil-engineer",
    title: "Graduate Civil Engineer",
    kind: "employed",
    location: "Manchester / hybrid",
    type: "Full-time",
    team: "Design",
    closing: "14 Nov 2026",
    summary:
      "Green infrastructure, drainage and public realm. A graduate seat with real drawings and a mentor who still goes to site.",
    points: [
      "Civil / environmental degree or equivalent",
      "Interest in SuDS and active travel",
      "Chartership pathway supported",
    ],
  },
  {
    slug: "retrofit-technician-apprentice",
    title: "Retrofit Technician Apprentice",
    kind: "apprenticeship",
    location: "Leeds sites",
    type: "Apprenticeship",
    team: "Skills",
    closing: "Rolling",
    summary:
      "Paid training on live homes. College day-release, site four days. Boots and tools provided.",
    points: [
      "No prior trade required",
      "Right to work in the UK",
      "Willingness to learn on a live street",
    ],
  },
  {
    slug: "volunteer-coordinator",
    title: "Volunteer Coordinator",
    kind: "employed",
    location: "Remote / travel",
    type: "Part-time, 3 days",
    team: "Community",
    closing: "28 Oct 2026",
    summary:
      "Build the volunteer engine across planting days, open houses and events. Careful logistics, warm people skills.",
    points: [
      "Volunteer management or events background",
      "DBS and safeguarding training provided",
      "CRM comfort (we will train)",
    ],
  },
  {
    slug: "garden-steward-volunteer",
    title: "Garden Steward — Volunteer",
    kind: "volunteer",
    location: "Manchester, Leeds, Birmingham",
    type: "Flexible",
    team: "Volunteers",
    closing: "Open",
    summary:
      "Monthly planting and care days on greenways and rain gardens. Come for a morning; stay for the flask of tea.",
    points: [
      "Any fitness level — roles are mixed",
      "Under-18s with an accompanying adult",
      "Tools and gloves on us",
    ],
  },
];

export const culture = [
  {
    title: "Build in public",
    text: "Residents see the drawings. Numbers are shared. We would rather be questioned than opaque.",
  },
  {
    title: "The site is the classroom",
    text: "Leaders still go to site. Trainees are not an add-on. If it cannot be taught, it is not finished.",
  },
  {
    title: "Kind, not soft",
    text: "We hold a high bar for craft and a high bar for how we speak to each other. Both, always.",
  },
  {
    title: "Stay until it belongs",
    text: "Handover is not a date in a programme. It is the moment a community can run the thing without us.",
  },
] as const;

export const contactPathways = [
  {
    id: "partner",
    title: "I want to partner",
    text: "Local authorities, housing providers, funders, contractors and community trusts.",
  },
  {
    id: "support",
    title: "I want to support a project",
    text: "Gifts, grants, community shares, or a skill you can lend.",
  },
  {
    id: "volunteer",
    title: "I want to volunteer",
    text: "Open days, planting, mentoring, events. A few hours that compound.",
  },
  {
    id: "project",
    title: "I have a community project",
    text: "Bring us a street, a building, a group. We'll tell you honestly if we can help.",
  },
  {
    id: "career",
    title: "I’m interested in a career",
    text: "Roles, apprenticeships and speculative notes. We read them.",
  },
  {
    id: "general",
    title: "General enquiry",
    text: "Anything else. Press, research, a question we have not listed.",
  },
] as const;

export type PathwayId = (typeof contactPathways)[number]["id"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}

export const upcomingEvents = events
  .filter((e) => !e.past)
  .slice()
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = events
  .filter((e) => e.past)
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));
