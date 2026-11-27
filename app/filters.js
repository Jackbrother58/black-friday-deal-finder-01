/* Search, filter and sort for the deal list. Pure functions over the deal
   array, so every view shares the same behaviour. */
import { discountPct, savedAmount, verdictRank } from "./calc.js";

export function defaultFilters() {
  return { q: "", cat: "all", store: "all", minPct: 0, sort: "pct" };
}

export function applyFilters(deals, f) {
  const needle = (f.q || "").trim().toLowerCase();
  let out = deals.filter((d) => {
    if (f.cat !== "all" && d.cat !== f.cat) return false;
    if (f.store !== "all" && d.store !== f.store) return false;
    if (discountPct(d) < f.minPct) return false;
    if (needle) {
      const hay = (d.name + " " + d.store + " " + d.note + " " + d.source).toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });
  out = sortDeals(out, f.sort);
  return out;
}

export function sortDeals(deals, sort) {
  const copy = [...deals];
  if (sort === "pct") copy.sort((a, b) => discountPct(b) - discountPct(a) || savedAmount(b) - savedAmount(a));
  else if (sort === "save") copy.sort((a, b) => savedAmount(b) - savedAmount(a));
  else if (sort === "verdict") copy.sort((a, b) => verdictRank(a.verdict) - verdictRank(b.verdict) || discountPct(b) - discountPct(a));
  else if (sort === "price") copy.sort((a, b) => a.sale - b.sale);
  else if (sort === "price-desc") copy.sort((a, b) => b.sale - a.sale);
  else if (sort === "name") copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}

export const SORT_OPTIONS = [
  { value: "pct", label: "Biggest discount first" },
  { value: "save", label: "Most dollars saved" },
  { value: "verdict", label: "Best verdict first" },
  { value: "price", label: "Lowest price first" },
  { value: "price-desc", label: "Highest price first" },
  { value: "name", label: "Name A to Z" },
];

export const MIN_PCT_OPTIONS = [
  { value: 0, label: "Any discount" },
  { value: 20, label: "20% off or more" },
  { value: 30, label: "30% off or more" },
  { value: 40, label: "40% off or more" },
  { value: 50, label: "50% off or more" },
];
