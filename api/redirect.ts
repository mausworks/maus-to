import { NowRequest, NowResponse } from "@vercel/node";
import {
  connectLinkStore,
  LinkStore,
  LinkSubmission,
  SubmittedLink,
} from "./lib/links";
import { connectVisitStore, VisitStore } from "./lib/visits";

let linkStore: LinkStore | null = null;
let visitStore: VisitStore | null = null;

export default function (req: NowRequest, res: NowResponse) {
  let slug = req.query["slug"];

  if (slug instanceof Array) {
    slug = slug[0];
  }

  findLink(slug)
    .then((link) => {
      if (link && link.url) {
        trackVisit(link, req);

        res.redirect(302, link.url);
      } else {
        res.redirect(302, "https://maus.to");
      }
    })
    .catch(() => res.redirect(302, "https://maus.to"));
}

async function findLink(slug: string): Promise<SubmittedLink> {
  linkStore = linkStore || (await connectLinkStore());

  return await linkStore.find(slug);
}

async function trackVisit(link: LinkSubmission, req: NowRequest) {
  visitStore = visitStore || (await connectVisitStore());

  await visitStore.track({
    slug: link.slug,
    url: link.url,
    userAgent: req.headers["user-agent"] || "User-agent not found",
    createdAt: Date.now(),
  });
}
