const workAnchors = new Set(['experience', 'real-estate', 'sales-marketing', 'projects', 'data-analytics', 'skills', 'education', 'sunlight', 'kuaishou', 'deloitte', 'accenture']);
const lifeAnchors = new Set(['wellness', 'cooking', 'travel', 'coffee', 'music', 'photography']);
export function parseRoute(hash = '') {
  const parts = String(hash).replace(/^#\/?/, '').split('/').filter(Boolean);
  const page = parts[0] === 'professional' ? 'work' : parts[0] === 'personal' ? 'life' : parts[0];
  if (page === 'work') return { page, anchor: parts[1] === 'work' ? 'experience' : workAnchors.has(parts[1]) ? parts[1] : '', collection: false };
  if (page === 'life') return { page, anchor: lifeAnchors.has(parts[1]) ? parts[1] : '', collection: parts[1] === 'travel' && parts[2] === 'collection' };
  return { page: 'home', anchor: '', collection: false };
}
export function routeKey(route) { return `${route.page}${route.collection ? '/collection' : ''}`; }
