import type * as wit from "../generated/types/wit.d.ts";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function renderLiquid(template: string, vars: JsonValue): string {
  // Simple Liquid-like template rendering
  // Replace {{variable}} with values from vars object
  let result = template;
  
  if (typeof vars === 'object' && vars !== null && !Array.isArray(vars)) {
    for (const [key, value] of Object.entries(vars)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      result = result.replace(regex, String(value));
    }
  }
  
  return result;
}

function formatEndpointResultImpl(
  headers: string,
  body: string | undefined,
  bodyParameters: string,
  statusCode: number
): wit.formatEndpointResult.Output {
  // Parse headers JSON string to get array of header objects
  let headerObjects: Array<{ key: string; value: string }> = [];
  try {
    const parsed = JSON.parse(headers);
    headerObjects = Array.isArray(parsed) ? parsed : [];
  } catch {
    headerObjects = [];
  }

  // Format headers: convert from [{key, value}] to [[key, value]]
  const formattedHeaders: string[] = headerObjects.map(
    (h) => `${h.key}: ${h.value}`
  );

  // Parse body parameters
  let bodyParams = {};
  try { bodyParams = JSON.parse(bodyParameters); } catch {}

  let bodyString = body ? renderLiquid(body, bodyParams) : '';

  try {
    JSON.parse(bodyString);
  } catch {
    bodyString = JSON.stringify(bodyString);
  }

  const output = {
    headers: formattedHeaders,
    body: bodyString,
    statusCode,
  };

  return output;
}

export const formatEndpointResult = {
  formatEndpointResult: formatEndpointResultImpl,
};

