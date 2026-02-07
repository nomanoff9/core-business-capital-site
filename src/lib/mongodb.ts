import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongoClientCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: MongoClientCache | undefined;
}

const cached: MongoClientCache = global._mongoClientPromise || {
  client: null,
  promise: null,
};

if (!global._mongoClientPromise) {
  global._mongoClientPromise = cached;
}

async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cached.client) {
    return { client: cached.client, db: cached.client.db('corebusinesscapital') };
  }

  if (!cached.promise) {
    const options = {};
    cached.promise = MongoClient.connect(MONGODB_URI!, options);
  }

  cached.client = await cached.promise;
  return { client: cached.client, db: cached.client.db('corebusinesscapital') };
}

export default connectToDatabase;
