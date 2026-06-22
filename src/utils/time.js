/**
 * Calculates a human-readable relative time string from an ISO date string
 * based on the current reference time (2026-06-22T18:47:07+02:00)
 */
export function getRelativeTime(dateString) {
  if (!dateString) return 'Never';
  
  const now = new Date("2026-06-22T18:47:07+02:00");
  const date = new Date(dateString);
  const diffMs = now - date;
  
  // If the date is in the future relative to our clock (can happen during mock edits), return Just now
  if (diffMs < 0) {
    return 'Just now';
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'Just now';
  }
  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  return `${diffDays}d ago`;
}

/**
 * Formats an ISO date to a clean readable date: "MMM DD, YYYY"
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
