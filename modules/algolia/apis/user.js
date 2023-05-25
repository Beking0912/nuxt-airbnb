import { getErrorResponse, unWrap } from "../../../utils/fetchUtils";
import { getHeaders } from "../../helpers";
import fetch from 'node-fetch';

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig)
  return {
    removeHome: async function (identity, homeId) {
      const payload = (await this.getById(identity)).json
      const homes = payload.homeId.filter(id => id !== homeId)
      payload.homeId = homes
      this.create(identity, payload)
    },
    assignHome: async function (identity, payload) {
      const payload = (await this.getById(identity)).json
      payload.homeId.push(homeId)
      this.create(identity, payload)
    },
    create: async (identity, payload) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`,
            {
              headers,
              method: "PUT",
              body: JSON.stringify(payload),
            }
          )
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
    bookHome: async (identityId, homeId, start, end) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/bookings/`,
            {
              headers,
              method: "POST",
              body: JSON.stringify({
                identityId,
                homeId,
                start,
                end,
              }),
            }
          )
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    },
    getById: async (identity) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`,
            {
              headers,
            }
          )
        );
      } catch (error) {
        return getErrorResponse(error);
      }
    }
  }
}