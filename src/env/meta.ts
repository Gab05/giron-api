// Server event parameters documentation: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event

const metaBaseUrl = "https://graph.facebook.com"
const metaGraphApiVersion = "v21.0";
const metaPixelID = "658587546508783";
const metaToken = "EAASjKbCFxRIBO9QHZBRe1TgVPihzPJbMr4S3Fy2HpiC0TCBsmDzm7rPtp4zXMqL4Y7CKwZAgdZAW80VtMo7OAkhE2tJeogiH5BxGrC1ZCaYgKKlkyPX5oxO2thf0LHe4EE6SwrhPVMnlwJHwer0DfJsznuvaZBSRjYP9BN90Y9jugzpg0duZAF5aWp4F0PNZBqejAZDZD";

export const getMetaEventsUrl = () =>
    `${metaBaseUrl}/${metaGraphApiVersion}/${metaPixelID}/events?access_token=${metaToken}`;

export interface MetaEventData {
    event_name: string;
    event_time: number;
    event_id: string;
    user_data: MetaEventDataUserData;
    action_source: MetaEventDataActionSource;
    event_source_url?: string;
    opt_out?: boolean;
    custom_data?: Map<string, any>;
}

type MetaEventDataActionSource = "email" | "website" | "app" | "phone_call" | "chat" | "physical_store" | "system_generated" | "business_messaging" | "other";

interface MetaEventDataUserData {
    em?: string | string[]; // Email, lowercase, SHA256 hashing required
    ph?: string | string[]; // Phone, normalized, SHA256 hashing required
    fn?: string | string[]; // FirstName, lowercase, UTF-8, SHA256 hashing required
    ln?: string | string[]; // LastName, lowercase, UTF-8, SHA256 hashing required
    db?: string | string[]; // Date of Birth, YYYYMMDD format, SHA256 hashing required
    ct?: string | string[]; // City, lowercase, UTF-8, No space, SHA256 hashing required
    st?: string | string[]; // State, 2-character ANSI abbreviation code, lowercase, SHA256 hashing required
    zp?: string | string[]; // Zip Code, lowercase, no space or dash, SHA256 hashing required
    country?: string | string[]; // Country, lowercase, 2-letter country codes ISO 3166-1 alpha-2, SHA256 hashing required
    client_ip_address?: string; // IPV4 or IPV6 Address, no hashing
    client_user_agent?: string; // User Agent or browser full info, no hashing     
}