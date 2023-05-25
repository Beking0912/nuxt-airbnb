import { getHeaders, sendJSON } from "../helpers";
import { unWrap, getErrorResponse } from "../../utils/fetchUtils";

export default defineEventHandler(async (event) => {
    const req = event.req;
    const res = event.res;
    const config = useRuntimeConfig();
    const userData = await getById(req.identity.id, config);

    if (userData.status == 200) {
        sendJSON(userData.json, res);
        return;
    }
    const payload = makeUserPayload(req.identity);
    await create(req.identity.id, payload, config);
    sendJSON(payload, res);
});

async function getById(id, config) {
    try {
        return unWrap(
            await fetch(
                `https://${config.algolia.appId}-dsn.algolia.net/1/indexes/users/${id}`,
                {
                    headers: getHeaders(config.algolia),
                }
            )
        );
    } catch (error) {
        return getErrorResponse(error);
    }
}

function makeUserPayload(identity) {
    return {
        name: identity.name,
        email: identity.email,
        image: identity.image,
        homeId: [],
        reviewCount: 0,
        description: "",
        joined: new Date().toISOString(),
    };
}

async function create(id, payload, config) {
    try {
        return unWrap(
            await fetch(
                `https://${config.algolia.appId}-dsn.algolia.net/1/indexes/users/${id}`,
                {
                    headers: getHeaders(config.algolia),
                    method: "PUT",
                    body: JSON.stringify(payload),
                }
            )
        );
    } catch (error) {
        return getErrorResponse(error);
    }
}