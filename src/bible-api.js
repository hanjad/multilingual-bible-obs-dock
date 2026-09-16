import { BOOK_CODES } from './book-codes.js';

const WLDEH_BASE = 'https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles';

const EBIBLE_SOURCES = {
  'yo-oycb': 'yor',
};

async function fetchVerse(versionId, book, chapter, verse) {
  const ebibleFolder = EBIBLE_SOURCES[versionId];
  if (ebibleFolder) {
    return fetchVerseFromEbible(ebibleFolder, book, chapter, verse);
  }
  return fetchVerseFromWldeh(versionId, book, chapter, verse);
}

async function fetchVerseFromWldeh(versionId, book, chapter, verse) {
  const url = `${WLDEH_BASE}/${versionId}/books/${book}/chapters/${chapter}/verses/${verse}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Verse not found: ${versionId} ${book} ${chapter}:${verse}`);
  const data = await response.json();
  return { text: data.text.trim(), book, chapter, verse };
}

async function fetchVerseFromEbible(folder, book, chapter, verse) {
  const bookCode = BOOK_CODES[book];
  if (!bookCode) throw new Error(`No eBible code for book: ${book}`);

  const paddedChapter = chapter < 10 ? `0${chapter}` : `${chapter}`;
  const url = `https://ebible.org/${folder}/${bookCode}${paddedChapter}.htm`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Chapter not found: ${folder} ${bookCode}${paddedChapter}`);

  const html = await response.text();
  const verses = parseEbibleChapter(html);
  if (!verses[verse]) throw new Error(`Verse not found: ${folder} ${book} ${chapter}:${verse}`);

  return { text: verses[verse], book, chapter, verse };
}

function parseEbibleChapter(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const container = doc.querySelector('div.main');
  const verses = {};
  let currentVerse = null;

  function walk(node) {
    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('verse')) {
      currentVerse = parseInt((node.getAttribute('id') || '').replace('V', ''), 10);
      verses[currentVerse] = '';
      return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      if (currentVerse !== null) verses[currentVerse] += node.textContent;
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.classList.contains('footnote') || node.classList.contains('copyright') || node.tagName === 'UL') {
        return;
      }
      node.childNodes.forEach(walk);
    }
  }

  if (container) walk(container);

  Object.keys(verses).forEach((v) => {
    verses[v] = verses[v].replace(/&#160;/g, ' ').replace(/\s+/g, ' ').trim();
  });

  return verses;
}

export { fetchVerse };
