import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connect } from "./database/connection";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

// Configurar o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, "views")));

async function startServer() {
    try {
        await connect();

        // Rota para o HTML principal
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "views", "index.html"));
        });

        // Rota para as APIs
        app.use("/api", routes);

        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}...`);
        });

    } catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
    }
}

startServer();
