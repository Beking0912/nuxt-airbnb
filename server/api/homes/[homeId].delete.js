import { getErrorResponse } from "../../../utils/fetchUtils";
import { getHeaders, sendJSON } from "../../helpers";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const req = event.req;
    const res = event.res;
    const homeId = event.context.params.homeId;

    try {
        await fetch(
            `https://${config.algolia.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
            {
                headers: getHeaders(config.algolia),
                method: "DELETE",
            }
        );

        await fetch(
            `https://${config.algolia.appId}-dsn.algolia.net/1/indexes/users/${req.identity.id}/partial`,
            {
                headers: getHeaders(config.algolia),
                method: "POST",
                body: JSON.stringify({
                    homeId: {
                        _operation: "Remove",
                        value: homeId,
                    },
                }),
            }
        );
    } catch (error) {
        return getErrorResponse(error);
    }

    sendJSON({}, res);
});