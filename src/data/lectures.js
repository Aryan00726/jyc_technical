/**
 * LECTURES DATA
 * =============
 * Add/update entries with your club's real lecture recordings.
 *
 * youtubeId: the video ID from the YouTube URL
 *   e.g., for https://youtu.be/dQw4w9WgXcQ → youtubeId: 'dQw4w9WgXcQ'
 *
 * thumbnail: leave null to use YouTube's auto-thumbnail
 */

export const lectures = [
  {
    id: 'lec-001',
    title: 'How Linux Boots: From BIOS to Bash',
    speaker: 'Arjun Mehta',
    speakerRole: 'Core Team · Systems Lead',
    date: '2025-08-10',
    category: 'Systems',
    tags: ['Linux', 'OS', 'Low-Level'],
    description:
      'A ground-up walkthrough of what actually happens between pressing the power button and seeing your shell prompt — BIOS, bootloader, kernel init, and systemd.',
    duration: '1h 22m',
    thumbnail: null,
    youtubeId: 'placeholder-001', // TODO: replace with real YouTube video ID
    featured: true,
  },
  {
    id: 'lec-002',
    title: 'Building Production APIs with FastAPI',
    speaker: 'Priya Sharma',
    speakerRole: 'Core Team · Backend Lead',
    date: '2025-07-26',
    category: 'Web',
    tags: ['Python', 'FastAPI', 'REST', 'Backend'],
    description:
      'Covers async Python, Pydantic models, dependency injection, JWT auth, and deploying a real API to production — not just the tutorial basics.',
    duration: '58m',
    thumbnail: null,
    youtubeId: 'placeholder-002',
    featured: true,
  },
  {
    id: 'lec-003',
    title: 'Transformers: Architecture Without the Math Fog',
    speaker: 'Rohan Kapoor',
    speakerRole: 'Alumni · ML Engineer @ Sarvam AI',
    date: '2025-07-05',
    category: 'AI/ML',
    tags: ['Transformers', 'NLP', 'Deep Learning', 'AI'],
    description:
      'The attention mechanism, positional encoding, and why the transformer architecture changed everything — explained with diagrams, not just equations.',
    duration: '1h 08m',
    thumbnail: null,
    youtubeId: 'placeholder-003',
    featured: true,
  },
  {
    id: 'lec-004',
    title: 'Git Internals: What Git Actually Stores',
    speaker: 'Sneha Rathi',
    speakerRole: 'Core Team · DevOps',
    date: '2025-06-14',
    category: 'DevOps',
    tags: ['Git', 'Version Control', 'Internals'],
    description:
      'Beyond add/commit/push — how Git stores objects, what a commit really is, rebasing internals, and how to recover from every disaster.',
    duration: '44m',
    thumbnail: null,
    youtubeId: 'placeholder-004',
    featured: false,
  },
  {
    id: 'lec-005',
    title: 'React Reconciliation Deep Dive',
    speaker: 'Vikram Singh',
    speakerRole: 'Volunteer · Frontend',
    date: '2025-05-31',
    category: 'Web',
    tags: ['React', 'Frontend', 'Performance'],
    description:
      'How React\'s diffing algorithm works under the hood, when and why re-renders happen, and practical techniques to eliminate unnecessary renders.',
    duration: '52m',
    thumbnail: null,
    youtubeId: 'placeholder-005',
    featured: false,
  },
  {
    id: 'lec-006',
    title: 'Designing for Scale: From 100 to 1M Users',
    speaker: 'Aditya Verma',
    speakerRole: 'Alumni · SDE2 @ Amazon',
    date: '2025-05-10',
    category: 'Systems',
    tags: ['System Design', 'Scalability', 'Architecture'],
    description:
      'Real system design decisions — load balancers, database sharding, caching strategies, and the tradeoffs you actually face in production at scale.',
    duration: '1h 15m',
    thumbnail: null,
    youtubeId: 'placeholder-006',
    featured: false,
  },
  {
    id: 'lec-007',
    title: 'Rust for Systems Programmers',
    speaker: 'Karan Bhatia',
    speakerRole: 'Core Team · Tech Lead',
    date: '2025-04-19',
    category: 'Systems',
    tags: ['Rust', 'Systems Programming', 'Memory Safety'],
    description:
      'Ownership, borrowing, lifetimes — and why they exist. A lecture aimed at people who already know C/C++ and want to understand what Rust actually solves.',
    duration: '1h 30m',
    thumbnail: null,
    youtubeId: 'placeholder-007',
    featured: false,
  },
  {
    id: 'lec-008',
    title: 'Kubernetes: Container Orchestration in Practice',
    speaker: 'Meera Joshi',
    speakerRole: 'Core Team · Infrastructure',
    date: '2025-03-28',
    category: 'DevOps',
    tags: ['Kubernetes', 'Docker', 'DevOps', 'Cloud'],
    description:
      'Pods, deployments, services, ingress, config maps — a practical session building and deploying a real multi-service application on a cluster.',
    duration: '1h 05m',
    thumbnail: null,
    youtubeId: 'placeholder-008',
    featured: false,
  },
]

export const lectureCategories = ['All', 'Systems', 'Web', 'AI/ML', 'DevOps']
