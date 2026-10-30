const params = new URLSearchParams(location.search);
const theme = params.get('theme') === 'light' ? 'light' : 'dark';
const size = params.get('size') === 'mobile' ? 'mobile' : 'desktop';
const name = params.get('art') || 'hero';
const social = params.get('format') === 'social';
document.documentElement.dataset.theme = theme;

const icons = {
  raven: '<path d="m5 23 5-13 8 4 7-7 2 10-8 10-6-4-8 2Z"/><path d="m10 10 3 13 12-16M18 14l9 3M19 27l-1-8"/>',
  mio: '<circle cx="12" cy="12" r="4"/><circle cx="49" cy="16" r="4"/><circle cx="29" cy="34" r="5"/><circle cx="10" cy="53" r="4"/><circle cx="52" cy="51" r="4"/><path d="m15 15 11 15m7 0 13-11M25 37 13 50m20-13 16 11M16 12l29 3"/>',
  arv: '<path d="M10 8h14v16H10zM40 8h14v16H40zM25 42h14v16H25zM24 16h16M17 24v10h15v8m15-18v10H32"/><path d="m29 49 3 3 5-6"/>',
  tenvell: '<rect x="9" y="9" width="32" height="32" rx="7"/><rect x="23" y="23" width="32" height="32" rx="7"/><path d="M18 23h14m-7 18v-9m7 0h13"/>',
  island: '<rect x="6" y="11" width="52" height="43" rx="9"/><path d="M23 11v6a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-6M17 33h30M17 43h19"/>',
  arrow: '<path d="M6 21 22 5M7 5h15v15"/>',
};
function icon(key, viewBox = '0 0 64 64') {
  return `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]}</svg>`;
}
const projects = {
  mio: { title: 'Mio', category: '01 / agent memory', icon: 'mio', finish: 'clear', description: 'A native macOS home for agent memory.<br> Linked notes, sources, search and a visible graph.' },
  arv: { title: 'ARV', category: '02 / research', icon: 'arv', finish: 'prism', description: 'Research with an evidence graph.<br> Keep observations, hypotheses and their grounds inspectable.' },
  tenvell: { title: 'tenvell', category: '03 / interface design', icon: 'tenvell', finish: 'clear', description: 'Thin glass. Clear interfaces.<br> A React UI kit with original Lamina typefaces.' },
  'note-island': { title: 'Note Island', category: '04 / everyday macOS', icon: 'island', finish: 'smoke', description: 'A little workspace at the top of your Mac.<br> Notes, translation, calendar, recordings and screenshots.' },
};
const covers = {
  mio: { lead: 'Memory, made visible.', text: 'Linked notes, hybrid search and a memory graph for AI agents.' },
  arv: { lead: 'Research with an evidence graph.', text: 'Observations, hypotheses and inspectable grounds.' },
  tenvell: { lead: 'Thin glass. Clear interfaces.', text: 'React components. Original Lamina typefaces.' },
  'note-island': { lead: 'A little workspace at the top of your Mac.', text: 'Notes, translation, calendar, recordings and screenshots.' },
};
const artwork = document.getElementById('artwork');
if (name === 'hero') {
  artwork.className = `hero ${size === 'mobile' ? 'mobile' : ''}`;
  artwork.innerHTML = `
    <div class="wordmark">${icon('raven', '0 0 32 32')}<span>raven-ai-esh</span></div>
    <h1>Tools for agents.<br>Apps for people.</h1>
    <p class="lede">AI, native macOS and thoughtful interfaces.</p>
    <div class="composition" aria-hidden="true">
      <div class="sheet sheet-back glass-surface" data-glass="clear">${icon('mio')}<span>memory</span></div>
      <div class="sheet sheet-mid glass-surface" data-glass="prism">${icon('arv')}<span>research</span></div>
      <div class="sheet sheet-front glass-surface" data-glass="frost">${icon('tenvell')}<span>interfaces</span></div>
    </div>
    <span class="signature">independent projects / shared in the open</span>`;
} else if (projects[name]) {
  const project = projects[name];
  if (social) {
    const cover = covers[name];
    artwork.className = 'social';
    artwork.innerHTML = `<article class="social-surface glass-surface" data-glass="${project.finish}">
      <div class="cover-brand"><img src="../assets/avatar-raven.jpg" width="38" height="38" alt="Raven"><span>raven-ai-esh</span></div>
      <div class="cover-category">${project.category.split(' / ')[1]}</div>
      <h1>${project.title}</h1>
      <p class="cover-lead">${cover.lead}</p>
      <p class="cover-description">${cover.text}</p>
      <div class="cover-illustration" aria-hidden="true">
        <div class="cover-sheet cover-sheet-back glass-surface" data-glass="prism"></div>
        <div class="cover-sheet cover-sheet-front glass-surface" data-glass="${project.finish}">${icon(project.icon)}</div>
      </div>
      <footer class="cover-footer"><span>github.com/raven-ai-esh/${name}</span>${icon('arrow', '0 0 28 28')}</footer>
    </article>`;
  } else {
    artwork.className = `project ${size === 'mobile' ? 'mobile' : ''}`;
    artwork.innerHTML = `<article class="project-surface glass-surface" data-glass="${project.finish}">
    <div class="eyebrow">${project.category}</div>
    <h2>${project.title}</h2>
    <p class="description">${project.description}</p>
    <div class="project-symbol glass-surface" data-glass="${project.finish}">${icon(project.icon)}</div>
    <div class="outbound">${icon('arrow', '0 0 28 28')}</div>
  </article>`;
  }
} else {
  throw new Error(`Unknown artwork: ${name}`);
}
await document.fonts.ready;
await Promise.all([...artwork.querySelectorAll('img')].map(image => image.decode()));
document.documentElement.dataset.artworkReady = 'true';
