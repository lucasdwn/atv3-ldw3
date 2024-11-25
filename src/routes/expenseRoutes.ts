import { Router } from 'express';
import {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
} from '../controllers/expenseController';

const router = Router();

// Rotas CRUD
router.post('/', createExpense);          // Criar uma despesa
router.get('/listAll', getExpenses);            // Obter todas as despesas
router.get('/getExpense/:id', getExpenseById);     // Obter uma despesa específica
router.put('/update/:id', updateExpense);      // Atualizar uma despesa
router.delete('/delete/:id', deleteExpense);   // Deletar uma despesa
router.get('/getTotalExpenses', getTotalExpenses);

export default router;
