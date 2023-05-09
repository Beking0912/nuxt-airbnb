export default function (content, inject) {
  const appId = "mykey";
  const apiKey = "mykey";

  inject("dataApi", {
    getHome,
  });
  async function getHome(homeId) {
    const response = await fetch(
      `https://${appId}.mockapi.io/api/v1/homes/${homeId}`,
      {
        headers: {
          "X-Algolia-API-Key": apiKey,
          "X-Algolia-Application-Id": appId,
        },
      }
    );
    const json = await response.json();
    return json;
  }
}
