import { WithId } from "mongodb";
import { getCollection } from "./db";

export interface Visit {
  slug: string;
  url: string;
  userAgent: string;
  createdAt: number;
}

export interface VisitStats {
  count: number;
  lastVisitedAt: number | null;
}

export type TrackedVisit = WithId<Visit>;

export interface VisitStore {
  track(visit: Visit): Promise<void>;
  stats(slug: string): Promise<VisitStats>;
}

export async function connectVisitStore(): Promise<VisitStore> {
  const collection = await getCollection<TrackedVisit>("visits");
  await collection.createIndex("slug");
  await collection.createIndex({ createdAt: -1 });

  return {
    async track(visit: Visit) {
      await collection.insertOne(visit, { w: 0 });
    },
    async stats(slug: string) {
      const cursor = collection.find({ slug }, { sort: { createdAt: -1 } });

      const hasVisits = await cursor.hasNext();

      if (!hasVisits) {
        return { count: 0, lastVisitedAt: null };
      }

      const lastVisit = await cursor.next();
      const count = await cursor.count();

      return { count, lastVisitedAt: lastVisit.createdAt };
    },
  };
}
