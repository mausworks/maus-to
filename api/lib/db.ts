import mongodb, { Collection, Db, MongoClient } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

async function getDb() {
  if (db !== null) {
    return db;
  }

  const mongoURL = process.env.MONGO_URL;
  const dbName = process.env.DB_NAME || "maus_to_dev";

  client = await mongodb.connect(mongoURL);
  db = client.db(dbName);

  return db;
}

export async function getCollection<T>(name: string): Promise<Collection<T>> {
  const db = await getDb();

  return db.collection(name);
}
