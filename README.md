<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bible Dock Setup</title>
  <link rel="stylesheet" href="css/onboarding.css" />
</head>
<body>
  <main>
    <h1>Set up your Bible dock</h1>

    <section id="step-languages">
      <h2>1. Choose your languages</h2>
      <p>Select every language you might want to search or display.</p>
      <div id="language-list"></div>
      <p id="languages-error" class="error" hidden></p>
      <button id="next-btn">Next</button>
    </section>

    <section id="step-main-sub" hidden>
      <h2>2. Pick your main and subsidiary language</h2>
      <p>These two are what actually show on stream.</p>

      <label for="main-select">Main (shown first)</label>
      <select id="main-select"></select>

      <label for="sub-select">Subsidiary (shown second)</label>
      <select id="sub-select"></select>

      <p id="mainsub-error" class="error" hidden></p>
      <button id="finish-btn">Finish setup</button>
    </section>
  </main>

  <script type="module" src="src/onboarding.js"></script>
</body>
</html>
