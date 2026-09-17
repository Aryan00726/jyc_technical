import { supabase, isSupabaseConfigured } from '../lib/supabase';

const INITIAL_SEED_DOUBTS = [
  {
    id: 'seed-d-1',
    title: 'How to optimize Three.js canvas performance on mobile devices?',
    description: 'I am using Three.js in a React Vite project with 1,000 particle stars and a custom mesh. It runs smoothly on desktop (60fps) but stutters on Android/iOS. What are the best practices for pixel ratio capping and buffer geometry re-use?',
    author_name: 'Aarav Sharma (3rd Year CSE)',
    category: 'Web Development',
    upvotes: 14,
    answers_count: 2,
    status: 'open',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
  },
  {
    id: 'seed-d-2',
    title: 'What is the roadmap for cracking Hack-a-Sol 5.0 as a 1st year beginner?',
    description: 'Our team wants to participate in the upcoming 48-hour national hackathon. What domain (AI vs Web vs Mobile) should a team of 1st year students choose, and what tools help deploy fast prototypes under 24 hours?',
    author_name: 'Priya Patel (1st Year ECE)',
    category: 'Hackathons',
    upvotes: 21,
    answers_count: 3,
    status: 'open',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString() // 18 hrs ago
  },
  {
    id: 'seed-d-3',
    title: 'Recommended resources for learning PyTorch for CV and NLP?',
    description: 'I have finished basic Python and Scikit-Learn. I want to transition into PyTorch for Computer Vision and Transformer models. Any recommended hands-on GitHub repos or tutorials?',
    author_name: 'Rohan Gupta (2nd Year IT)',
    category: 'AI / ML',
    upvotes: 9,
    answers_count: 1,
    status: 'open',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hrs ago
  }
];

const STORAGE_KEY = 'jyc_doubts_local';

function getLocalDoubts() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_DOUBTS));
    return INITIAL_SEED_DOUBTS;
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Error parsing local doubts', err);
    return INITIAL_SEED_DOUBTS;
  }
}

function saveLocalDoubts(doubts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doubts));
}

export async function fetchDoubts({ category = 'All', searchQuery = '', sortBy = 'newest' } = {}) {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('doubts').select('*');

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (sortBy === 'upvotes') {
        query = query.order('upvotes', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (!error && data) {
        return { data, isFallback: false };
      }
      console.warn('Supabase fetch error, using local storage fallback', error);
    } catch (err) {
      console.warn('Supabase request failed, switching to fallback', err);
    }
  }

  // Fallback to local storage
  let list = getLocalDoubts();

  if (category && category !== 'All') {
    list = list.filter(item => item.category === category);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }

  if (sortBy === 'upvotes') {
    list.sort((a, b) => b.upvotes - a.upvotes);
  } else {
    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return { data: list, isFallback: true };
}

export async function fetchDoubtById(id) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('doubts')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return { data, isFallback: false };
      }
    } catch (err) {
      console.warn('Supabase fetchById failed, using local storage', err);
    }
  }

  const list = getLocalDoubts();
  const doubt = list.find(item => item.id === id);
  return { data: doubt || null, isFallback: true };
}

export async function createDoubt({ title, description, author_name, category }) {
  const newDoubtObj = {
    title,
    description,
    author_name: author_name || 'Anonymous Student',
    category: category || 'General',
    upvotes: 0,
    answers_count: 0,
    status: 'open',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('doubts')
        .insert([newDoubtObj])
        .select()
        .single();

      if (!error && data) {
        return { data, isFallback: false };
      }
    } catch (err) {
      console.warn('Supabase insert failed, storing locally', err);
    }
  }

  // Fallback
  const list = getLocalDoubts();
  const created = {
    ...newDoubtObj,
    id: `local-d-${Date.now()}`
  };
  list.unshift(created);
  saveLocalDoubts(list);
  return { data: created, isFallback: true };
}

export async function upvoteDoubt(id) {
  if (isSupabaseConfigured) {
    try {
      // Fetch current upvotes
      const { data: current } = await supabase
        .from('doubts')
        .select('upvotes')
        .eq('id', id)
        .single();
      
      const newUpvotes = (current?.upvotes || 0) + 1;

      const { data, error } = await supabase
        .from('doubts')
        .update({ upvotes: newUpvotes })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return { data, isFallback: false };
      }
    } catch (err) {
      console.warn('Supabase upvote failed, updating locally', err);
    }
  }

  // Fallback
  const list = getLocalDoubts();
  const doubt = list.find(item => item.id === id);
  if (doubt) {
    doubt.upvotes = (doubt.upvotes || 0) + 1;
    saveLocalDoubts(list);
    return { data: doubt, isFallback: true };
  }
  return { data: null, isFallback: true };
}
