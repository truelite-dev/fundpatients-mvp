export type TeamMember = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  focus: string;
  city: string;
  founder?: boolean;
  bio: string;
  /** Pull-quote shown in the spotlight panel. */
  quote: string;
  /** Portrait in /public. Falls back to the monogram when omitted. */
  photo?: string;
  /** Tailwind gradient classes for the monogram fallback. */
  tone: string;
};

// Placeholder content — swap names, bios, quotes and photos for the real team.
// Current photos in /public/images/team are Unsplash stock images standing in for headshots.
export const team: TeamMember[] = [
  {
    slug: "adaeze-okonkwo",
    photo: "/images/team/adaeze-okonkwo.jpg",
    name: "Adaeze Okonkwo",
    initials: "AO",
    role: "Co-founder & CEO",
    focus: "Vision & strategy",
    city: "Lagos",
    founder: true,
    bio: "Former health-tech product lead at Helium Health. Adaeze started FundPatients after watching her cousin's cancer treatment stall because the family couldn't pay the upfront deposit. She sets the company's direction, leads fundraising and partnerships at board level, and still reads a sample of case files every week to stay close to the families the platform serves.",
    quote: "We didn't want to build a charity. We wanted to build infrastructure.",
    tone: "from-brand-deep-green to-brand-forest",
  },
  {
    slug: "tunde-bello",
    photo: "/images/team/tunde-bello.jpg",
    name: "Tunde Bello",
    initials: "TB",
    role: "Co-founder & CTO",
    focus: "Payments & platform",
    city: "Lagos",
    founder: true,
    bio: "Ex-engineering lead at Flutterwave. Tunde architected our payments and medical-partner verification infrastructure — the backbone that keeps every transaction safe. He leads a small engineering team focused on reliability and fraud prevention, and built the audit trail that lets donors trace each naira from gift to hospital invoice.",
    quote: "Trust is a feature. We ship it every single day.",
    tone: "from-brand-forest to-brand-deep-green",
  },
  {
    slug: "ngozi-eze",
    photo: "/images/team/ngozi-eze.jpg",
    name: "Ngozi Eze",
    initials: "NE",
    role: "Head of Partnerships",
    focus: "Hospital network",
    city: "Abuja",
    bio: "Ten years in hospital administration. Ngozi built our network of verified medical institutions and leads the clinical review process for every case on the platform. She negotiates directly with hospital finance teams so deposits are paid straight to the institution, and trains partner staff to submit accurate treatment plans and cost breakdowns.",
    quote: "A case only goes live when the hospital stands behind it.",
    tone: "from-emerald-700 to-brand-forest",
  },
  {
    slug: "emeka-nwachukwu",
    photo: "/images/team/emeka-nwachukwu.jpg",
    name: "Emeka Nwachukwu",
    initials: "EN",
    role: "Head of Operations",
    focus: "Fund disbursement",
    city: "Lagos",
    bio: "Operations veteran from Access Bank's foundation arm. Emeka ensures funds move within 24 hours of a case being approved and that every patient receives timely follow-up. He owns reconciliation and disbursement, runs the weekly review of every open case, and set up the check-in calls that reach families once treatment begins.",
    quote: "Speed is compassion when a family is counting days.",
    tone: "from-lime-700 to-brand-forest",
  },
  {
    slug: "fatima-sule",
    photo: "/images/team/fatima-sule.jpg",
    name: "Fatima Sule",
    initials: "FS",
    role: "Community & Trust",
    focus: "Donors & storytelling",
    city: "Kano",
    bio: "Worked with USAID on healthcare equity programmes across West Africa. Fatima leads donor trust, case storytelling, and everything that makes FundPatients feel human. She works with families to tell their stories with consent and dignity, edits every appeal before it goes live, and writes the donor updates that show what each gift made possible.",
    quote: "Behind every case is a person. We write stories, not statistics.",
    tone: "from-teal-700 to-brand-forest",
  },
  {
    slug: "chike-obi",
    photo: "/images/team/chike-obi.jpg",
    name: "Chike Obi",
    initials: "CO",
    role: "Design & Product",
    focus: "Experience design",
    city: "Lagos",
    bio: "Former designer at Paystack. Chike obsesses over making the donation experience feel as light and trustworthy as possible. He leads design and product, from the first sketch of a case page to the final checkout, and tests each release with real donors and patients' families so nothing confusing makes it into the product.",
    quote: "Giving should take thirty seconds and feel like it mattered.",
    tone: "from-green-600 to-brand-forest",
  },
  {
    slug: "dr-halima-bakare",
    photo: "/images/team/dr-halima-bakare.jpg",
    name: "Dr. Halima Bakare",
    initials: "HB",
    role: "Chief Medical Advisor",
    focus: "Clinical verification",
    city: "Abuja",
    bio: "Consultant physician with 15 years across teaching hospitals. Halima sets the clinical standards every case is reviewed against before it reaches a single donor. She chairs the medical advisory panel, signs off on the review checklist, and steps in personally when a diagnosis or treatment plan needs a second opinion.",
    quote: "If we can't verify the diagnosis, we don't publish the appeal.",
    tone: "from-cyan-700 to-brand-forest",
  },
];
