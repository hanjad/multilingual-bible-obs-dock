import { onVerseUpdate } from './sync.js';

const container = document.getElementById('verse-container');
const mainText = document.getElementById('main-text');
const mainLabel = document.getElementById('main-label');
const subText = document.getElementById('sub-text');
const subLabel = document.getElementById('sub-label');
const verseRef = document.getElementById('verse-ref');

onVerseUpdate((data) => {
  if (data.type === 'hide') {
    container.hidden = true;
    return;
  }

  if (data.type === 'show') {
    mainText.textContent = data.main.text;
    mainLabel.textContent = data.main.label;
    subText.textContent = data.subsidiary.text;
    subLabel.textContent = data.subsidiary.label;
    verseRef.textContent = data.ref.toUpperCase();
    container.hidden = false;
  }
});
