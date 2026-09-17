import { EVENTS_DATA } from '../data/events';

export async function fetchEvents({ category = 'All', status = 'All', searchQuery = '' } = {}) {
  let list = [...EVENTS_DATA];

  if (category && category !== 'All') {
    list = list.filter(evt => evt.category.toLowerCase() === category.toLowerCase());
  }

  if (status && status !== 'All') {
    list = list.filter(evt => evt.status.toLowerCase() === status.toLowerCase());
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(evt => 
      evt.title.toLowerCase().includes(q) ||
      evt.description.toLowerCase().includes(q) ||
      evt.location.toLowerCase().includes(q) ||
      evt.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function fetchFeaturedEvents() {
  return EVENTS_DATA.filter(evt => evt.featured);
}

export async function fetchEventById(id) {
  return EVENTS_DATA.find(evt => evt.id === id) || null;
}
