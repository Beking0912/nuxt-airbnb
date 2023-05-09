export default function (content, inject) {
  const appId = "mykey";
  const apiKey = "mykey";
  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appId,
  };

  inject("dataApi", {
    getHome,
    getReviewByHomeId,
  });

  async function getHome(homeId) {
    try {
      return await fetch(
        `https://${appId}-dsn.algolia.net/indexes/homes/${homeId}`,
        {
          headers,
        }
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function unWrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return { json, ok, status, statusText };
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    };
  }
}
