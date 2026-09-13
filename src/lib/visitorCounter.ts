/**
 * Lightweight Live Visitor Counter Service for Dhruv Singh's portfolio
 * Uses counterapi.dev with session-level deduplication combined with GA baseline count.
 */

const COUNTER_API_BASE = 'https://api.counterapi.dev/v1/dhruvsingh-portfolio/visits';
const SESSION_KEY = 'dhruvsingh_session_counted';
const BASELINE_OFFSET = 130; // GA historical baseline offset
const FALLBACK_TOTAL = 137; // Total visitors fallback

export async function fetchVisitorCount(): Promise<number> {
  try {
    const hasCountedInSession =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(SESSION_KEY) === 'true';

    const url = hasCountedInSession ? COUNTER_API_BASE : `${COUNTER_API_BASE}/up`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Counter API returned status ${response.status}`);
    }

    const data = await response.json();
    const liveHits = data?.count ?? data?.value;

    if (typeof liveHits === 'number' && !isNaN(liveHits)) {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, 'true');
      }
      return BASELINE_OFFSET + liveHits;
    }

    return FALLBACK_TOTAL;
  } catch (err) {
    console.debug('Visitor Counter Notice (Using Fallback Baseline):', err);
    return FALLBACK_TOTAL;
  }
}
