import { appServer } from "./server/appServer";
import { appDB } from "./config/appDB";
import dotenv from "dotenv";

dotenv.config();

appDB
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Mongo DB Atlas, Error: ", error));

const SERVER_PORT: string | number = process.env.PORT || 3000;

const startServer = () => {
    appServer.listen(
        3000,
        'localhost',
        () => console.log(`Servidor corriendo en puerto ${SERVER_PORT}`)
    );
}

export { startServer, appServer };

startServer();