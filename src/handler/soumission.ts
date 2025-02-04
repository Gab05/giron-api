import { sendSubmissionEmail } from "../service/email-service";

export interface SubmissionRequest {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address?: string;
    postalCode?: string;
    city?: string;
    message: string;
  }

const handleSoumission = async (req, _res) => {
    try {
        console.log("Sending submission email...");
        return sendSubmissionEmail(req.body);
    } catch (e) {
        return Promise.reject();
    }
}

export default handleSoumission;
