import { Collection, ObjectID, WithId } from "mongodb";
import { getCollection } from "./db";

export interface LinkSubmission {
  url: string;
  slug: string;
}

export type SubmittedLink = WithId<LinkSubmission>;

export interface LinkStore {
  find(slug: string): Promise<SubmittedLink | null>;
  create(submission: LinkSubmission): Promise<SubmittedLink>;
  delete(id: string): Promise<boolean>;
}

export async function connectLinkStore(): Promise<LinkStore> {
  const collection = await getCollection<SubmittedLink>("links");
  await collection.createIndex("slug", { unique: true });

  return {
    async find(slug: string): Promise<SubmittedLink | null> {
      return (await collection.findOne({ slug })) as SubmittedLink;
    },
    async create(submission: LinkSubmission): Promise<SubmittedLink> {
      const { insertedId } = await collection.insertOne(submission);

      return { ...submission, _id: insertedId };
    },
    async delete(id: string): Promise<boolean> {
      const res = await collection.deleteOne({ _id: new ObjectID(id) });

      return res && res.deletedCount === 1;
    },
  };
}
