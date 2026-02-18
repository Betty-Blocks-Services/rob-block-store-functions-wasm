# Delay

Wasm component that blocks execution for a specified number of milliseconds.

This is the TypeScript/Wasm equivalent of the JavaScript delay function from
[`Betty-Blocks-Services/delay-function`](https://github.com/Betty-Blocks-Services/delay-function).

## Prerequirements
- bun (`https://bun.com/docs/installation`)

## Building

Building can be done via:

```sh
. build.sh
```

This will:
- install dependencies with `bun install`
- typecheck the TypeScript code
- bundle to `dist/index.js`
- generate WIT-based TypeScript types
- componentize to `delay.wasm`

