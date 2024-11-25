import { Router } from 'express';
import {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
} from '../controllers/expenseController';

const router = Router();

// Rotas CRUD
router.post('/', createExpense);          // Criar uma despesa
router.get('/listAll', getExpenses);            // Obter todas as despesas
router.get('/getExpense/:id', getExpenseById);     // Obter uma despesa específica
router.put('/update/:id', updateExpense);      // Atualizar uma despesa
router.delete('/delete/:id', deleteExpense);   // Deletar uma despesa

export default router;
