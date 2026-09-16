import { getAllLanguages } from './languages.js';
import { updateSettings } from './settings.js';

const languageList = document.getElementById('language-list');
const languagesError = document.getElementById('languages-error');
const nextBtn = document.getElementById('next-btn');

const stepLanguages = document.getElementById('step-languages');
const stepMainSub = document.getElementById('step-main-sub');

const mainSelect = document.getElementById('main-select');
const subSelect = document.getElementById('sub-select');
const mainSubError = document.getElementById('mainsub-error');
const finishBtn = document.getElementById('finish-btn');

function renderLanguageCheckboxes() {
  const languages = getAllLanguages();
  languageList.innerHTML = '';

  languages.forEach((lang) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'checkbox-row';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = lang.id;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(document.createTextNode(' ' + lang.label));
    languageList.appendChild(wrapper);
  });
}

function getSelectedLanguageIds() {
  const checked = languageList.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checked).map((box) => box.value);
}

function populateMainSubDropdowns(selectedIds) {
  const languages = getAllLanguages().filter((lang) => selectedIds.includes(lang.id));

  [mainSelect, subSelect].forEach((select) => {
    select.innerHTML = '';
    languages.forEach((lang) => {
      const option = document.createElement('option');
      option.value = lang.id;
      option.textContent = lang.label;
      select.appendChild(option);
    });
  });

  if (languages.length > 1) {
    subSelect.selectedIndex = 1;
  }
}

nextBtn.addEventListener('click', () => {
  const selectedIds = getSelectedLanguageIds();

  if (selectedIds.length < 2) {
    languagesError.textContent = 'Select at least two languages.';
    languagesError.hidden = false;
    return;
  }

  languagesError.hidden = true;
  updateSettings({ enabledLanguages: selectedIds });
  populateMainSubDropdowns(selectedIds);

  stepLanguages.hidden = true;
  stepMainSub.hidden = false;
});

finishBtn.addEventListener('click', () => {
  const mainLanguage = mainSelect.value;
  const subsidiaryLanguage = subSelect.value;

  if (mainLanguage === subsidiaryLanguage) {
    mainSubError.textContent = 'Main and subsidiary must be different languages.';
    mainSubError.hidden = false;
    return;
  }

  mainSubError.hidden = true;
  updateSettings({ mainLanguage, subsidiaryLanguage });

  window.location.href = 'dock.html';
});

renderLanguageCheckboxes();
