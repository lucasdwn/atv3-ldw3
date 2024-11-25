import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri: string = process.env.DB_URI || "mongodb://localhost:27017/atv3-ldw3";

const db = mongoose;

export function connect() {
    db.connect(uri)
        .then(() => console.log("Conectado ao MongoDB com sucesso!"))
        .catch((e) => {
            console.error("Erro ao conectar ao MongoDB:", e.message);
        });

    process.on("SIGINT", async () => {
        try {
            console.log("Conexão com o MongoDB fechada");
            await mongoose.connection.close();
            process.exit(0);
        } catch (error) {
            console.error("Erro ao fechar a conexão com o MongoDB:", error);
            process.exit(1);
        }
    });
}

export async function disconnect() {
    console.log("Conexão com o MongoDB encerrada");
    await db.disconnect();
}