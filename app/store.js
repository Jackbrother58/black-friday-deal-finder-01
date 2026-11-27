/* Watchlist and savings-goal state. Kept in memory and in local storage so
   a shopper's picks survive a reload. Nothing leaves the browser. */
const KEY = "deal-ember-watchlist-v1";
const GOAL_KEY = "deal-ember-goal-v1";

function readList() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export const state = {
  watchlist: readList(),
  goal: 500,
};

try {
  const g = Number(window.localStorage.getItem(GOAL_KEY));
  if (Number.isFinite(g) && g >= 50 && g <= 10000) state.goal = g;
} catch {
  /* keep the default goal */
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state.watchlist));
    window.localStorage.setItem(GOAL_KEY, String(state.goal));
  } catch {
    /* storage may be off; the in-memory list still works */
  }
}

export function isWatched(id) {
  return state.watchlist.includes(id);
}

export function toggleWatch(id) {
  const at = state.watchlist.indexOf(id);
  if (at === -1) state.watchlist.push(id);
  else state.watchlist.splice(at, 1);
  persist();
  return state.watchlist.includes(id);
}

export function watchedDeals(all) {
  const ids = new Set(state.watchlist);
  return all.filter((d) => ids.has(d.id));
}

export function setGoal(n) {
  const v = Math.max(50, Math.min(10000, Math.round(n) || 500));
  state.goal = v;
  persist();
  return v;
}

export function clearWatchlist() {
  state.watchlist = [];
  persist();
}
