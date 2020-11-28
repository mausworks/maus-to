import { NowRequest, NowResponse } from "@vercel/node";
import { connectVisitStore, VisitStore } from "./lib/visits";

let store: VisitStore | null = null;

export default function (req: NowRequest, res: NowResponse) {
  let slug = req.query["slug"];

  if (slug instanceof Array) {
    slug = slug[0];
  }

  getStats(slug).then(res.send);
}

async function getStats(slug: string) {
  store = store || (await connectVisitStore());

  return await store.stats(slug);
}
