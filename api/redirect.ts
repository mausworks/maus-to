import { NowRequest, NowResponse } from "@vercel/node";
import { connectLinkStore, LinkStore, SubmittedLink } from "./lib/store";

let store: LinkStore | null = null;

export default function (req: NowRequest, res: NowResponse) {
  let slug = req.query["slug"];

  if (slug instanceof Array) {
    slug = slug[0];
  }

  findLink(slug)
    .then((link) => {
      if (link && link.url) {
        res.redirect(302, link.url);
      } else {
        res.redirect(302, "https://maus.to");
      }
    })
    .catch(() => res.redirect(302, "https://maus.to"));
}

async function findLink(slug: string): Promise<SubmittedLink> {
  store = store || (await connectLinkStore());

  return await store.find(slug);
}
