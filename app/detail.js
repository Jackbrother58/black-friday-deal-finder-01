/* Deal detail page and the side-by-side comparison page. */
import { ALL_DEALS, CHECKED, dealById } from "./deals.js";
import { discountPct, savedAmount, money, verdictLabel, verdictHint, storeUrl, groupMates } from "./calc.js";
import { esc, catLabel, dealCard, bindWatchButtons } from "./views.js";
import { isWatched } from "./store.js";

export function detailPage(id) {
  const d = dealById(id);
  if (!d) return '<p class="empty">No deal with that name. <a href="#/">Back to all deals</a></p>';
  const pct = discountPct(d);
  const mates = groupMates(d, ALL_DEALS);
  const watched = isWatched(d.id);
  let html = '<section class="detail">';
  html += '<p class="crumbs"><a href="#/">All deals</a> &rsaquo; <a href="#/category/' + d.cat + '">' + esc(catLabel(d.cat)) + '</a> &rsaquo; ' + esc(d.store) + '</p>';
  html += '<h1>' + esc(d.name) + '</h1>';
  html += '<p class="detail-store">' + esc(d.store) + ' &middot; ' + esc(catLabel(d.cat)) + ' &middot; <span class="verdict v-' + d.verdict + '">' + verdictLabel(d.verdict) + '</span></p>';
  html += '<div class="detail-grid"><div class="detail-pricebox">';
  html += '<p class="sale big">' + money(d.sale) + '</p>';
  html += '<p>Usual price <span class="was">' + money(d.was) + '</span></p>';
  html += '<p>You save <b>' + money(savedAmount(d)) + '</b> (' + pct + '% off)</p>';
  html += '<p class="detail-note">' + esc(d.note) + '</p>';
  html += '<a class="btn-store big" href="' + storeUrl(d) + '" target="_blank" rel="noopener">View at ' + esc(d.store) + ' &rarr;</a> ';
  html += '<button class="btn-watch' + (watched ? " on" : "") + '" data-watch="' + d.id + '">' + (watched ? "Saved to watchlist" : "Save to watchlist") + '</button>';
  html += '</div><div class="detail-verdictbox">';
  html += '<h2>Is it really a deal?</h2>';
  html += '<p><b>' + verdictLabel(d.verdict) + '.</b> ' + esc(verdictHint(d.verdict)) + '</p>';
  html += '<p>' + esc(d.evidence) + '</p>';
  html += '<h2>Price check</h2>';
  html += '<p>Sale price ' + money(d.sale) + ', usual price ' + money(d.was) + ', discount ' + pct + '% — the maths checks out: (' +
    money(d.was) + ' &minus; ' + money(d.sale) + ') &divide; ' + money(d.was) + ' = ' + pct + '%.</p>';
  html += '<p>Checked <b>' + esc(CHECKED) + '</b>. Price read at <b>' + esc(d.source) + '</b> for the ' + esc(d.store) + ' listing.</p>';
  html += '</div></div>';
  if (mates.length > 0) {
    html += '<h2>Same product at another store</h2><p>Compare before you buy. The cheapest listing is marked.</p>';
    html += '<table class="compare-table"><thead><tr><th>Store</th><th>Sale price</th><th>Usual price</th><th>Discount</th><th>You save</th><th></th></tr></thead><tbody>';
    const all = [d, ...mates].sort((a, b) => a.sale - b.sale);
    for (const m of all) {
      html += '<tr' + (m.id === all[0].id ? ' class="cheapest"' : "") + '><td>' + esc(m.store) + (m.id === all[0].id ? ' <span class="tag-cheap">cheapest</span>' : "") +
        '</td><td>' + money(m.sale) + '</td><td>' + money(m.was) + '</td><td>-' + discountPct(m) + '%</td><td>' + money(savedAmount(m)) + '</td>' +
        '<td><a href="' + storeUrl(m) + '" target="_blank" rel="noopener">View &rarr;</a></td></tr>';
    }
    html += '</tbody></table>';
  }
  const sameCat = ALL_DEALS.filter((x) => x.cat === d.cat && x.id !== d.id).slice(0, 6);
  html += '<h2>More in ' + esc(catLabel(d.cat)) + '</h2><div class="grid">' + sameCat.map((x) => dealCard(x, { cat: false })).join("") + '</div>';
  html += '</section>';
  return html;
}

export function comparePage() {
  const groups = {};
  for (const d of ALL_DEALS) if (d.group) (groups[d.group] = groups[d.group] || []).push(d);
  const names = Object.keys(groups);
  if (names.length === 0) return '<p class="empty">No products are listed at two stores yet.</p>';
  let html = '<section class="page-head"><h1>Compare the same product across stores</h1>' +
    '<p>Some products are on sale at more than one store. The cheapest listing wins, but check the usual price too.</p></section>';
  for (const g of names) {
    const items = [...groups[g]].sort((a, b) => a.sale - b.sale);
    html += '<h2>' + esc(items[0].name) + '</h2>';
    html += '<table class="compare-table"><thead><tr><th>Store</th><th>Sale price</th><th>Usual price</th><th>Discount</th><th>You save</th><th>Verdict</th><th></th></tr></thead><tbody>';
    for (const m of items) {
      html += '<tr' + (m.id === items[0].id ? ' class="cheapest"' : "") + '><td>' + esc(m.store) + (m.id === items[0].id ? ' <span class="tag-cheap">cheapest</span>' : "") +
        '</td><td>' + money(m.sale) + '</td><td>' + money(m.was) + '</td><td>-' + discountPct(m) + '%</td><td>' + money(savedAmount(m)) + '</td>' +
        '<td><span class="verdict v-' + m.verdict + '">' + verdictLabel(m.verdict) + '</span></td>' +
        '<td><a href="#/deal/' + m.id + '">Details</a></td></tr>';
    }
    html += '</tbody></table>';
  }
  return html;
}

export function bindDetail(root) {
  bindWatchButtons(root);
}
