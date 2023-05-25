import { getErrorResponse } from "../../../utils/fetchUtils";
import { getHeaders } from "../../helpers";

export default defineEventHandler(async (event) => {    
    const config = useRuntimeConfig();
    const res = event.res;
    const body = await readBody(event);
    const meta = body.data.object.metadata;

    try {
        await fetch(
            `https://${config.algolia.appId}-dsn.algolia.net/1/indexes/bookings/`,
            {
                headers: getHeaders(config.algolia),
                method: "POST",
                body: JSON.stringify({
                    identityId: meta.identityId,
                    homeId: meta.homeId,
                    start: meta.start,
                    end: meta.end,
                }),
            }
        );
    } catch (error) {
        return getErrorResponse(error);
    }
    res.end(`${meta.identityId} booked ${meta.homeId}!!!!`);
});