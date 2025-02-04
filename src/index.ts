import cors from 'cors';
import express from 'express';
import handleHealth from './handler/health';
import { handleSubmissionMetaEvent, handleWebsiteAccessMetaEvent } from './handler/meta-event-handler';
import handleSoumission from './handler/soumission';

const api = express();
api.use(express.json());
api.use(cors());
const port = 8080;

api.get("/health", handleHealth);

api.post("/soumission", (req, res) => {
  handleSoumission(req, res)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400))
});

api.post("/meta-event/visit", handleWebsiteAccessMetaEvent);

api.post("/meta-event/submission", (req, res) => {
  handleSubmissionMetaEvent(req, res)
    .then(() => res.sendStatus(200))
    .catch((e) => res.send(e))
});

api.listen(process.env.PORT || port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
