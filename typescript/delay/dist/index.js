function delayImpl(milliseconds) {
    if (!Number.isFinite(milliseconds) || milliseconds <= 0) return;
    const ms = Math.min(Math.floor(milliseconds), 0xffffffff);
    const start = Date.now();
    while(Date.now() - start < ms);
}
const delay = {
    delayImpl
};
export { delay };
