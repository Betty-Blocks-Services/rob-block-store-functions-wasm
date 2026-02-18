/**
 * Busy-waiting delay implementation.
 *
 * This mirrors the behavior of the original JavaScript delay function
 * (`https://github.com/Betty-Blocks-Services/delay-function`) by
 * blocking for roughly the requested duration.
 *
 * In a Wasm component you typically cannot rely on `setTimeout`, so we
 * use a synchronous loop based on `Date.now()` instead.
 */
function delayImpl(milliseconds: number) {
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) {
    return;
  }

  // Clamp to a safe unsigned 32-bit range.
  const ms = Math.min(Math.floor(milliseconds), 0xffffffff);

  const start = Date.now();
  // Busy-loop until the elapsed time reaches the requested delay.
  // This blocks the current worker/thread, which is acceptable for
  // short delays in this simple example.
  while (Date.now() - start < ms) {
    // no-op
  }

  return;
}

export const delay = {
  delayImpl,
};
