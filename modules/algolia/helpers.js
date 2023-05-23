export function getHeaders(algoliaConfig) {
    return {
        "X-Algolia-Application-Id": algoliaConfig.applicationId,
        "X-Algolia-API-Key": algoliaConfig.apiKey,
    };
}

export function sendJSON(data, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}   