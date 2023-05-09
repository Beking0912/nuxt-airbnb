export default function (content, inject) {
  const appId = "mykey";
  const apiKey = "mykey";
  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appId,
  };

  inject("dataApi", {
    getHome,
  });

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(`https://${appId}.mockapi.io/api/v1/homes/${homeId}`, {
          headers,
        })
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
