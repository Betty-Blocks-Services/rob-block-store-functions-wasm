/** @module Interface betty-blocks:format-endpoint-result/format@0.1.0 **/
export function formatEndpointResult(input: Input): string;
export type JsonString = string;
export interface Input {
  statusCode: number,
  body?: string,
  bodyParameters: JsonString,
  headers: JsonString,
}
