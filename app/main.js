/* Deal Ember bootstrap: header, footer, filter wiring and routing. */
import { renderRoute, refreshResults, filters } from "./router.js";
import { ALL_DEALS, CATEGORIES, STORES } from "./deals.js";

const header = document.getElementById("site-header");
header.innerHTML =
  '<a class="brand" href="#/"><span class="flame" aria-hidden="true"></span>Deal Ember</a>' +
  '<nav aria-label="Main">' +
  '<a href="#/">Deals</a>' +
  '<a href="#/categories">Categories</a>' +
  '<a href="#/stores">Stores</a>' +
  '<a href="#/compare">Compare</a>' +
  '<a href="#/savings">Savings</a>' +
  '<a href="#/calendar">Calendar</a>' +
  '<a href="#/guides">Guides</a>' +
  '<a href="#/faq">FAQ</a>' +
  '</nav>';

const footer = document.getElementById("site-footer");
footer.innerHTML =
  '<p><b>Deal Ember</b> — ' + ALL_DEALS.length + ' Black Friday deals across ' + CATEGORIES.length + ' categories and ' + STORES.length +
  ' stores. Every price was read on Nov 27, 2026, and each deal card names its source.</p>' +
  '<p>Prices change fast during Black Friday week. Confirm the price at the store before you pay. ' +
  '<a href="#/about">How this site works</a> &middot; <a href="#/guides">Saving guides</a> &middot; <a href="#/calendar">Deal calendar</a></p>';

const app = document.getElementById("app");

app.addEventListener("input", (ev) => {
  if (ev.target.id === "f-q") {
    filters.q = ev.target.value;
    refreshResults();
  }
});

app.addEventListener("change", (ev) => {
  if (ev.target.id === "f-cat") { filters.cat = ev.target.value; renderRoute(); }
  if (ev.target.id === "f-store") { filters.store = ev.target.value; renderRoute(); }
  if (ev.target.id === "f-pct") { filters.minPct = Number(ev.target.value); refreshResults(); }
  if (ev.target.id === "f-sort") { filters.sort = ev.target.value; refreshResults(); }
});

window.addEventListener("hashchange", () => {
  renderRoute();
});

renderRoute();
