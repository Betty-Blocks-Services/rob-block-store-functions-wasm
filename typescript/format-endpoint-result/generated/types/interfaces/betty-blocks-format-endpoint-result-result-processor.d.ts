/** @module Interface betty-blocks:format-endpoint-result/result-processor **/
export function format(input: Input): JsonString;
export type JsonString = string;
export interface Input {
  statusCode: number,
  body?: string,
  bodyParameters: JsonString,
  headers: JsonString,
}
