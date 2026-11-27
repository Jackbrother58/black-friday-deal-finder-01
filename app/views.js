/* Deal cards, the filter bar and the list pages: home, category and store. */
import { ALL_DEALS, CATEGORIES, STORES, CHECKED, CHECKED_SHORT, dealById, dealsInCategory, dealsAtStore } from "./deals.js";
import { discountPct, savedAmount, money, moneyWhole, verdictLabel, storeUrl, totalSavings, bestDiscount } from "./calc.js";
import { applyFilters, SORT_OPTIONS, MIN_PCT_OPTIONS } from "./filters.js";
import { isWatched, toggleWatch } from "./store.js";

export function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function catLabel(id) {
  const c = CATEGORIES.find((x) => x.id === id);
  return c ? c.label : id;
}

export function dealCard(d, opts) {
  const pct = discountPct(d);
  const watched = isWatched(d.id);
  const showCat = !opts || opts.cat !== false;
  return (
    '<article class="card">' +
    '<div class="card-top"><span class="store-chip">' + esc(d.store) + '</span>' +
    '<span class="verdict v-' + d.verdict + '">' + verdictLabel(d.verdict) + '</span></div>' +
    '<h3 class="card-name"><a href="#/deal/' + d.id + '">' + esc(d.name) + '</a></h3>' +
    (showCat ? '<p class="card-cat">' + esc(catLabel(d.cat)) + '</p>' : "") +
    '<p class="card-prices"><span class="sale">' + money(d.sale) + '</span> ' +
    '<span class="was">' + money(d.was) + '</span> ' +
    '<span class="pct">-' + pct + '%</span></p>' +
    '<p class="card-save">Save ' + money(savedAmount(d)) + ' &middot; checked ' + esc(CHECKED_SHORT) + '</p>' +
    '<p class="card-src">Price read at ' + esc(d.source) + '</p>' +
    '<div class="card-actions">' +
    '<a class="btn-store" href="' + storeUrl(d) + '" target="_blank" rel="noopener">View at ' + esc(d.store) + ' &rarr;</a>' +
    '<button class="btn-watch' + (watched ? " on" : "") + '" data-watch="' + d.id + '">' + (watched ? "Saved" : "Save") + '</button>' +
    '</div></article>'
  );
}

export function filterBar(f, counts) {
  const catOpts = ['<option value="all">All categories</option>'].concat(
    CATEGORIES.map((c) => '<option value="' + c.id + '"' + (f.cat === c.id ? " selected" : "") + ">" + esc(c.label) + " (" + counts[c.id] + ")</option>")
  ).join("");
  const storeOpts = ['<option value="all">All stores</option>'].concat(
    STORES.map((s) => '<option value="' + esc(s.name) + '"' + (f.store === s.name ? " selected" : "") + ">" + esc(s.name) + "</option>")
  ).join("");
  const pctOpts = MIN_PCT_OPTIONS.map((o) => '<option value="' + o.value + '"' + (f.minPct === o.value ? " selected" : "") + ">" + o.label + "</option>").join("");
  const sortOpts = SORT_OPTIONS.map((o) => '<option value="' + o.value + '"' + (f.sort === o.value ? " selected" : "") + ">" + o.label + "</option>").join("");
  return (
    '<section class="filters" aria-label="Search and filter deals">' +
    '<input id="f-q" type="search" placeholder="Search deals, stores, products..." value="' + esc(f.q) + '" aria-label="Search deals">' +
    '<select id="f-cat" aria-label="Filter by category">' + catOpts + '</select>' +
    '<select id="f-store" aria-label="Filter by store">' + storeOpts + '</select>' +
    '<select id="f-pct" aria-label="Filter by minimum discount">' + pctOpts + '</select>' +
    '<select id="f-sort" aria-label="Sort deals">' + sortOpts + '</select>' +
    '</section>'
  );
}

export function countsByCat() {
  const out = {};
  for (const c of CATEGORIES) out[c.id] = 0;
  for (const d of ALL_DEALS) out[d.cat] = (out[d.cat] || 0) + 1;
  return out;
}

export function heroStats() {
  const best = bestDiscount(ALL_DEALS);
  const lows = ALL_DEALS.filter((d) => d.verdict === "new-low").length;
  return (
    '<section class="hero">' +
    '<div class="hero-text"><h1>Black Friday deals, checked today.</h1>' +
    '<p>' + ALL_DEALS.length + ' real deals from ' + STORES.length + ' stores, every price read on Nov 27, 2026. No inflated list prices, no guesswork: each card shows the sale price, the usual price, the saving, and whether it is really a deal.</p></div>' +
    '<div class="hero-stats">' +
    '<div class="stat"><b>' + ALL_DEALS.length + '</b><span>deals checked</span></div>' +
    '<div class="stat"><b>' + moneyWhole(totalSavings(ALL_DEALS)) + '</b><span>total savings</span></div>' +
    '<div class="stat"><b>-' + discountPct(best) + '%</b><span>deepest cut</span></div>' +
    '<div class="stat"><b>' + lows + '</b><span>new lows</span></div>' +
    '</div></section>'
  );
}

export function dealOfDay() {
  const d = dealById("airpods-pro-3");
  return (
    '<section class="dotd"><span class="dotd-tag">DEAL OF THE DAY</span>' +
    '<h2><a href="#/deal/' + d.id + '">' + esc(d.name) + '</a></h2>' +
    '<p class="dotd-prices"><span class="sale big">' + money(d.sale) + '</span> <span class="was">' + money(d.was) + '</span> <span class="pct">-' + discountPct(d) + '%</span></p>' +
    '<p>' + esc(d.evidence) + ' At ' + esc(d.store) + ', checked ' + esc(CHECKED) + '.</p>' +
    '<a class="btn-store" href="' + storeUrl(d) + '" target="_blank" rel="noopener">View at ' + esc(d.store) + ' &rarr;</a> ' +
    '<a class="btn-ghost" href="#/deal/' + d.id + '">Why it is a new low</a></section>'
  );
}

export function listPage(f, base) {
  const list = applyFilters(base, f);
  const counts = countsByCat();
  let html = heroStats() + dealOfDay() + filterBar(f, counts);
  html += '<p class="result-count">' + list.length + ' deal' + (list.length === 1 ? "" : "s") + ' found &middot; sorted by ' +
    esc((SORT_OPTIONS.find((o) => o.value === f.sort) || {}).label || "") + '</p>';
  if (list.length === 0) {
    html += '<p class="empty">No deals match those filters. Try clearing the search or lowering the minimum discount.</p>';
  } else {
    html += '<div class="grid">' + list.map((d) => dealCard(d)).join("") + "</div>";
  }
  return html;
}

export function categoryPage(catId, f) {
  const c = CATEGORIES.find((x) => x.id === catId);
  if (!c) return '<p class="empty">No such category. <a href="#/">Back to all deals</a></p>';
  const base = dealsInCategory(catId);
  const list = applyFilters(base, { ...f, cat: catId });
  let html = '<section class="page-head"><h1>' + esc(c.label) + '</h1><p>' + esc(c.blurb) + ' ' + base.length +
    ' deals, total savings ' + money(totalSavings(base)) + '.</p></section>';
  html += filterBar({ ...f, cat: catId }, countsByCat());
  html += '<p class="result-count">' + list.length + ' deals in ' + esc(c.label) + '</p>';
  html += '<div class="grid">' + list.map((d) => dealCard(d, { cat: false })).join("") + "</div>";
  return html;
}

export function storePage(storeName, f) {
  const list0 = dealsAtStore(storeName);
  if (list0.length === 0) return '<p class="empty">No deals at that store yet. <a href="#/">Back to all deals</a></p>';
  const list = applyFilters(list0, { ...f, store: storeName });
  let html = '<section class="page-head"><h1>Deals at ' + esc(storeName) + '</h1><p>' + list0.length +
    ' deals, total savings ' + money(totalSavings(list0)) + '. Prices checked ' + esc(CHECKED) + '.</p></section>';
  html += filterBar({ ...f, store: storeName }, countsByCat());
  html += '<p class="result-count">' + list.length + ' deals at ' + esc(storeName) + '</p>';
  html += '<div class="grid">' + list.map((d) => dealCard(d)).join("") + "</div>";
  return html;
}

export function bindWatchButtons(root) {
  root.querySelectorAll("[data-watch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const on = toggleWatch(btn.getAttribute("data-watch"));
      btn.textContent = on ? "Saved" : "Save";
      btn.classList.toggle("on", on);
    });
  });
}
