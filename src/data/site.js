/**
 * SITE CONFIGURATION
 * ==================
 * Update this file to match your club's identity.
 * All pages pull from here — change once, updates everywhere.
 */

export const site = {
  // Club identity
  name: 'CodeCraft',
  fullName: 'CodeCraft — Student Tech Club',
  tagline: 'Engineering Tomorrow, Today.',
  description:
    'A student-led club dedicated to building, learning, and innovating at the intersection of software, systems, and community.',

  // Meta / SEO
  url: 'https://codecraft.club', // TODO: update with real domain
  ogImage: '/og-image.png',     // TODO: add real OG image to /public

  // College affiliation
  college: 'Delhi Technological University',

  // Club stats (update with real numbers)
  stats: [
    { value: '200+', label: 'Active Members' },
    { value: '80+',  label: 'Lectures Hosted' },
    { value: '4',    label: 'Years Running'   },
    { value: '30+',  label: 'Projects Shipped'},
  ],

  // What the club does (3 core activities)
  activities: [
    {
      icon: '⚡',
      title: 'Weekly Lectures',
      description:
        'Expert-led sessions on cutting-edge topics — from systems programming to machine learning, delivered by practitioners.',
    },
    {
      icon: '🛠️',
      title: 'Build Projects',
      description:
        'Hands-on collaboration on real engineering challenges. Members ship production-grade software, not toy assignments.',
    },
    {
      icon: '🌐',
      title: 'Open Community',
      description:
        'A place where curious minds from any branch can explore computer science, contribute and grow together.',
    },
  ],

  // About sections
  about: {
    founded: '2021',
    mission:
      'To build a community of serious, curious, and collaborative engineers who learn by doing — not just by attending.',
    vision:
      'A campus where any student — regardless of department — has access to world-class technical education and a team that makes things.',
    story:
      'CodeCraft was founded in 2021 by a group of students frustrated by the gap between theoretical coursework and real engineering practice. What started as a small weekly group of 12 has grown into a 200-member community running lectures, workshops, and live projects.',
    values: [
      { title: 'Depth over breadth', body: 'We go deep on topics that matter, not shallow on everything.' },
      { title: 'Ship real things',    body: 'Projects end in deployed products, not slide decks.' },
      { title: 'Open doors',          body: 'All branches, all years. No gatekeeping.' },
      { title: 'Teach back',          body: 'The best way to learn is to explain. Everyone leads a session eventually.' },
    ],
    opportunities: [
      'Give a technical talk to 100+ members',
      'Lead a semester-long project team',
      'Collaborate with students from 8+ departments',
      'Get mentorship from seniors who work at top companies',
      'Build your portfolio with real shipped software',
    ],
    achievements: [
      '80+ technical lectures archived and accessible',
      'Won inter-college hackathon (2023, 2024)',
      'Open-source tools used by students at 5 other colleges',
      '3 alumni now at FAANG companies',
      'Active GitHub org with 40+ repositories',
    ],
  },
}
