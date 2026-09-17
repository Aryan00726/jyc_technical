import { supabase, isSupabaseConfigured } from '../lib/supabase';

const INITIAL_SEED_ANSWERS = [
  {
    id: 'seed-a-1',
    doubt_id: 'seed-d-1',
    author_name: 'Devansh Verma',
    author_role: 'Technical Lead (4th Year)',
    content: '1. Set `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` — high DPI phones attempt 3x resolution rendering which burns GPU.\n2. Ensure you reuse BufferGeometry and Material instances inside your `useFrame` loop instead of re-instantiating `new THREE.Mesh()` every tick.\n3. Turn off `preserveDrawingBuffer` if not taking screenshots.',
    is_verified: true,
    upvotes: 11,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
  },
  {
    id: 'seed-a-2',
    doubt_id: 'seed-d-1',
    author_name: 'Siddharth Nair',
    author_role: 'Web Dev Mentor',
    content: 'Also make sure you toggle `renderOnDemand` or use `requestAnimationFrame` with passive scroll listeners so the GPU rests when the canvas is scrolled out of view!',
    is_verified: false,
    upvotes: 5,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString()
  },
  {
    id: 'seed-a-3',
    doubt_id: 'seed-d-2',
    author_name: 'Ananya Roy',
    author_role: 'Hack-a-Sol Winner & AI Head',
    content: 'For 1st year beginners, I strongly recommend focusing on Web + Firebase / Supabase or Python AI APIs. Build a clean, working solution with a solid presentation deck. Focus 70% on core workflow and 30% on UX polished UI.',
    is_verified: true,
    upvotes: 18,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
  }
];

const ANSWERS_STORAGE_KEY = 'jyc_answers_local';

function getLocalAnswers() {
  const data = localStorage.getItem(ANSWERS_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(INITIAL_SEED_ANSWERS));
    return INITIAL_SEED_ANSWERS;
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Error parsing local answers', err);
    return INITIAL_SEED_ANSWERS;
  }
}

function saveLocalAnswers(answers) {
  localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
}

export async function fetchAnswersByDoubtId(doubtId) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('answers')
        .select('*')
        .eq('doubt_id', doubtId)
        .order('is_verified', { ascending: false })
        .order('upvotes', { ascending: false })
        .order('created_at', { ascending: true });

      if (!error && data) {
        return { data, isFallback: false };
      }
    } catch (err) {
      console.warn('Supabase fetchAnswers failed, using local storage fallback', err);
    }
  }

  // Local fallback
  const answers = getLocalAnswers().filter(a => a.doubt_id === doubtId);
  answers.sort((a, b) => {
    if (a.is_verified !== b.is_verified) return b.is_verified ? 1 : -1;
    if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
    return new Date(a.created_at) - new Date(b.created_at);
  });

  return { data: answers, isFallback: true };
}

export async function addAnswer({ doubtId, content, author_name, author_role }) {
  const newAnswerObj = {
    doubt_id: doubtId,
    content,
    author_name: author_name || 'Technical Member',
    author_role: author_role || 'Club Mentor',
    is_verified: false,
    upvotes: 0,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([newAnswerObj])
        .select()
        .single();

      if (!error && data) {
        return { data, isFallback: false };
      }
    } catch (err) {
      console.warn('Supabase addAnswer failed, storing locally', err);
    }
  }

  // Local fallback
  const answers = getLocalAnswers();
  const created = {
    ...newAnswerObj,
    id: `local-a-${Date.now()}`
  };
  answers.push(created);
  saveLocalAnswers(answers);

  // Also update answers_count on local doubt object
  try {
    const doubtsKey = 'jyc_doubts_local';
    const doubts = JSON.parse(localStorage.getItem(doubtsKey) || '[]');
    const d = doubts.find(item => item.id === doubtId);
    if (d) {
      d.answers_count = (d.answers_count || 0) + 1;
      localStorage.setItem(doubtsKey, JSON.stringify(doubts));
    }
  } catch (e) {
    console.error('Failed to update local doubt answer count', e);
  }

  return { data: created, isFallback: true };
}

export async function upvoteAnswer(answerId) {
  if (isSupabaseConfigured) {
    try {
      const { data: current } = await supabase
        .from('answers')
        .select('upvotes')
        .eq('id', answerId)
        .single();

      const newUpvotes = (current?.upvotes || 0) + 1;

      const { data, error } = await supabase
        .from('answers')
        .update({ upvotes: newUpvotes })
        .eq('id', answerId)
        .select()
        .single();

      if (!error && data) {
        return { data, isFallback: false };
      }
    } catch (err) {
      console.warn('Supabase upvoteAnswer failed, updating locally', err);
    }
  }

  // Fallback
  const answers = getLocalAnswers();
  const a = answers.find(item => item.id === answerId);
  if (a) {
    a.upvotes = (a.upvotes || 0) + 1;
    saveLocalAnswers(answers);
    return { data: a, isFallback: true };
  }
  return { data: null, isFallback: true };
}
