import { MongoClient } from "mongodb";

const URI = process.env.DB_URI; // Obtiene la URI de conexión desde las variables de entorno
if (!URI) {
  throw new Error("La variable de entorno DB_URI no está configurada."); // Verifica que la URI exista
}

const client = new MongoClient(URI); // Crea un cliente para conectar con MongoDB

try {
  await client.connect(); // Conecta al servidor MongoDB
  await client.db("admin").command({ ping: 1 }); // Verifica que la conexión sea exitosa
  console.log("Conexión exitosa a MongoDB");
} catch (err) {
  console.error("Error conectando a MongoDB:", err); // Gestión de errores
  process.exit(1); // Finaliza el proceso si falla
}

const db = client.db("peer2pong"); // Selecciona la base de datos
export default db; // Exporta la conexión para usarla en otros archivos
