import mongoose, { Schema, Document } from 'mongoose';

// Interface para o documento Mongoose
export interface IExpense extends Document {
    description: string;
    amount: number;
    date: Date;
}

// Schema do Mongoose
const ExpenseSchema: Schema = new Schema({
    description: {
        type: String,
        required: [true, "o campo 'Descrição' é obrigatório"],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, "o campo 'Valor' é obrigatório"],
        min: 0, // Garante que o valor seja positivo
    },
    date: {
        type: Date,
        required: [true, "o campo 'Data' é obrigatório"],
        default: Date.now
    },
});

// Criação do modelo
const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;
