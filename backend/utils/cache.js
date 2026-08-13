// Minimal in-process TTL cache. The app runs as a single instance (see
// render.yaml), so an in-memory Map is sufficient — no need for Redis until
// there's more than one instance to keep in sync.
const store = new Map();

function get(key) {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

function set(key, value, ttlMs) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

function clear(key) {
  if (key) {
    store.delete(key);
  } else {
    store.clear();
  }
}

module.exports = { get, set, clear };
