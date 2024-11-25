import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connect } from "./database/connection";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

async function startServer() {
    try {
        await connect();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}...`);
        });

        app.use('/api', routes);

    } catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
    }
}

startServer();