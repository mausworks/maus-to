import { NowRequest, NowResponse } from "@vercel/node";

import { LinkStore, connectLinkStore, SubmittedLink } from "../lib/store";
import { validateSubmission } from "../lib/validation";

let store: LinkStore | null = null;

export default function (req: NowRequest, res: NowResponse) {
  const contentType = req.headers["content-type"];

  if (!contentType || contentType.indexOf("application/json") !== 0) {
    res.status(400);
    res.send(null);
  } else if (req.method === "POST") {
    createSubmission(req)
      .then(res.send)
      .catch((error) => sendError(res, error));
  } else {
    res.status(405);
    res.send(null);
  }
}

async function createSubmission(req: NowRequest): Promise<SubmittedLink> {
  store = store || (await connectLinkStore());

  const submission = validateSubmission(req.body);
  const existing = await store.find(submission.slug);

  if (existing) {
    throw new Error(`The slug '${submission.slug}' is in use`);
  } else {
    return await store.create(submission);
  }
}

function sendError(res: NowResponse, error: any) {
  if (!error) {
    res.status(500);
    res.send({ error: "Undefined error" });
  } else if ("errors" in error) {
    res.status(400);
    res.send({ error: "Validation error", errors: error.errors });
  } else if ("message" in error) {
    res.status(500);
    res.send({ error: error.message });
  }
}
