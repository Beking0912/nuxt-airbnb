import { getErrorResponse, unWrap } from "~/utils/fetchUtils";

export default function ({ $config }, inject) {
  const appId = $config.algolia.appId;
  const apiKey = $config.algolia.apiKey;
  const headers = {
    "X-Algolia-API-Key": appId,
    "X-Algolia-Application-Id": apiKey,
  };

  inject("dataApi", {
    getHome,
    getReviewByHomeId,
    getUserByHomeId,
    getHomeByLocation
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
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomeByLocation(lat, lang, radiusInMeters = 1500 * 15) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/users/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              aroundLatLng: `${lat}, ${lang}`,  
              aroundRadius: radiusInMeters, 
              hitsPerPage : 10,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
