
build:
  @just build-typescript


build-typescript:
  cd typescript/format-endpoint-result && . ./build.sh
  cp typescript/format-endpoint-result/format_endpoint_result.wasm dist/typescript_format_endpoint_result.wasm