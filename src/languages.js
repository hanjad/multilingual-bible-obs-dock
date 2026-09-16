
const LANGUAGES = [
  { id: 'en-kjv', language: 'English', version: 'KJV', label: 'English (KJV)' },
  { id: 'yo-oycb', language: 'Yoruba', version: 'OYCB', label: 'Yoruba (OYCB)' },
  { id: 'ig-biuo', language: 'Igbo', version: 'BIUO', label: 'Igbo (BIUO)' },
  { id: 'ha-bsrk', language: 'Hausa', version: 'BSRK', label: 'Hausa (BSRK)' },
  { id: 'tw-wasna', language: 'Twi', version: 'WASNA', label: 'Twi (WASNA)' },
  { id: 'swh-onen', language: 'Swahili', version: 'ONEN', label: 'Swahili (ONEN)' },
  { id: 'ln-smnb', language: 'Lingala', version: 'SMNB', label: 'Lingala (SMNB)' },
  { id: 'ny-tccl', language: 'Chichewa', version: 'TCCl', label: 'Chichewa (TCCl)' },
];

function getLanguageById(id) {
  return LANGUAGES.find((lang) => lang.id === id) || null;
}

function getAllLanguages() {
  return LANGUAGES;
}

export { LANGUAGES, getLanguageById, getAllLanguages };
