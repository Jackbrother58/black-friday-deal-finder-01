/* Hash router for Deal Ember. Every page is a hash route so the static site
   works from any server with no extra setup. */
import { defaultFilters, applyFilters } from "./filters.js";
import { listPage, categoryPage, storePage, bindWatchButtons, dealCard } from "./views.js";
import { detailPage, comparePage, bindDetail } from "./detail.js";
import { savingsPage, bindSavings, calendarPage, categoriesPage, storesPage, guidesPage, guidePage, faqPage, aboutPage } from "./pages.js";
import { ALL_DEALS } from "./deals.js";

export const filters = defaultFilters();

function resultsHtml(f, base) {
  const list = applyFilters(base, f);
  if (list.length === 0) return '<p class="empty">No deals match those filters. Try clearing the search or lowering the minimum discount.</p>';
  return '<div class="grid">' + list.map((d) => dealCard(d)).join("") + "</div>";
}

function countLine(f, base, label) {
  const n = applyFilters(base, f).length;
  return '<p class="result-count">' + n + ' deal' + (n === 1 ? "" : "s") + label + '</p>';
}

export function renderRoute() {
  const app = document.getElementById("app");
  const raw = (location.hash || "#/").slice(1);
  const parts = raw.split("/").filter(Boolean);
  let html = "";
  let base = ALL_DEALS;
  let label = " found";
  if (parts.length === 0) {
    html = listPage(filters, ALL_DEALS);
  } else if (parts[0] === "deal" && parts[1]) {
    html = detailPage(decodeURIComponent(parts[1]));
    bindDetail(app);
  } else if (parts[0] === "category" && parts[1]) {
    html = categoryPage(parts[1], filters);
    base = ALL_DEALS.filter((d) => d.cat === parts[1]);
    label = " in this category";
  } else if (parts[0] === "store" && parts[1]) {
    html = storePage(decodeURIComponent(parts[1]), filters);
    base = ALL_DEALS.filter((d) => d.store === decodeURIComponent(parts[1]));
    label = " at this store";
  } else if (parts[0] === "compare") {
    html = comparePage();
  } else if (parts[0] === "savings") {
    html = savingsPage();
    bindSavings(app);
  } else if (parts[0] === "calendar") {
    html = calendarPage();
  } else if (parts[0] === "categories") {
    html = categoriesPage();
  } else if (parts[0] === "stores") {
    html = storesPage();
  } else if (parts[0] === "guides") {
    html = guidesPage();
  } else if (parts[0] === "guide" && parts[1]) {
    html = guidePage(parts[1]);
  } else if (parts[0] === "faq") {
    html = faqPage();
  } else if (parts[0] === "about") {
    html = aboutPage();
  } else {
    html = listPage(filters, ALL_DEALS);
  }
  app.innerHTML = html;
  bindWatchButtons(app);
  if (parts[0] === "deal") bindDetail(app);
  if (parts[0] === "savings") bindSavings(app);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

export function refreshResults() {
  const app = document.getElementById("app");
  const raw = (location.hash || "#/").slice(1);
  const parts = raw.split("/").filter(Boolean);
  let base = ALL_DEALS;
  let label = " found";
  if (parts[0] === "category" && parts[1]) { base = ALL_DEALS.filter((d) => d.cat === parts[1]); label = " in this category"; }
  if (parts[0] === "store" && parts[1]) { base = ALL_DEALS.filter((d) => d.store === decodeURIComponent(parts[1])); label = " at this store"; }
  const grid = app.querySelector(".grid");
  const count = app.querySelector(".result-count");
  const empty = app.querySelector(".empty");
  if (grid) {
    grid.outerHTML = resultsHtml(filters, base);
    bindWatchButtons(app);
  } else if (empty) {
    empty.outerHTML = resultsHtml(filters, base);
    bindWatchButtons(app);
  }
  if (count) count.textContent = applyFilters(base, filters).length + " deal" + (applyFilters(base, filters).length === 1 ? "" : "s") + label;
}
