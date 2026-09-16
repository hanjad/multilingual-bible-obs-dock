import { getSettings, isOnboarded } from './settings.js';
import { getLanguageById, getAllLanguages } from './languages.js';
import { fetchVerse } from './bible-api.js';
import { parseReference } from './reference-parser.js';
import { showVerse, hideVerse } from './sync.js';

if (!isOnboarded()) {
  window.location.href = 'onboarding.html';
}

const settings = getSettings();
const mainLang = getLanguageById(settings.mainLanguage);
const subLang = getLanguageById(settings.subsidiaryLanguage);

const mainSubLabel = document.getElementById('main-sub-label');
mainSubLabel.textContent = `Main: ${mainLang.label} · Subsidiary: ${subLang.label}`;

const referenceInput = document.getElementById('reference-input');
const searchBtn = document.getElementById('search-btn');
const searchError = document.getElementById('search-error');
const resultsEl = document.getElementById('results');

let liveRef = null;

async function handleSearch() {
  searchError.hidden = true;
  resultsEl.innerHTML = '';

  const parsed = parseReference(referenceInput.value);
  if (!parsed) {
    searchError.textContent = "Couldn't understand that reference. Try 'john 3:16'.";
    searchError.hidden = false;
    return;
  }

  const enabledLanguages = getAllLanguages().filter((lang) =>
    settings.enabledLanguages.includes(lang.id)
  );

  const fetches = enabledLanguages.map(async (lang) => {
    try {
      const verse = await fetchVerse(lang.id, parsed.book, parsed.chapter, parsed.verse);
      return { lang, verse, ok: true };
    } catch {
      return { lang, ok: false };
    }
  });

  const results = await Promise.all(fetches);
  renderResults(results, parsed);
}

function renderResults(results, parsed) {
  const ref = `${parsed.book} ${parsed.chapter}:${parsed.verse}`;
  const card = document.createElement('div');
  card.className = 'result-card';

  results.forEach(({ lang, verse, ok }) => {
    const row = document.createElement('div');
    row.className = 'lang-row';

    const isMain = lang.id === mainLang.id;
    const isSub = lang.id === subLang.id;
    if (isMain) row.classList.add('is-main');
    if (isSub) row.classList.add('is-sub');

    const tag = isMain ? 'MAIN' : isSub ? 'SUB' : '';
    row.innerHTML = `
      <p class="lang-label">${lang.label}${tag ? ` · ${tag}` : ''}</p>
      <p class="lang-text">${ok ? verse.text : 'Not available in this translation'}</p>
    `;
    card.appendChild(row);
  });

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = liveRef === ref ? 'Hide from stream' : 'Show on stream';
  toggleBtn.className = 'toggle-btn';
  toggleBtn.addEventListener('click', () => toggleLive(ref, results));

  card.appendChild(toggleBtn);
  resultsEl.appendChild(card);
}

function toggleLive(ref, results) {
  if (liveRef === ref) {
    hideVerse();
    liveRef = null;
  } else {
    const mainResult = results.find((r) => r.lang.id === mainLang.id);
    const subResult = results.find((r) => r.lang.id === subLang.id);

    showVerse({
      ref,
      main: { lang: mainLang.id, text: mainResult.verse.text, label: mainLang.label },
      subsidiary: { lang: subLang.id, text: subResult.verse.text, label: subLang.label },
    });
    liveRef = ref;
  }
  handleSearch();
}

searchBtn.addEventListener('click', handleSearch);
referenceInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});
