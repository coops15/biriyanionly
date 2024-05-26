// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"
 
// if (!process.env.MONGO_URL) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }
 
const uri = 'mongodb+srv://worldhidden0:YTXiSj10tujc2Hth@biriyani.dkpyyzg.mongodb.net/biriyani_users'
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client
let clientPromise
 
if (process.env.NODE_ENV === "development") {
  
  global.globalWithMongo = global.globalWithMongo || {};
  
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}
 
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise