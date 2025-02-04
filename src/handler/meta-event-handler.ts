import { randomUUID, createHash } from "node:crypto";
import { getMetaEventsUrl, MetaEventData } from "../env/meta";
import { SubmissionRequest } from "./soumission";

export const handleWebsiteAccessMetaEvent = (req, res) => {
    console.log("API Received META EVENT with req.body: ", req.body);
    const eventData: MetaEventData = buildBaseEventData(req);
    console.log("Sending META EVENT request with data: ", eventData);
    fetch(getMetaEventsUrl(), {
        method: "POST",
        body: JSON.stringify({
            data: [eventData]
        }),
        headers: {
            'content-type': 'application/json',
        }
    })
        .then((response) => console.log("Successfully submitted website-access event to meta: ", response.status))
        .catch((error) => console.log("Error submitting website-access event to meta: ", error))
    res
        .set("Access-Control-Allow-Origin", "*")
        .sendStatus(200);
}

export const handleSubmissionMetaEvent = async (req, _res): Promise<void> => {
    console.log("Received submission meta event request with payload", req.body);
    const submission: SubmissionRequest = req.body.payload;
    const eventData: MetaEventData = buildBaseEventData(req, "Formulaire demande soumission");
    console.log("Built base event data: ", eventData);
    eventData.user_data.em = hash(sanitize(submission.email))
    console.log("After hash and sanitize email:", eventData);
    eventData.user_data.ph = hash(sanitize(submission.phone))
    eventData.user_data.fn = hash(sanitize(submission.firstName))
    eventData.user_data.ln = hash(sanitize(submission.lastName))
    eventData.user_data.st = hash("qc")
    eventData.user_data.country = hash("ca")
    if (submission.city) eventData.user_data.ct = hash(sanitize(submission.city))
    if (submission.postalCode) eventData.user_data.zp = hash(sanitize(submission.postalCode))


    console.log("Sending META EVENT request with data: ", eventData);
    return fetch(getMetaEventsUrl(), {
        method: "POST",
        body: JSON.stringify({
            data: [eventData]
        }),
        headers: {
            'content-type': 'application/json',
        }
    })
        .then((response) => console.log("Successfully submitted demande-soumission event to meta: ", response.status))
        .catch((error) =>  {
            console.log("Error submitting demande-soumission event to meta: ", error)
            return error;
        })
}

const buildBaseEventData = (req, eventName?): MetaEventData => {
    return {
        event_name: eventName ?? req.body?.event_name,
        event_time: Math.floor(new Date().getTime()/1000),
        event_id: randomUUID(),
        event_source_url: req.headers.origin,
        action_source: "website",
        user_data: {
            client_ip_address: (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim(),
            client_user_agent: req.headers['user-agent'] || req.get("user-agent")
        }
    }
}

const sanitize = (input: string) =>
    input.toLowerCase().replaceAll(" ", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll("+", "");

const hash = (input: string) => createHash('sha256').update(input).digest('hex');
