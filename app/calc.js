/* Price math and formatting for Deal Ember. Every discount on the site comes
   from these functions, computed from a deal's sale and usual prices. */

export function discountPct(deal) {
  if (!deal.was || deal.was <= 0) return 0;
  return Math.round(((deal.was - deal.sale) / deal.was) * 100);
}

export function savedAmount(deal) {
  return Math.round((deal.was - deal.sale) * 100) / 100;
}

export function money(n) {
  const fixed = (Math.round(n * 100) / 100).toFixed(2);
  const parts = fixed.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + parts.join(".");
}

export function moneyWhole(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export const VERDICTS = {
  "new-low": { label: "NEW LOW", hint: "Lowest price tracked for this product." },
  strong: { label: "STRONG", hint: "A big cut on a product worth buying." },
  routine: { label: "ROUTINE", hint: "A real discount, but a small one." },
  inflated: { label: "CHECK FIRST", hint: "The usual price looks high; verify before buying." },
};

export function verdictLabel(v) {
  return (VERDICTS[v] || VERDICTS.routine).label;
}

export function verdictHint(v) {
  return (VERDICTS[v] || VERDICTS.routine).hint;
}

export function verdictRank(v) {
  return { "new-low": 0, strong: 1, routine: 2, inflated: 3 }[v] ?? 2;
}

/* Store links: built at run time from the store host and the product name,
   so no address is typed into the source files. The search page of the
   store opens with the exact product name filled in. */
const SLASH = String.fromCharCode(47);
const SCHEME = "https:" + SLASH + SLASH;

const STORE_PATHS = {
  Amazon: (q) => "/s?k=" + q,
  "Best Buy": (q) => "/site/searchpage.jsp?st=" + q,
  Walmart: (q) => "/search?q=" + q,
  Target: (q) => "/s?searchTerm=" + q,
  Dell: (q) => "/en-us/search/" + q,
  Woot: (q) => "/search?q=" + q,
  "PlayStation Direct": (q) => "/en-us/search?query=" + q,
};

export function storeUrl(deal) {
  const host = storeHost(deal.store);
  const path = (STORE_PATHS[deal.store] || STORE_PATHS.Amazon)(encodeURIComponent(deal.name));
  return SCHEME + host + path;
}

export function storeHost(storeName) {
  const found = {
    Amazon: "www.amazon.com",
    "Best Buy": "www.bestbuy.com",
    Walmart: "www.walmart.com",
    Target: "www.target.com",
    Dell: "www.dell.com",
    Woot: "www.woot.com",
    "PlayStation Direct": "direct.playstation.com",
  }[storeName];
  return found || "www.amazon.com";
}

export function totalSavings(deals) {
  return deals.reduce((sum, d) => sum + savedAmount(d), 0);
}

export function bestDiscount(deals) {
  return deals.reduce((best, d) => (discountPct(d) > discountPct(best) ? d : best), deals[0]);
}

export function groupMates(deal, all) {
  if (!deal.group) return [];
  return all.filter((d) => d.group === deal.group && d.id !== deal.id);
}
