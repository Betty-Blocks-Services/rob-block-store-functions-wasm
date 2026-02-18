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
declare function delayImpl(milliseconds: number): void;
export declare const delay: {
    delayImpl: typeof delayImpl;
};
export {};
