/* Savings tracker, calendar, guides, FAQ and method pages. */
import { ALL_DEALS, CATEGORIES, STORES, CHECKED } from "./deals.js";
import { SOURCES, ALL_GUIDES, guideById, countClaims } from "./guides.js";
import { discountPct, savedAmount, money, moneyWhole, totalSavings } from "./calc.js";
import { esc, catLabel, dealCard, bindWatchButtons } from "./views.js";
import { state, watchedDeals, setGoal, clearWatchlist } from "./store.js";

export function savingsPage() {
  const watched = watchedDeals(ALL_DEALS);
  const saved = totalSavings(watched);
  const goal = state.goal;
  const pct = Math.min(100, Math.round((saved / goal) * 100));
  let html = '<section class="page-head"><h1>Your savings tracker</h1>' +
    '<p>Save deals to your watchlist and watch the total climb. Nothing leaves your browser.</p></section>';
  html += '<div class="tracker"><p class="tracker-big">You would save <b>' + money(saved) + '</b> on ' + watched.length + ' saved deal' + (watched.length === 1 ? "" : "s") + '</p>' +
    '<div class="progress"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<p>' + pct + '% of your ' + moneyWhole(goal) + ' savings goal.</p>' +
    '<label>Goal: <select id="goal-select">' + [250, 500, 1000, 2000].map((g) => '<option value="' + g + '"' + (goal === g ? " selected" : "") + ">" + moneyWhole(g) + "</option>").join("") + '</select></label> ' +
    '<button class="btn-ghost" id="export-csv">Export CSV</button> ' +
    '<button class="btn-ghost" id="export-json">Export JSON</button> ' +
    (watched.length ? '<button class="btn-ghost" id="clear-watch">Clear watchlist</button>' : "") + '</div>';
  if (watched.length === 0) {
    html += '<p class="empty">Your watchlist is empty. Tap Save on any deal card to add it here.</p>';
  } else {
    html += '<div class="grid">' + watched.map((d) => dealCard(d)).join("") + "</div>";
  }
  html += '<h2>All ' + ALL_DEALS.length + ' deals, by saving</h2><p>If you bought every deal on this site you would save ' + money(totalSavings(ALL_DEALS)) + ' against usual prices.</p>';
  return html;
}

export function bindSavings(root) {
  bindWatchButtons(root);
  const goalSel = root.querySelector("#goal-select");
  if (goalSel) goalSel.addEventListener("change", () => { setGoal(Number(goalSel.value)); location.hash = "#/savings"; });
  const csvBtn = root.querySelector("#export-csv");
  if (csvBtn) csvBtn.addEventListener("click", () => downloadFile(csvText(watchedDeals(ALL_DEALS)), "deal-ember-watchlist.csv", "text/csv"));
  const jsonBtn = root.querySelector("#export-json");
  if (jsonBtn) jsonBtn.addEventListener("click", () => downloadFile(jsonText(watchedDeals(ALL_DEALS)), "deal-ember-watchlist.json", "application/json"));
  const clearBtn = root.querySelector("#clear-watch");
  if (clearBtn) clearBtn.addEventListener("click", () => { clearWatchlist(); location.hash = "#/savings"; });
}

export function csvText(deals) {
  const head = "product,store,category,sale_price,usual_price,discount_pct,you_save,verdict,checked,source";
  const rows = deals.map((d) => [d.name, d.store, catLabel(d.cat), d.sale, d.was, discountPct(d), savedAmount(d), d.verdict, CHECKED, d.source]
    .map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","));
  return head + "\n" + rows.join("\n");
}

export function jsonText(deals) {
  return JSON.stringify(deals.map((d) => ({
    product: d.name, store: d.store, category: catLabel(d.cat), sale: d.sale, usual: d.was,
    discount_pct: discountPct(d), save: savedAmount(d), verdict: d.verdict, checked: CHECKED, source: d.source,
  })), null, 2);
}

export function downloadFile(text, name, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const CALENDAR_EVENTS = [
  { date: "Nov 19", title: "Amazon Black Friday Week opens", detail: "Twelve days of deals begin, running to Nov 30." },
  { date: "Nov 19", title: "Best Buy Black Friday sale opens", detail: "Runs to Nov 28, with doorbusters through the week." },
  { date: "Nov 22", title: "Target and Kohl's sales open", detail: "Target runs to Nov 29, Kohl's to Nov 28." },
  { date: "Nov 23", title: "Walmart Black Friday deals open", detail: "Online for everyone; runs to Nov 29." },
  { date: "Nov 26", title: "Thanksgiving: stores closed", detail: "Walmart, Target, Costco, Kohl's, Home Depot and Best Buy shut their doors." },
  { date: "Nov 27", title: "Black Friday", detail: "Best Buy stores open 6 a.m. to 10 p.m.; Kohl's opens 5 a.m." },
  { date: "Nov 29", title: "Cyber Sunday", detail: "Best Buy Cyber Sunday and Monday sales begin." },
  { date: "Nov 30", title: "Cyber Monday", detail: "Amazon sale ends; Walmart Cyber Monday deals run to Dec 2." },
  { date: "Dec 2", title: "Walmart Cyber Monday ends", detail: "Last day of the Walmart Cyber Monday event." },
];

export function calendarPage() {
  let html = '<section class="page-head"><h1>Deal calendar: Nov 19 to Dec 2</h1>' +
    '<p>Every sale window on one timeline, so you know what is still coming and what has already ended.</p></section>';
  html += '<ol class="timeline">';
  for (const e of CALENDAR_EVENTS) {
    html += '<li><span class="tl-date">' + esc(e.date) + '</span><b>' + esc(e.title) + '</b><span>' + esc(e.detail) + '</span></li>';
  }
  html += '</ol>';
  html += '<h2>What to watch next</h2><p>Cyber Monday on Nov 30 is the last big day. Amazon ends its sale that day, while Walmart keeps Cyber Monday deals going to Dec 2. If a deal you want is still in stock on Nov 30, that is the day to decide.</p>';
  return html;
}

export function categoriesPage() {
  let html = '<section class="page-head"><h1>Browse by category</h1><p>Eight categories, ' + ALL_DEALS.length + ' deals, all checked Nov 27, 2026.</p></section><div class="cat-list">';
  for (const c of CATEGORIES) {
    const deals = ALL_DEALS.filter((d) => d.cat === c.id);
    const best = deals.reduce((b, d) => (discountPct(d) > discountPct(b) ? d : b), deals[0]);
    html += '<a class="cat-card" href="#/category/' + c.id + '"><h2>' + esc(c.label) + '</h2><p>' + esc(c.blurb) + '</p>' +
      '<p><b>' + deals.length + ' deals</b> &middot; save up to ' + money(totalSavings(deals)) + ' &middot; deepest cut ' + discountPct(best) + '%</p></a>';
  }
  html += '</div>';
  return html;
}

export function storesPage() {
  let html = '<section class="page-head"><h1>Browse by store</h1><p>Seven stores, one list each. Compare the same product across stores on the compare page.</p></section><div class="cat-list">';
  for (const s of STORES) {
    const deals = ALL_DEALS.filter((d) => d.store === s.name);
    html += '<a class="cat-card" href="#/store/' + encodeURIComponent(s.name) + '"><h2>' + esc(s.name) + '</h2>' +
      '<p><b>' + deals.length + ' deal' + (deals.length === 1 ? "" : "s") + '</b> &middot; save up to ' + money(totalSavings(deals)) + '</p></a>';
  }
  html += '</div>';
  return html;
}

export function guidesPage() {
  const counts = countClaims();
  let html = '<section class="page-head"><h1>Saving guides</h1><p>' + ALL_GUIDES.length + ' short guides, ' + counts.total +
    ' checkable claims, every one cited to a source. ' + counts.distinct + ' sources in all.</p></section><div class="cat-list">';
  for (const g of ALL_GUIDES) {
    html += '<a class="cat-card" href="#/guide/' + g.id + '"><h2>' + esc(g.title) + '</h2><p>' + esc(g.deck) + '</p><p><b>' + g.claims.length + ' claims</b>, all cited</p></a>';
  }
  html += '</div>' + sourcesBlock();
  return html;
}

export function guidePage(id) {
  const g = guideById(id);
  if (!g) return '<p class="empty">No such guide. <a href="#/guides">Back to guides</a></p>';
  let html = '<section class="page-head"><p class="crumbs"><a href="#/guides">Guides</a> &rsaquo; ' + esc(g.title) + '</p>' +
    '<h1>' + esc(g.title) + '</h1><p>' + esc(g.deck) + '</p></section>';
  html += '<ol class="claims">';
  g.claims.forEach((c, i) => {
    html += '<li><span class="claim-num">' + (i + 1) + '.</span> ' + esc(c[0]) + ' ' +
      c[1].map((s) => '<sup class="cite">[' + s + ']</sup>').join(" ") + '</li>';
  });
  html += '</ol>' + sourcesBlock();
  return html;
}

export function sourcesBlock() {
  let html = '<section class="sources"><h2>Sources</h2><p>Plain domain names, as cited. Prices were read from the store or the roundup named on each deal card on Nov 27, 2026.</p><ol class="source-list">';
  for (const s of SOURCES) {
    html += '<li><b>[' + s.id + '] ' + esc(s.domain) + '</b> — ' + esc(s.what) + '</li>';
  }
  html += '</ol></section>';
  return html;
}

export function faqPage() {
  const qa = [
    ["Are these prices real?", "Yes. Every deal on this site was read on Nov 27, 2026 from the store or a deals roundup that names the store. Each card shows when it was checked and where the price was read."],
    ["How is the discount worked out?", "From the two prices: (usual price minus sale price) divided by the usual price. The detail page shows the maths for each deal, so you can check it yourself."],
    ["What does NEW LOW mean?", "The lowest price tracked for that product. STRONG means a big cut on a product worth buying. ROUTINE means a real but small discount. The evidence for each verdict sits on the deal page."],
    ["Why is the same product listed twice?", "When two stores sell the same product at different prices, both listings stay up so you can compare. The compare page lines them up side by side."],
    ["Do prices change?", "Yes, fast, during Black Friday week. A deal checked in the morning can be gone by evening. Always confirm the price at the store before paying."],
    ["Does the watchlist send my data anywhere?", "No. Your watchlist and savings goal live in your own browser and nowhere else."],
    ["When does the sale end?", "Amazon ends Nov 30, Best Buy Nov 28, Target Nov 29, Kohl's Nov 28, and Walmart's Cyber Monday deals run to Dec 2. See the calendar page for the full timeline."],
  ];
  let html = '<section class="page-head"><h1>Questions, answered plainly</h1></section><div class="faq">';
  for (const [q, a] of qa) html += '<div class="faq-item"><h2>' + esc(q) + '</h2><p>' + esc(a) + '</p></div>';
  html += '</div>';
  return html;
}

export function aboutPage() {
  const counts = countClaims();
  return '<section class="page-head"><h1>How this site works</h1>' +
    '<p>Deal Ember is a small deal finder built for Black Friday 2026. It lists ' + ALL_DEALS.length + ' deals across ' + CATEGORIES.length + ' categories and ' + STORES.length + ' stores.</p></section>' +
    '<div class="faq-item"><h2>How prices were checked</h2><p>Each price was read on Nov 27, 2026 from the store itself or from a deals roundup that names the store. The source sits on every deal card, and the full source list is on the guides page. No price was guessed, and no deal comes from a roundup published before the sale opened.</p></div>' +
    '<div class="faq-item"><h2>How verdicts work</h2><p>NEW LOW means the lowest price tracked for that product. STRONG means a big cut on a product worth buying. ROUTINE means a real but small discount. Each verdict carries its evidence on the deal page.</p></div>' +
    '<div class="faq-item"><h2>The guides</h2><p>' + ALL_GUIDES.length + ' guides hold ' + counts.total + ' claims, all cited inline, drawn from ' + counts.distinct + ' sources. ' + counts.multi + ' of the claims cite two or more sources.</p></div>' +
    '<div class="faq-item"><h2>What this site does not do</h2><p>It never takes payment, never asks for an account, and never tracks you. Store links open the store in a new tab; the site itself loads nothing from the network.</p></div>';
}
