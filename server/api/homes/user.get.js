import { getHeaders, sendJSON } from "../../helpers";
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const req = event.req;
    const res = event.res;
    try {
        const payload = await unWrap(
            await fetch(
                `https://${config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`,
                {
                    headers: getHeaders(config.algolia),
                    method: "POST",
                    body: JSON.stringify({
                        filters: `userId:${req.identity.id}`,
                        attributesToRetrieve: ["objectID", "title"],
                        attributesToHighlight: [],
                    }),
                }
            )
        );
        sendJSON(payload.json.hits, res);
    } catch (error) {
        return getErrorResponse(error);
    }
});