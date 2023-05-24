import { rejectHitBadRequest, hasBadBody, sendJSON } from "../helpers"
import { v4 as uuidv4 } from 'uuid';

export default (apis) => {
    return async (req, res) => {
        if (req.method === 'POST') {
            if (hasBadBody(req)) {
                return rejectHitBadRequest(res)
            }
            await createHome(req.identity, req.body, res)
            return
        }
        rejectHitBadRequest(res)
    }

    async function createHome(identity, body, res) {
        const homeId = uuidv4();
        const payload = {
            ...body,
            reviewValue: 0,
            reviewsCount: 0,
            userId: identity.id,
        }
        const resp = await apis.home.create(homeId, payload);
        if (!resp.ok) {
            res.statusCode = 500;
            res.end();
            return
        }
        await apis.user.assignHome(identity, homeId)
        sendJSON({}, res)
    }
}