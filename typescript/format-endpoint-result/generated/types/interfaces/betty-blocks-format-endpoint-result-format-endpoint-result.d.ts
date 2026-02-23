/** @module Interface betty-blocks:format-endpoint-result/format-endpoint-result@0.1.0 **/
export function formatEndpointResult(headers: JsonString, body: string | undefined, bodyParameters: JsonString, statusCode: number): Output;
export type JsonString = string;
export interface Output {
  headers: Array<string>,
  body: string,
  statusCode: number,
}
