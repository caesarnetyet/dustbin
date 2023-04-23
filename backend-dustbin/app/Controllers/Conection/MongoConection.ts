import { MongoClient } from "mongodb";
import Env from '@ioc:Adonis/Core/Env'

const uri = Env.get('MONGO_URI');
const client = new MongoClient(uri);
import Ws from "App/Services/Ws";

export async function runMongo() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("test");
    const collection = db.collection("sensors");
    const changeStream = collection.watch();

    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const document = [change.fullDocument];
        console.log(document);
        Ws.io.emit(document[0].tipo, document[0]);
      }
    }
    );
  }
  catch (err) {
    console.log("Error al conectar con la base de datos");
  }
}
