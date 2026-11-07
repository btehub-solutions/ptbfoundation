export interface Project {
  id: string
  title: string
  date: string
  month: string
  year: number
  description: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'educational-outreach-nov-2024',
    title: 'Educational Outreach',
    date: 'Nov 11, 2024',
    month: 'November',
    year: 2024,
    description:
      '400 students - Distributed educational materials and inspired learning.',
    image: '/assets/gallery/launch/launch-pupils-celebration.webp',
  },
  {
    id: 'correctional-facility-visit-nov-2024',
    title: 'Correctional Facility Visit',
    date: 'Nov 28, 2024',
    month: 'November',
    year: 2024,
    description:
      '600 inmates - Welfare support and motivational rehabilitation sessions.',
    image: '/assets/gallery/outreach/correctional-facility-visit.webp',
  },
  {
    id: 'media-awareness-special-people-dec-2024',
    title: 'Media Awareness and Support for Special People',
    date: 'Dec 18, 2024',
    month: 'December',
    year: 2024,
    description:
      'Featured on OGTV Special People Compass and Splash FM Akanda Program to announce support for people with disabilities.',
    image: '/assets/gallery/radio/radio-studio.jpg',
  },
  {
    id: 'toloko-village-food-relief-dec-2024',
    title: 'Toloko Village Food Relief',
    date: 'Dec 19, 2024',
    month: 'December',
    year: 2024,
    description:
      '20 households - Food support to underserved families.',
    image: '/assets/gallery/outreach/village-delivery.jpg',
  },
  {
    id: 'special-people-feeding-aid-dec-2024',
    title: "Special People's Feeding Aid",
    date: 'Dec 25, 2024',
    month: 'December',
    year: 2024,
    description:
      '30 individuals - Feeding for people with disabilities.',
    image: '/assets/gallery/special-people/volunteers-special-needs.jpg',
  },
  {
    id: 'genai-fellowship-interview-support-jul-2025',
    title: 'GenAI Fellowship Interview Support',
    date: 'Jul 19, 2025',
    month: 'July',
    year: 2025,
    description:
      '100+ participants - Managed hospitality, snacks for the GenAI fellowship programme organised by the Hon Minister of Innovation, Communication, and Digital Economy.',
    image: '/assets/gallery/outreach/ogun-state-visit.jpg',
  },
  {
    id: 'build-a-thon-holiday-camp-aug-2025',
    title: 'Build-A-Thon Holiday Camp',
    date: 'Aug 4 & 14, 2025',
    month: 'August',
    year: 2025,
    description:
      '2,000 students - Holiday Camp (NCC Digital Innovation Park) provided refreshments and coordination during the 4-week tech and innovation holiday training.',
    image: '/assets/gallery/education/students-devices.jpg',
  },
  {
    id: 'skills-acquisition-yali-aug-2025',
    title: '3-Day Skills Acquisition Program - Partnered with YALI',
    date: 'Aug 21, 2025',
    month: 'August',
    year: 2025,
    description:
      '70 students - Training on Leadership, SDGs, AI, Photography, Social Media Marketing, Batik, and Tie-Dye.',
    image: '/assets/gallery/skills/yali-group-photo.jpg',
  },
  {
    id: 'uk-donor-birthday-outreach-nov-2025',
    title: 'UK Donor Birthday Outreach',
    date: 'Nov 5, 2025',
    month: 'November',
    year: 2025,
    description:
      '35 vulnerable individuals - Feeding outreach executed on behalf of a UK donor.',
    image: '/assets/gallery/special-people/group-feeding.jpg',
  },
  {
    id: 'mapama-national-convention-nov-2025',
    title: 'Supported MAPAMA National Convention 2025',
    date: 'Nov 15 & 16, 2025',
    month: 'November',
    year: 2025,
    description:
      'Our volunteers contributed to graphics design, handling media support, including capturing event highlights, live streaming, interviews, and documentation to enhance the visibility of the convention.',
    image: '/assets/gallery/launch/launch-duo.jpg',
  },
]

export interface DateGroup {
  label: string
  projects: Project[]
}

export function getDateGroups(): DateGroup[] {
  const map = new Map<string, Project[]>()
  for (const p of projects) {
    const key = `${p.year}-${p.month}`
    const list = map.get(key) ?? []
    list.push(p)
    map.set(key, list)
  }
  return Array.from(map.entries()).map(([key, items]) => {
    const [year, month] = key.split('-')
    return { label: `${year} - ${month}`, projects: items }
  })
}

export const PROJECTS_PER_PAGE = 9
