// All portfolio content lives here. Edit this file to update the website — no backend needed.

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  headline: { value: number; prefix?: string; suffix?: string; label: string };
  summary: string;
  approach: string[];
  metrics: { value: string; label: string }[];
  channels: string[];
  proofId?: string;
}

export interface Proof {
  id: string;
  image: string;
  title: string;
  category: 'Lead Gen' | 'WhatsApp' | 'Awareness' | 'Traffic';
  highlight: string;
  caption: string;
  /** wide: double-width card · strip: short, extra-wide card that follows a thin screenshot's shape */
  layout?: 'wide' | 'strip';
}

export interface Role {
  title: string;
  company: string;
  location: string;
  period: string;
  intro: string;
  points: string[];
}

export const profile = {
  name: 'Hareesh Sapati',
  firstName: 'Hareesh',
  role: 'Digital Marketing Specialist',
  tagline: 'Performance Marketing · Social Media · Content Strategy',
  location: 'Hyderabad, India',
  email: 'hareeshsapati70634@gmail.com',
  phone: '+91 86398 06896',
  phoneRaw: '918639806896',
  linkedin: 'https://www.linkedin.com/in/hareesh-kumar1/',
  resume: 'files/Hareesh_Sapati_Resume.pdf',
  summary:
    'Results-driven digital marketer with 3+ years of experience in performance marketing, social media, content strategy and brand growth across 20+ industries. I plan, launch and optimise Meta and Google Ads campaigns that bring in real enquiries, not just impressions.',
  // About section. First line animates word by word; wrap a word in *asterisks* to highlight it.
  about: {
    lead: 'I started behind the *camera*, shooting, scripting and editing short-form content for brands and films.',
    body: 'Today I pair that creative eye with performance data, so every ad looks good, sells, and is tied to a measurable result.',
  },
};

export const heroStats: Stat[] = [
  { value: 5000, suffix: '+', label: 'Leads generated' },
  { value: 958, label: 'Qualified leads in 6 months' },
  { value: 2.7, suffix: 'M', label: 'People reached in one campaign' },
];

export const impactStats: Stat[] = [
  { value: 3, suffix: '+', label: 'Years in digital marketing' },
  { value:20, suffix: '+', label: 'Industries served' },
  { value: 10,suffix: '+',  label: 'Client accounts at a time' },
  { value: 1, prefix: '₹', suffix: 'L', label: 'Monthly ad budget handled' },
];

export const dashboard = {
  label: 'Ads Manager · Snapshot',
  rows: [
    { name: 'Lowest cost per link click', value: '₹0.78' },
    { name: 'Cost per WhatsApp conversation', value: '₹7.70' },
    { name: 'Cost per hiring enquiry', value: '₹5.22' },
    { name: 'Awareness cost per result', value: '₹3.61' },
  ],
  // Hover figures for the hero chart (WhatsApp leads per period). PLACEHOLDERS scaled to total 5,000 —
  // replace labels and values with the real numbers from Ads Manager.
  bars: [
    { label: 'Month 1', value: 276 },
    { label: 'Month 2', value: 378 },
    { label: 'Month 3', value: 320 },
    { label: 'Month 4', value: 494 },
    { label: 'Month 5', value: 443 },
    { label: 'Month 6', value: 574 },
    { label: 'Month 7', value: 523 },
    { label: 'Month 8', value: 654 },
    { label: 'Month 9', value: 610 },
    { label: 'Month 10', value: 728 },
  ],
};

export const brands = [
  { name: 'Cognitive Soft Tech', logo: 'images/brands/cognitive.png', dark: true },
  { name: 'Avina Technologies', logo: 'images/brands/avina.png' },
  { name: 'PR Edutech', logo: 'images/brands/pr-edutech.png' },
  { name: 'Orange Cafe', logo: 'images/brands/orange-cafe.png' },
  // scale: how far to zoom the logo inside its tile (default 1.4, for logos with lots of padding)
  { name: 'Vibrant Designs', logo: 'images/brands/vibrant-designs.png', dark: true, scale: 1.15 },
  { name: 'Unique Ads Media', logo: 'images/brands/unique-ads-media.png', scale: 0.85 },
  { name: 'Party Bash', logo: 'images/brands/party-bash.png', scale: 0.9 },
  { name: 'Flick N Fiesta', logo: 'images/brands/flick-n-fiesta.png', scale: 0.85 },
  { name: 'MBJ Jewellers', logo: 'images/brands/mbj-jewellers.jpg', scale: 1.1 },
  { name: 'Nirmala Hospital', logo: 'images/brands/nirmala-hospital.png', scale: 0.85 },
  { name: "Starlings Children's Hospital", logo: 'images/brands/starlings.png', scale: 0.85 },
  { name: 'Birthstories by Starlings', logo: 'images/brands/birthstories.png', scale: 0.85 },
  { name: 'Gadwal Weavers Society', logo: 'images/brands/gadwal-weavers.png', scale: 0.9 },
  { name: 'Prayas Concept Classes', logo: 'images/brands/prayas-concept-classes.png', scale: 0.9 },
  { name: 'Old Mumbai Ice Cream', logo: 'images/brands/old-mumbai-ice-cream.png', scale: 0.75 },
  // Add up to 20 logos: drop the file in public/images/brands/ and add a line here.
].slice(0, 20);

export const clientNames = [
  'WOW Aboard Consultancy',
  'Party Bash',
  'Flick N Fiesta',
  'Vibrant Designs',
  'Birthstories',
  'Unique Ads Media',
  'Nirmala Hospital',
  "Starlings Children's Hospital",
  'Hills and Lakes Tours & Travels',
  'Gadwal Weavers Society',
  'Prayas Concept Classes',
  'Old Mumbai Ice Cream',
  'MBJ Jewellers',
];

export const caseStudies: CaseStudy[] = [
  {
    client: 'WOW Aboard Consultancy',
    industry: 'Overseas Education',
    headline: { value: 958, label: 'qualified leads in 6 months' },
    summary:
      'An overseas education consultancy needed a steady pipeline of students actively planning to study abroad, not just casual clicks.',
    approach: [
      'Built Meta Instant Form campaigns with qualifying questions to filter intent',
      'Refined audience targeting around age, interests and study-abroad signals',
      'Tested and rotated ad creatives to keep lead quality and volume up',
    ],
    metrics: [
      { value: '958', label: 'Qualified leads' },
      { value: '6 mo', label: 'Timeframe' },
      { value: 'Instant Forms', label: 'Format' },
    ],
    channels: ['Meta Ads', 'Instant Forms', 'Audience Research'],
  },
  {
    client: 'Party Bash & Flick N Fiesta',
    industry: 'Entertainment & Events',
    headline: { value: 5000, suffix: '+', label: 'WhatsApp leads' },
    summary:
      'Private party and event venues wanted booking enquiries to land directly in WhatsApp, where their team closes sales fastest.',
    approach: [
      'Ran click-to-WhatsApp campaigns split by location (KPHB, Manikonda)',
      'Designed flyer-style creatives for events and occasions',
      'Scaled winners: several campaigns flagged "High performing" by Meta',
    ],
    metrics: [
      { value: '2,800+', label: 'Conversations (9 campaigns shown)' },
      { value: '₹9.87', label: 'Lowest cost / conversation' },
      { value: '₹1.58L', label: 'Spend managed' },
    ],
    channels: ['Meta Ads', 'Click-to-WhatsApp', 'Creative Direction'],
    proofId: 'entertainment',
  },
  {
    client: 'Vibrant Designs',
    industry: 'Interior Design',
    headline: { value: 200, suffix: '+', label: 'qualified leads' },
    summary:
      'An interior design studio needed homeowners with real renovation budgets. It is a high-ticket service where every lead matters.',
    approach: [
      'Lead form campaigns aimed at homeowners and new-flat buyers',
      'Showcase creatives of completed interiors to set quality expectations',
      'Continuous budget reallocation toward the lowest cost-per-lead ad sets',
    ],
    metrics: [
      { value: '341K+', label: 'Reach' },
      { value: '640K+', label: 'Impressions' },
      { value: '₹144', label: 'Best cost per lead' },
    ],
    channels: ['Meta Ads', 'Lead Forms', 'Local Targeting'],
    proofId: 'vibrant',
  },
  {
    client: 'Birthstories',
    industry: 'Brand Awareness',
    headline: { value: 2.7, suffix: 'M', label: 'people reached' },
    summary:
      'A brand-awareness push to put the brand in front of as many relevant people as possible, as cost-efficiently as possible.',
    approach: [
      'Broad awareness campaign optimised for reach',
      'Monitored age & gender distribution to understand the responding audience',
      'Kept cost per result under ₹4 across segments',
    ],
    metrics: [
      { value: '2,728,739', label: 'Total reach' },
      { value: '₹3.61', label: 'Cost per result' },
      { value: '18–34', label: 'Core audience' },
    ],
    channels: ['Meta Ads', 'Awareness', 'Audience Insights'],
    proofId: 'awareness',
  },
];

// Branding feeds shown under "Selected work". Images are tall grids of posts (public/images/branding/).
export const branding = [
  {
    brand: 'Old Mumbai Ice Cream',
    industry: 'Food & Dessert',
    image: 'images/branding/old-mumbai-ice-cream.jpg',
    note: 'Pureeka flavour launches, product hero shots and playful topical posts.',
  },
  {
    brand: 'WOW Study',
    industry: 'Overseas Education',
    image: 'images/branding/wow-study.jpg',
    note: 'MBBS-abroad lead creatives, counselling posts and destination campaigns.',
  },
  {
    brand: 'Nirmala Hospital',
    industry: 'Healthcare',
    image: 'images/branding/nirmala-hospital.jpg',
    note: 'Maternity & orthopaedic awareness, health days and doctor-led content.',
  },
  {
    brand: 'Cognitive Soft Tech',
    industry: 'Digital Agency',
    image: 'images/branding/cognitive.jpg',
    note: 'Agency brand identity, service promos and hiring creatives.',
  },
];

export const proofs: Proof[] = [
  {
    id: 'awareness',
    layout: 'wide',
    image: 'images/proof/awareness-reach.jpeg',
    title: 'Awareness campaign: 2.7M reach',
    category: 'Awareness',
    highlight: '2,728,739 reach',
    caption: 'Birthstories awareness campaign with age & gender breakdown. Cost per result ₹3.61 (men) and ₹3.74 (women).',
  },
  {
    id: 'entertainment',
    image: 'images/proof/entertainment-whatsapp.jpeg',
    title: 'Click-to-WhatsApp: entertainment venues',
    category: 'WhatsApp',
    highlight: '2,800+ conversations',
    caption: '9 location-based campaigns, three flagged "High performing" by Meta. ₹1,58,498 total spend managed.',
  },
  {
    id: 'traffic',
    image: 'images/proof/instagram-link-clicks.jpeg',
    title: 'Instagram boosts: link clicks',
    category: 'Traffic',
    highlight: '₹0.78 per click',
    caption: 'Instagram post promotions delivering ~4,000 link clicks, plus automobile lead-form and marketplace campaigns.',
  },
  {
    id: 'hiring',
    image: 'images/proof/lead-hiring-campaigns.jpeg',
    title: 'Lead, hiring & page-growth campaigns',
    category: 'Lead Gen',
    highlight: '₹5.22 per enquiry',
    caption: 'Recruitment campaigns (welder hiring, vacancy leads), form leads at ₹33.90 and 200 page follows at ₹6.94.',
  },
  {
    id: 'messaging',
    image: 'images/proof/messaging-campaigns.jpeg',
    title: 'Messaging & lead campaigns',
    category: 'WhatsApp',
    highlight: '301 conversations',
    caption: 'Multi-campaign messaging setup for a local business, generating 350+ conversations across campaigns.',
  },
  // Last row: three short "strip" cards for the thin screenshots
  {
    id: 'vibrant',
    layout: 'strip',
    image: 'images/proof/vibrant-lead-forms.jpeg',
    title: 'Lead forms: Vibrant Interior Design',
    category: 'Lead Gen',
    highlight: '165 form leads',
    caption: 'Three lead-form campaigns reaching 341K+ people with 640K+ impressions and CPM as low as ₹30.65.',
  },
  {
    id: 'sales',
    layout: 'strip',
    image: 'images/proof/sales-conversations.jpeg',
    title: 'Sales conversations campaign',
    category: 'WhatsApp',
    highlight: '1,022 chats at ≤ ₹10',
    caption: 'Two sales campaigns driving 1,022 messaging conversations at ₹7.70 – ₹10.24 each on a ₹300/day budget.',
  },
  {
    id: 'overseas',
    layout: 'strip',
    image: 'images/proof/overseas-lead-campaigns.jpeg',
    title: 'Overseas education lead campaigns',
    category: 'Lead Gen',
    highlight: '953 form leads',
    caption: 'Ten study-abroad lead campaigns (USA, Canada, Uzbekistan) with cost per lead as low as $1.02 on ~$2,050 spend.',
  },
];

export const experience: Role[] = [
  {
    title: 'Social Media Manager',
    company: 'Cognitive Soft Tech',
    location: 'Hyderabad',
    period: 'Feb 2024 – Jul 2026',
    intro: 'End-to-end digital & social media marketing for 15–20 active clients across 18+ industries.',
    points: [
      'Planned, managed and optimised Meta Ads and Google Ads for lead generation and brand awareness, handling budgets up to ₹1 lakh per month.',
      'Generated 5,000+ WhatsApp leads, 958 qualified leads in 6 months for an overseas education consultancy, and 200+ qualified leads for an interior design company.',
      'Built content strategies and calendars across Instagram, Facebook, LinkedIn and YouTube: Reels, carousels, videos, statics and flyers.',
      'Ran audience, competitor, keyword and market research to sharpen targeting and support data-driven decisions.',
      'Managed Google Business Profile, Local SEO, YouTube SEO, Google Analytics and Search Console, with regular client reports and insights.',
      'Coordinated designers, video editors, clients and team members to deliver campaigns on time.',
    ],
  },
  {
    title: 'Content Creator & Digital Marketing Executive',
    company: 'Dim Light Creations',
    location: 'Hyderabad',
    period: 'May 2022 – Jan 2024',
    intro: 'Content strategy, branding and video production for brands, freelance clients and short films.',
    points: [
      'Developed content strategies and creative concepts for brands across Education, Home Décor, Food & Hospitality, Lifestyle and Entertainment.',
      'Planned weekly and monthly content calendars covering ideation, campaign themes, scheduling, publishing and community communication.',
      'Led branding work: positioning, creative direction, visual identity and social media strategy.',
      'Scripted, planned shoots, produced and edited short-form videos, reels, teasers and campaign creatives.',
      'Worked as a videographer on short films, covering visual planning, camera work, framing and promotional campaigns.',
    ],
  },
];

export const skillGroups = [
  {
    title: 'Performance Marketing',
    icon: 'target',
    skills: ['Meta Ads', 'Google Ads', 'Lead Generation', 'Campaign Optimization', 'Paid Social', 'Audience Targeting', 'Conversion Optimization', 'Budget Management'],
  },
  {
    title: 'Social Media Marketing',
    icon: 'social',
    skills: ['Social Media Strategy', 'Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Community Management', 'Content Distribution', 'Reels Strategy'],
  },
  {
    title: 'Content Marketing',
    icon: 'pen',
    skills: ['Content Strategy', 'Content Calendars', 'Copywriting', 'Creative Direction', 'Brand Building', 'Campaign Planning', 'Visual Content Strategy'],
  },
  {
    title: 'SEO & Analytics',
    icon: 'chart',
    skills: ['Keyword Research', 'Local SEO', 'YouTube SEO', 'Google Analytics', 'Search Console', 'Performance Reporting', 'Competitor Analysis', 'Audience Research'],
  },
];

export const tools = [
  'Meta Ads Manager', 'Meta Business Suite', 'Google Ads', 'LinkedIn Campaign Manager',
  'Google Analytics', 'Google Search Console', 'Google Business Profile', 'SEMrush', 'Ahrefs',
  'Canva', 'CapCut', 'ChatGPT', 'Claude',
];

export const process = [
  { step: '01', title: 'Research', text: 'Audience, competitor, keyword and market research to find where the demand really is.' },
  { step: '02', title: 'Strategy', text: 'Goals, funnels, channels and budgets mapped to the business outcome: leads, sales or reach.' },
  { step: '03', title: 'Create', text: 'Scroll-stopping Reels, carousels, flyers and copy, planned in a content calendar.' },
  { step: '04', title: 'Launch', text: 'Meta & Google campaigns with clean structure, tracking and the right objective.' },
  { step: '05', title: 'Optimise', text: 'Daily monitoring, creative testing and budget shifts toward what converts.' },
  { step: '06', title: 'Report', text: 'Clear reports and insights so clients see exactly what their money delivered.' },
];

export const education = {
  degree: 'Bachelor of Commerce',
  school: 'Kakatiya University, Warangal',
  year: 'May 2022',
  gpa: '7.5',
};
