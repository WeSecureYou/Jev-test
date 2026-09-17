export const HOME_PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Evaluate how AI may reshape an occupation with TypeSafe AI's Jev model.">
  <title>Job Risk Analyzer | AI Labor Outlook</title>
  <style>
    :root {
      color-scheme: light;
      --ink: #17211d;
      --muted: #66706a;
      --paper: #f4f0e6;
      --sheet: #fffdf7;
      --line: #c9c4b7;
      --signal: #d9ff43;
      --risk: #d94b32;
      --steady: #d28c19;
      --strong: #237a57;
      --shadow: 0 18px 60px rgba(37, 43, 38, 0.12);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-width: 320px;
      min-height: 100vh;
      color: var(--ink);
      background:
        linear-gradient(rgba(23, 33, 29, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(23, 33, 29, 0.035) 1px, transparent 1px),
        var(--paper);
      background-size: 24px 24px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    button, input, textarea { font: inherit; }
    button { color: inherit; }

    .shell {
      width: min(1240px, calc(100% - 40px));
      margin: 0 auto;
      padding: 28px 0 36px;
    }

    .masthead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--ink);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 11px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    .brand-mark {
      display: grid;
      width: 28px;
      height: 28px;
      place-items: center;
      border: 1px solid var(--ink);
      background: var(--signal);
      box-shadow: 3px 3px 0 var(--ink);
      font-family: Georgia, serif;
      font-size: 16px;
      font-weight: 700;
    }

    .edition {
      color: var(--muted);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(320px, 0.8fr) minmax(480px, 1.2fr);
      gap: clamp(30px, 5vw, 78px);
      align-items: start;
      padding: clamp(54px, 8vw, 104px) 0 52px;
    }

    .eyebrow {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 0 20px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .eyebrow::before {
      width: 28px;
      height: 5px;
      background: var(--signal);
      border: 1px solid var(--ink);
      content: "";
    }

    h1 {
      max-width: 650px;
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(48px, 6.5vw, 86px);
      font-weight: 400;
      letter-spacing: -0.055em;
      line-height: 0.94;
    }

    h1 em {
      position: relative;
      z-index: 0;
      font-weight: 700;
    }

    h1 em::after {
      position: absolute;
      z-index: -1;
      right: -3px;
      bottom: 0.08em;
      left: -3px;
      height: 0.2em;
      background: var(--signal);
      content: "";
    }

    .lede {
      max-width: 560px;
      margin: 26px 0 36px;
      color: #49524d;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 18px;
      line-height: 1.55;
    }

    .analyzer-form {
      padding: 26px;
      border: 1px solid var(--ink);
      background: rgba(255, 253, 247, 0.86);
      box-shadow: 7px 7px 0 var(--ink);
    }

    .field + .field { margin-top: 19px; }

    label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    label span { color: var(--muted); font-weight: 500; }

    input, textarea {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 0;
      outline: none;
      color: var(--ink);
      background: var(--sheet);
      transition: border-color 140ms ease, box-shadow 140ms ease;
    }

    input { height: 52px; padding: 0 14px; font-size: 16px; }
    textarea { min-height: 98px; padding: 13px 14px; line-height: 1.45; resize: vertical; }
    input:focus, textarea:focus { border-color: var(--ink); box-shadow: 0 0 0 3px var(--signal); }

    .submit {
      display: flex;
      width: 100%;
      min-height: 54px;
      align-items: center;
      justify-content: space-between;
      margin-top: 22px;
      padding: 0 18px;
      border: 1px solid var(--ink);
      background: var(--ink);
      color: white;
      cursor: pointer;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: transform 140ms ease, background 140ms ease;
    }

    .submit:hover { background: #2c3933; transform: translateY(-2px); }
    .submit:focus-visible { outline: 3px solid var(--signal); outline-offset: 3px; }
    .submit:disabled { cursor: wait; opacity: 0.7; transform: none; }
    .submit-arrow { font-size: 20px; font-weight: 400; }

    .examples { margin-top: 24px; }
    .examples-label { margin: 0 0 10px; color: var(--muted); font-size: 12px; }
    .example-list { display: flex; flex-wrap: wrap; gap: 8px; }

    .example {
      padding: 7px 10px;
      border: 1px solid var(--line);
      background: transparent;
      cursor: pointer;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      transition: border-color 120ms ease, background 120ms ease;
    }

    .example:hover, .example:focus-visible { border-color: var(--ink); background: var(--sheet); outline: none; }

    .report {
      position: sticky;
      top: 28px;
      min-height: 610px;
      border: 1px solid var(--ink);
      background: var(--sheet);
      box-shadow: var(--shadow);
    }

    .report-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      padding: 0 18px;
      border-bottom: 1px solid var(--ink);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .report-topline { flex-wrap: wrap; gap: 10px; padding-block: 12px; }
    .live-dot { display: inline-flex; align-items: center; gap: 7px; }
    .live-dot::before { width: 7px; height: 7px; flex-shrink: 0; border-radius: 50%; background: var(--muted); content: ""; }
    .live-dot[data-mode="jev"]::before { background: var(--strong); }
    .live-dot[data-mode="mock"]::before { background: var(--steady); }
    .live-dot[data-mode="error"]::before { background: var(--risk); }
    .source-note { margin: 0; padding: 12px 18px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 12px; line-height: 1.5; }

    .empty-state {
      display: grid;
      min-height: 565px;
      place-items: center;
      padding: 60px;
      text-align: center;
    }

    .empty-graphic {
      position: relative;
      width: 190px;
      height: 190px;
      margin: 0 auto 30px;
      border: 1px solid var(--line);
      border-radius: 50%;
    }

    .empty-graphic::before, .empty-graphic::after {
      position: absolute;
      top: 50%;
      left: 50%;
      background: var(--line);
      content: "";
      transform: translate(-50%, -50%);
    }

    .empty-graphic::before { width: 1px; height: 230px; }
    .empty-graphic::after { width: 230px; height: 1px; }
    .empty-graphic span { position: absolute; inset: 35px; border: 12px solid var(--signal); border-radius: 50%; transform: rotate(-24deg); }

    .empty-state h2 { margin: 0 0 10px; font-family: Georgia, serif; font-size: 25px; font-weight: 400; }
    .empty-state p { max-width: 330px; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.6; }

    .loading-state { display: none; padding: 30px; }
    .loading-state[aria-hidden="false"] { display: block; }
    .skeleton { height: 18px; margin-bottom: 14px; background: linear-gradient(90deg, #e9e5da 25%, #f8f5ed 50%, #e9e5da 75%); background-size: 200% 100%; animation: shimmer 1.2s infinite linear; }
    .skeleton.hero { height: 190px; margin: 28px 0; }
    .skeleton.short { width: 45%; }

    @keyframes shimmer { to { background-position: -200% 0; } }

    .result-state { display: none; }
    .result-state[aria-hidden="false"] { display: block; animation: reveal 280ms ease both; }
    @keyframes reveal { from { opacity: 0; transform: translateY(8px); } }

    .result-heading { padding: 25px 28px 22px; border-bottom: 1px solid var(--line); }
    .result-kicker { margin: 0 0 6px; color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; }
    .result-heading h2 { margin: 0; font-family: Georgia, serif; font-size: clamp(28px, 4vw, 42px); font-weight: 400; letter-spacing: -0.025em; line-height: 1.05; }

    .score-row { display: grid; grid-template-columns: 210px 1fr; min-height: 250px; border-bottom: 1px solid var(--line); }
    .risk-gauge { display: grid; place-items: center; padding: 24px; border-right: 1px solid var(--line); }
    .gauge {
      --score: 0;
      display: grid;
      width: 154px;
      height: 154px;
      place-items: center;
      border-radius: 50%;
      background: conic-gradient(var(--gauge-color, var(--risk)) calc(var(--score) * 1%), #e5e1d6 0);
    }
    .gauge-inner { display: grid; width: 118px; height: 118px; place-items: center; border: 1px solid var(--ink); border-radius: 50%; background: var(--sheet); text-align: center; }
    .gauge-value { display: block; font-family: Georgia, serif; font-size: 43px; line-height: 0.85; }
    .gauge-label { display: block; margin-top: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; }

    .verdict { display: flex; flex-direction: column; justify-content: center; padding: 28px; }
    .trajectory-badge { align-self: flex-start; padding: 6px 9px; border: 1px solid currentColor; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
    .trajectory-badge.high_layoff_risk { color: var(--risk); }
    .trajectory-badge.transformed_hybrid { color: #9b650b; }
    .trajectory-badge.ruling_trend { color: var(--strong); }
    .verdict h3 { margin: 17px 0 9px; font-family: Georgia, serif; font-size: 24px; font-weight: 400; line-height: 1.2; }
    .verdict p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.55; }

    .metrics { display: grid; grid-template-columns: 1fr 1fr; }
    .metric { padding: 25px 28px 27px; }
    .metric + .metric { border-left: 1px solid var(--line); }
    .metric-head { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 12px; font-size: 12px; font-weight: 700; }
    .metric-value { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    .bar { height: 7px; border: 1px solid var(--ink); background: #e5e1d6; }
    .bar-fill { width: 0; height: 100%; background: var(--strong); transition: width 650ms cubic-bezier(.2,.75,.25,1); }
    .metric:nth-child(2) .bar-fill { background: var(--steady); }
    .metric-note { margin: 11px 0 0; color: var(--muted); font-size: 11px; line-height: 1.45; }

    .report-footer { display: flex; justify-content: space-between; gap: 18px; padding: 14px 18px; border-top: 1px solid var(--line); color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; }

    .error-state { display: none; min-height: 565px; place-items: center; padding: 50px; text-align: center; }
    .error-state[aria-hidden="false"] { display: grid; }
    .error-code { margin-bottom: 20px; color: var(--risk); font-family: Georgia, serif; font-size: 72px; }
    .error-state h2 { margin: 0 0 9px; font-family: Georgia, serif; font-weight: 400; }
    .error-state p { max-width: 360px; margin: 0; color: var(--muted); line-height: 1.5; }

    .page-note { display: flex; justify-content: space-between; gap: 30px; padding-top: 18px; border-top: 1px solid var(--ink); color: var(--muted); font-size: 11px; line-height: 1.5; }
    .page-note strong { color: var(--ink); }

    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; padding-top: 60px; }
      .report { position: static; }
      h1 { max-width: 720px; }
    }

    @media (max-width: 580px) {
      .shell { width: min(100% - 24px, 1240px); padding-top: 16px; }
      .edition { display: none; }
      .layout { gap: 36px; padding: 42px 0 36px; }
      h1 { font-size: clamp(43px, 15vw, 64px); }
      .lede { font-size: 16px; }
      .analyzer-form { padding: 19px; box-shadow: 5px 5px 0 var(--ink); }
      .report { min-height: 0; }
      .empty-state, .error-state { min-height: 470px; padding: 36px 24px; }
      .score-row { grid-template-columns: 1fr; }
      .risk-gauge { border-right: 0; border-bottom: 1px solid var(--line); }
      .metrics { grid-template-columns: 1fr; }
      .metric + .metric { border-top: 1px solid var(--line); border-left: 0; }
      .report-footer, .page-note { flex-direction: column; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header class="masthead">
      <div class="brand"><span class="brand-mark">J</span> Job Risk Analyzer</div>
      <div class="edition">Labor outlook / 5-10 year horizon</div>
    </header>

    <main class="layout">
      <section aria-labelledby="page-title">
        <p class="eyebrow">AI labor intelligence</p>
        <h1 id="page-title">Will your role <em>bend</em>, break, or lead?</h1>
        <p class="lede">Map an occupation against AI displacement pressure, human accountability, and the work expected to matter next.</p>

        <form class="analyzer-form" id="analyzer-form">
          <div class="field">
            <label for="title">Occupation <span>Required</span></label>
            <input id="title" name="title" type="text" maxlength="200" placeholder="e.g. Data Entry Clerk" required autocomplete="organization-title">
          </div>
          <div class="field">
            <label for="description">Role context <span>Optional</span></label>
            <textarea id="description" name="description" maxlength="4000" placeholder="What does this person do, and in which industry?"></textarea>
          </div>
          <button class="submit" id="submit-button" type="submit">
            <span id="submit-label">Run occupation forecast</span>
            <span class="submit-arrow" aria-hidden="true">-&gt;</span>
          </button>
        </form>

        <div class="examples">
          <p class="examples-label">Try a reference occupation</p>
          <div class="example-list">
            <button class="example" type="button" data-title="Data Entry Clerk">Data Entry Clerk</button>
            <button class="example" type="button" data-title="Registered Nurse">Registered Nurse</button>
            <button class="example" type="button" data-title="Cybersecurity Analyst">Cybersecurity Analyst</button>
          </div>
        </div>
      </section>

      <aside class="report" aria-label="Occupation forecast" aria-live="polite">
        <div class="report-topline">
          <span>Jev forecast dossier</span>
          <span class="live-dot" id="provider-status" data-mode="unknown" role="status">Checking source</span>
        </div>
        <p class="source-note" id="provider-note">Checking whether this deployment has Jev configured.</p>

        <div class="empty-state" id="empty-state">
          <div>
            <div class="empty-graphic" aria-hidden="true"><span></span></div>
            <h2>Your forecast will appear here.</h2>
            <p>Enter an occupation to compare automation exposure with the durable human qualities the role requires.</p>
          </div>
        </div>

        <div class="loading-state" id="loading-state" aria-hidden="true">
          <div class="skeleton short"></div>
          <div class="skeleton"></div>
          <div class="skeleton hero"></div>
          <div class="skeleton"></div>
          <div class="skeleton"></div>
        </div>

        <div class="error-state" id="error-state" aria-hidden="true">
          <div>
            <div class="error-code">!</div>
            <h2>Forecast interrupted</h2>
            <p id="error-message">The analysis could not be completed. Check the details and try again.</p>
          </div>
        </div>

        <div class="result-state" id="result-state" aria-hidden="true">
          <div class="result-heading">
            <p class="result-kicker">Occupation under review</p>
            <h2 id="result-title"></h2>
          </div>

          <div class="score-row">
            <div class="risk-gauge">
              <div class="gauge" id="risk-gauge">
                <div class="gauge-inner">
                  <div><span class="gauge-value" id="risk-value">0%</span><span class="gauge-label">Layoff risk</span></div>
                </div>
              </div>
            </div>
            <div class="verdict">
              <span class="trajectory-badge" id="trajectory-badge"></span>
              <h3 id="verdict-title"></h3>
              <p id="verdict-copy"></p>
            </div>
          </div>

          <div class="metrics">
            <div class="metric">
              <div class="metric-head"><span>Career resilience</span><span class="metric-value" id="resilience-value"></span></div>
              <div class="bar"><div class="bar-fill" id="resilience-bar"></div></div>
              <p class="metric-note">Capacity to retain value as AI changes the work.</p>
            </div>
            <div class="metric">
              <div class="metric-head"><span>Human accountability</span><span class="metric-value" id="accountability-value"></span></div>
              <div class="bar"><div class="bar-fill" id="accountability-bar"></div></div>
              <p class="metric-note">Need for human ownership, trust, and judgment.</p>
            </div>
          </div>

          <div class="report-footer">
            <span id="source-label"></span>
            <span id="confidence-label"></span>
          </div>
        </div>
      </aside>
    </main>

    <footer class="page-note">
      <span><strong>Method:</strong> TypeSafe Jev evaluates three typed judgments; application code combines them into a resilience score.</span>
      <span>Directional forecast, not employment or financial advice.</span>
    </footer>
  </div>

  <script>
    (function () {
      var form = document.getElementById('analyzer-form');
      var titleInput = document.getElementById('title');
      var descriptionInput = document.getElementById('description');
      var submitButton = document.getElementById('submit-button');
      var submitLabel = document.getElementById('submit-label');
      var providerStatus = document.getElementById('provider-status');
      var providerNote = document.getElementById('provider-note');
      var analysisStarted = false;

      function setProviderStatus(mode, label, note) {
        providerStatus.dataset.mode = mode;
        providerStatus.textContent = label;
        providerNote.textContent = note;
      }

      async function checkProvider() {
        try {
          var response = await fetch('/health', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
          if (!response.ok) throw new Error('Status unavailable');
          var data = await response.json();
          if (analysisStarted) return;
          if (data.analysisMode === 'jev') {
            setProviderStatus('unknown', 'Jev configured', 'API key is set. Run a forecast to verify a live Jev response.');
          } else if (data.analysisMode === 'mock') {
            setProviderStatus('mock', 'Demo mode', 'Not using Jev: JEV_API_KEY is missing. Set it in Vercel environment variables and redeploy.');
          } else {
            throw new Error('Unknown source');
          }
        } catch (error) {
          if (!analysisStarted) setProviderStatus('unknown', 'Source unknown', 'Could not check configuration. Run a forecast to check its source.');
        }
      }

      void checkProvider();

      var states = {
        empty: document.getElementById('empty-state'),
        loading: document.getElementById('loading-state'),
        error: document.getElementById('error-state'),
        result: document.getElementById('result-state')
      };

      var trajectoryContent = {
        high_layoff_risk: {
          badge: 'High layoff risk',
          title: 'Core tasks face substitution pressure.',
          copy: 'The role is exposed to meaningful headcount contraction. Building oversight, relationship, and domain-specialist skills may improve durability.'
        },
        transformed_hybrid: {
          badge: 'Transformed hybrid',
          title: 'The role changes more than it disappears.',
          copy: 'AI is likely to absorb routine work while increasing the value of judgment, coordination, and effective use of automated tools.'
        },
        ruling_trend: {
          badge: 'Ruling / trending',
          title: 'Demand is positioned to strengthen.',
          copy: 'This work combines durable human value with growing strategic importance. AI is more likely to amplify capacity than remove the role.'
        }
      };

      function showState(name) {
        Object.keys(states).forEach(function (key) {
          var active = key === name;
          states[key].setAttribute('aria-hidden', String(!active));
          if (key === 'empty') states[key].style.display = active ? 'grid' : 'none';
        });
      }

      function asPercent(value) {
        return Math.round(value * 100) + '%';
      }

      function riskColor(value) {
        if (value >= 0.7) return '#d94b32';
        if (value >= 0.4) return '#d28c19';
        return '#237a57';
      }

      function renderResult(data) {
        var trajectory = trajectoryContent[data.futureTrajectory];
        var riskPercent = Math.round(data.layoffRisk * 100);
        var gauge = document.getElementById('risk-gauge');

        document.getElementById('result-title').textContent = data.title;
        document.getElementById('risk-value').textContent = riskPercent + '%';
        gauge.style.setProperty('--score', String(riskPercent));
        gauge.style.setProperty('--gauge-color', riskColor(data.layoffRisk));

        var badge = document.getElementById('trajectory-badge');
        badge.textContent = trajectory.badge;
        badge.className = 'trajectory-badge ' + data.futureTrajectory;
        document.getElementById('verdict-title').textContent = trajectory.title;
        document.getElementById('verdict-copy').textContent = trajectory.copy;

        document.getElementById('resilience-value').textContent = asPercent(data.resilienceScore);
        document.getElementById('accountability-value').textContent = asPercent(data.humanAccountability);
        document.getElementById('resilience-bar').style.width = asPercent(data.resilienceScore);
        document.getElementById('accountability-bar').style.width = asPercent(data.humanAccountability);
        if (data.source === 'jev') {
          setProviderStatus('jev', 'Live Jev result', 'This forecast was returned by TypeSafe Jev. Model: ' + data.model);
        } else if (data.source === 'mock') {
          setProviderStatus('mock', 'Demo mode', 'This forecast uses simulated data, not Jev. Set JEV_API_KEY in Vercel and redeploy for live analysis.');
        } else {
          setProviderStatus('unknown', 'Source unknown', 'The response did not identify its analysis source.');
        }
        document.getElementById('source-label').textContent = data.source === 'jev' ? 'Source: TypeSafe Jev' : data.source === 'mock' ? 'Source: Simulated data' : 'Source: Unknown';
        document.getElementById('confidence-label').textContent = 'Trajectory confidence: ' + asPercent(data.trajectoryConfidence);
        showState('result');
      }

      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        analysisStarted = true;
        setProviderStatus('unknown', 'Checking result source', 'Waiting for this forecast to confirm whether Jev or simulated data was used.');
        submitButton.disabled = true;
        submitLabel.textContent = 'Evaluating labor signals...';
        showState('loading');

        var payload = { title: titleInput.value.trim() };
        var description = descriptionInput.value.trim();
        if (description) payload.description = description;

        try {
          var response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          var body = await response.json();
          if (!response.ok) {
            throw new Error(body.error || 'The analysis service returned an error.');
          }
          renderResult(body);
          if (window.innerWidth < 901) document.querySelector('.report').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
          setProviderStatus('error', 'Analysis failed', 'No result was received; live Jev usage could not be confirmed for this request.');
          document.getElementById('error-message').textContent = error instanceof Error ? error.message : 'The analysis could not be completed.';
          showState('error');
        } finally {
          submitButton.disabled = false;
          submitLabel.textContent = 'Run occupation forecast';
        }
      });

      document.querySelectorAll('.example').forEach(function (button) {
        button.addEventListener('click', function () {
          titleInput.value = button.getAttribute('data-title') || '';
          titleInput.focus();
        });
      });
    }());
  </script>
</body>
</html>`;
