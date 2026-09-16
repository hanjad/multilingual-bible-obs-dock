// src/sync.js
// BroadcastChannel wrapper — keeps dock.js and display.js in sync
// without any backend, since both pages run inside OBS's browser engine.

const CHANNEL_NAME = 'bible-dock-sync';
const channel = new BroadcastChannel(CHANNEL_NAME);

function showVerse({ ref, main, subsidiary }) {
  channel.postMessage({
    type: 'show',
    ref,
    main,
    subsidiary,
  });
}

function hideVerse() {
  channel.postMessage({ type: 'hide' });
}

function onVerseUpdate(callback) {
  channel.onmessage = (event) => callback(event.data);
}

export { showVerse, hideVerse, onVerseUpdate };
