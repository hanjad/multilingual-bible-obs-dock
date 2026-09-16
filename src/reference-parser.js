// src/reference-parser.js
// Turns user-typed references like "john 3:16" or "1 corinthians 13:4"
// into { book, chapter, verse } matching the bible-api's book slugs.

const BOOK_ALIASES = {
  genesis: 'genesis', gen: 'genesis',
  exodus: 'exodus', exo: 'exodus',
  psalms: 'psalms', psalm: 'psalms', ps: 'psalms',
  proverbs: 'proverbs', prov: 'proverbs',
  isaiah: 'isaiah', isa: 'isaiah',
  matthew: 'matthew', matt: 'matthew', mt: 'matthew',
  mark: 'mark', mk: 'mark',
  luke: 'luke', lk: 'luke',
  john: 'john', jn: 'john',
  acts: 'acts',
  romans: 'romans', rom: 'romans',
  '1corinthians': '1-corinthians', '1cor': '1-corinthians',
  '2corinthians': '2-corinthians', '2cor': '2-corinthians',
  galatians: 'galatians', gal: 'galatians',
  ephesians: 'ephesians', eph: 'ephesians',
  philippians: 'philippians', phil: 'philippians',
  revelation: 'revelation', rev: 'revelation',
};

function normalizeBookName(raw) {
  return raw.toLowerCase().replace(/\s+/g, '');
}

function parseReference(input) {
  const trimmed = input.trim();
  const match = trimmed.match(/^([1-3]?\s?[a-zA-Z]+)\s+(\d+):(\d+)$/);

  if (!match) {
    return null;
  }

  const [, rawBook, chapter, verse] = match;
  const key = normalizeBookName(rawBook);
  const book = BOOK_ALIASES[key];

  if (!book) {
    return null;
  }

  return {
    book,
    chapter: parseInt(chapter, 10),
    verse: parseInt(verse, 10),
  };
}

export { parseReference, BOOK_ALIASES };
