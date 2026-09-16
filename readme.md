# Bible OBS Dock

A free, multilingual Bible verse display plugin for OBS Studio. Search
any Bible reference across your chosen languages, then push a main and
subsidiary translation live on stream together — no backend, no
installs, just two URLs added to OBS.

## Setup

1. Enable **GitHub Pages** on this repo (Settings → Pages → deploy
   from `main`, root folder). You'll get a URL like
   `https://yourusername.github.io/yoruba-bible-obs-dock/`.

2. In OBS Studio:
   - **View → Docks → Custom Browser Docks** → name it "Bible Dock" →
     paste `https://yourusername.github.io/yoruba-bible-obs-dock/index.html`
     → Apply.
   - In your scene, **Add Source → Browser Source** → paste
     `https://yourusername.github.io/yoruba-bible-obs-dock/display.html`
     → set width/height to match your canvas → OK.

3. First time opening the dock, you'll be walked through onboarding:
   pick every language you might want, then choose your main and
   subsidiary language (the two that actually render on stream).

## Using it

- Type a reference like `john 3:16` in the dock and hit Search.
- Results show every enabled language for preview; MAIN and SUB tags
  mark which two go live.
- Tap **Show on stream** to push the main + subsidiary pair to the
  Browser Source. Tap again (now labeled **Hide from stream**) to
  clear it.
- **Change languages** in the dock header reopens onboarding at any
  time.

## How it works

Two pages run inside OBS's browser engine: the dock (control panel)
and the display (what viewers see). They stay in sync via
`BroadcastChannel`, a browser API that lets same-origin pages talk to
each other directly — no server involved.

## File structure

    index.html          → auto-redirects to onboarding or dock
    onboarding.html      → first-run language setup
    dock.html            → search + control panel
    display.html         → stream overlay (Browser Source)
    src/
      languages.js        → supported Bible versions
      bible-api.js         → fetches verses from wldeh/bible-api
      reference-parser.js  → parses typed references ("john 3:16")
      settings.js           → localStorage read/write
      sync.js                → BroadcastChannel dock↔display sync
      onboarding.js, dock.js, display.js → page logic
    css/                  → styling per page

## Credits

Verse data from [wldeh/bible-api](https://github.com/wldeh/bible-api),
served via jsDelivr.
