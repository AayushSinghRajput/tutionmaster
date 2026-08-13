// Escapes regex metacharacters so user-supplied search text is treated as a
// literal substring instead of a regex pattern. Without this, query params
// like `subject`, `q`, or `city` are fed straight into `new RegExp()`, which
// lets a client submit a catastrophic-backtracking pattern (e.g. `(a+)+$`)
// and hang the event loop / DB regex engine — a ReDoS DoS vector on public,
// unauthenticated endpoints.
function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = escapeRegex;
