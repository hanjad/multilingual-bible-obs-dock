// src/bible-api.js
// Thin wrapper around the wldeh/bible-api (served via jsDelivr CDN).
// No API key needed, but be reasonable with request volume.

const BASE_URL = 'https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles';

async function fetchVerse(versionId, book, chapter, verse) {
  const url = `${BASE_URL}/${versionId}/books/${book}/chapters/${chapter}/verses/${verse}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Verse not found: ${versionId} ${book} ${chapter}:${verse}`);
  }

  const data = await response.json();
  return {
    text: data.text.trim(),
    book,
    chapter,
    verse,
  };
}

async function fetchChapter(versionId, book, chapter) {
  const url = `${BASE_URL}/${versionId}/books/${book}/chapters/${chapter}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Chapter not found: ${versionId} ${book} ${chapter}`);
  }

  return response.json();
}

export { fetchVerse, fetchChapter };
