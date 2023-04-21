import { MongoClient } from "mongodb";
const uri = "mongodb+srv://admin:admin@cluster0.urq1yx8.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
import Ws from "App/Services/Ws";

export async function runMongo() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("Prueba");
    const collection = db.collection("sensors");
    const changeStream = collection.watch();

    changeStream.on("change", (change) => {
      if(change.operationType === "insert"){
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
