import { Request, Response } from 'express';
import Expense from '../models/expenseModel';
import mongoose from 'mongoose';

// Create - Adicionar uma nova despesa
export const createExpense = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { description, amount, date } = req.body;

        if(!description){
            return res.status(404).json({ message: 'Erro ao criar a despesa', error: 'Descrição é obrigatória' });
        }

        if(!amount){
            return res.status(404).json({ message: 'Erro ao criar a despesa', error: 'Valor é obrigatório' });
        }

        if(!date){
            return res.status(404).json({ message: 'Erro ao criar a despesa', error: 'Data é obrigatória' });
        }

        // Criação do documento no banco
        const expense = await Expense.create({ description, amount, date });

        return res.status(201).json(expense);
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao criar a despesa', error: error.message });
    }
};

// Read - Obter todas as despesas
export const getExpenses = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json(expenses);
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro ao obter despesas', error: error.message });
    }
};

// Read - Obter uma despesa específica por ID
export const getExpenseById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Erro ao buscar despesa", error: "ID inválido" });
        }

        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Erro ao buscar a despesa', error: "Despesa não encontrada" });
        }

        return res.status(200).json(expense);
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao buscar a despesa', error: error.message });
    }
};

// Update - Atualizar uma despesa por ID
export const updateExpense = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { description, amount, date } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Erro ao atualizar despesa", error: "ID inválido" });
        }

        const expense = await Expense.findByIdAndUpdate(
            id,
            { description, amount, date },
            { new: true, runValidators: true }
        );

        if (!expense) {
            return res.status(404).json({ message: 'Erro ao atualizar a despesa', error: 'Despesa não encontrada' });
        }

        return res.status(200).json(expense);
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao atualizar a despesa', error: error.message });
    }
};

// Delete - Remover uma despesa por ID
export const deleteExpense = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Erro ao atualizar despesa", error: "ID inválido" });
        }

        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ message: 'Erro ao atualizar a despesa', error: 'Despesa não encontrada' });
        }

        return res.status(200).json({ message: 'Despesa removida com sucesso' });
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao remover a despesa', error: error.message });
    }
};
