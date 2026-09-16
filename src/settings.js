// src/settings.js
// Reads/writes the user's language setup to localStorage.
// This is what onboarding.html writes to, and dock.js reads from.

const STORAGE_KEY = 'bible-dock-settings';

function getDefaultSettings() {
  return {
    enabledLanguages: [],
    mainLanguage: null,
    subsidiaryLanguage: null,
  };
}

function getSettings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return getDefaultSettings();
  }
  try {
    return { ...getDefaultSettings(), ...JSON.parse(raw) };
  } catch {
    return getDefaultSettings();
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function isOnboarded() {
  const settings = getSettings();
  return (
    settings.enabledLanguages.length > 0 &&
    settings.mainLanguage !== null &&
    settings.subsidiaryLanguage !== null
  );
}

function updateSettings(partial) {
  const current = getSettings();
  const updated = { ...current, ...partial };
  saveSettings(updated);
  return updated;
}

export { getSettings, saveSettings, isOnboarded, updateSettings, getDefaultSettings };
