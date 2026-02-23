function renderLiquid(template, vars) {
    let result = template;
    if ('object' == typeof vars && null !== vars && !Array.isArray(vars)) for (const [key, value] of Object.entries(vars)){
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        result = result.replace(regex, String(value));
    }
    return result;
}
function formatEndpointResultImpl(headers, body, bodyParameters, statusCode) {
    let headerObjects = [];
    try {
        const parsed = JSON.parse(headers);
        headerObjects = Array.isArray(parsed) ? parsed : [];
    } catch  {
        headerObjects = [];
    }
    const formattedHeaders = headerObjects.map((h)=>`${h.key}: ${h.value}`);
    let bodyParams = {};
    try {
        bodyParams = JSON.parse(bodyParameters);
    } catch  {}
    let bodyString = body ? renderLiquid(body, bodyParams) : '';
    try {
        JSON.parse(bodyString);
    } catch  {
        bodyString = JSON.stringify(bodyString);
    }
    const output = {
        headers: formattedHeaders,
        body: bodyString,
        statusCode
    };
    return output;
}
const formatEndpointResult = {
    formatEndpointResult: formatEndpointResultImpl
};
export { formatEndpointResult };
