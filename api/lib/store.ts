import mongodb, { WithId } from "mongodb";
import { LinkSubmission } from "./link";

export type SubmittedLink = WithId<LinkSubmission>;

export interface LinkStore {
  find(slug: string): Promise<SubmittedLink | null>;
  create(submission: LinkSubmission): Promise<SubmittedLink>;
}

export async function connectLinkStore(): Promise<LinkStore> {
  const mongoURL = process.env.MONGO_URL;
  const dbName = process.env.DB_NAME || "maus_to_dev";

  const client = await mongodb.connect(mongoURL);
  const collection = client.db(dbName).collection("links");

  return {
    async find(slug: string): Promise<SubmittedLink | null> {
      return (await collection.findOne({ slug })) as SubmittedLink;
    },
    async create(submission: LinkSubmission): Promise<SubmittedLink> {
      const { insertedId } = await collection.insertOne(submission);

      return { ...submission, _id: insertedId };
    },
  };
}
