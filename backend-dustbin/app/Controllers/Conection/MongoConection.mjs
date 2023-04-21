import { MongoClient } from "mongodb";
const uri = "mongodb+srv://admin:admin@cluster0.urq1yx8.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("Prueba");
    const collection = db.collection("sensors");

    const changeStream = collection.watch();
    changeStream.on("change", (change) => {
      console.log(change);
    }
    );
  }
  catch (err) {
    console.log("Error al conectar con la base de datos");
  }
}

run()
