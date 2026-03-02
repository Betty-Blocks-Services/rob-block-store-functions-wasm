# Wasm Component Development Guide

This repository contains custom WebAssembly (Wasm) components built for the Betty Blocks platform. It serves as both a collection of functional steps and a documentation hub for the development workflow, WIT configurations, and troubleshooting.

---

## 🚀 Getting Started

### 1. Prerequisites & Installation
Ensure your local environment is configured by running the following in your terminal:

**Homebrew:**
```bash 
/bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"
```
**Rust:** 
```bash
curl --proto '=https' --tlsv1.2 -sSf [https://sh.rustup.rs](https://sh.rustup.rs) | sh
# Proceed with standard installation (press Enter), then restart your terminal.
```
**Wasm Tools (wkg):** 
```bash
cargo install wkg
rustup target add wasm32-wasip2
```
**JCO (JavaScript Componentizer):** 
```bash
bun add -g @bytecodealliance/jco
```

### 2. Development Workflow (for TypeScript)
1.  **Clone the examples in this repo:** `git clone https://github.com//Betty-Blocks-Services/rob-block-store-functions-wasm.git`
2.  **Define Contract:** Edit the `.wit` file to define inputs/outputs.
3.  **Generate Code:** Use your function prompt to generate the logic in `index.ts`.
4.  **Register:** Add the new function to the `Justfile` in the root folder.
5.  **Build:**
```bash
just build
```

---

## 🛠 WIT Configuration (WebAssembly Interface Type)

The `.wit` file defines the contract between your code and the Betty Blocks platform.

### Requirements & Logic
* **Required vs. Optional:** * `name: string` is **Required**.
    * `name: option<string>` is **Optional**.
* **Escape Characters:** The `%` symbol (e.g., `%result: json-string`) is an escape character used to avoid conflicts with reserved keywords. It does not affect the data type in the UI.
* **Naming:** Interface names must use **kebab-case** (e.g., `delay-impl`). This name must match the export constant name in your function code.
* **Void Returns:** If you don't want to return anything, use:
    ```wit
    <function-name>: func(<input-name>: <input-type>) -> result;
    ```
    *In your code, simply use `return;`.*

---

## ⚠️ Troubleshooting & Known Bugs

### Common Error Messages
| Error | Cause | Solution |
| :--- | :--- | :--- |
| `no function clause matching in WitParser...` | Output type is not yet supported. | Verify types against [Betty Blocks WIT types](https://bettyblocks.atlassian.net/wiki/spaces/bl/pages/5034409988/Betty+Blocks+WIT+types). |
| `expected table index 0, found 0` | Node.js version is too old (e.g., v16). | Upgrade to Node v23: `nvm install 23` then `nvm use 23`. |
| `Cannot find module '@rspack/binding-darwin-x64'` | Architecture mismatch on M1/M2 Mac. | Run `node -p "process.arch"`. If it says `x64`, run `nvm install 23 --arch=arm64`. |
| `index.js does not export a "format" interface` | Export name mismatch. | Ensure the `export const` in your code matches the WIT interface name. |
| `Error from wasmcloud` | Often caused by using an unsupported input/output type. | Use `u32` or `string` instead of `u64`; `u64` is currently unsupported. |

### Technical Limitations & Bugs
* **Nested Lists:** Using `list<list<string>>` will cause the Actions Compiler to crash.
* **Special Characters:** Unescaped special characters in Wasm block names will crash the compiler.
* **Versioning:** Multiple versions of the same Wasm component in one app can cause internal API errors.
* **Timeouts:** If a component fails on WasmCloud, it may throw a 500 error after 55 seconds and remain in a broken state.

---

## 🔄 Updating Components
To update an existing component:
1.  Up the version number in the `.wit` file (e.g., `package betty-blocks:name@0.1.1`).
2.  Rebuild and upload.
3.  The platform will update the component in the side panel. 
*Note: The UI currently does not show the version number or "Update Available" badges.*

---

## 🏗 Project Status

* ✅ **Delay:** Fully functional.
* 🚧 **Format Endpoint Result:** Partially implemented (requires `list<list<string>>` support for headers in output).
* 🛑 **Loop Times:** Blocked (wrapper functions with yielded values not supported yet).

## 🔗 Resources
* [Custom Wasm Components Repo](https://github.com/Betty-Blocks-Services/rob-block-store-functions-wasm)
* [Native Wasm Components](https://github.com/bettyblocks/native-wasm-components/tree/main)
* [Block Store Wasm Components](https://github.com/bettyblocks/block-store-wasm-components/tree/main/functions)

---

## 🤝 Contributing
1.  Follow the **Development Workflow** to create your component.
2.  Ensure all parameters are correctly typed in the `wit/` folder.
3.  Update the `Justfile` before submitting a PR.
