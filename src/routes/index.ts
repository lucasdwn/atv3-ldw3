import { Router } from 'express';
import expenses from "./expenseRoutes";

const router = Router();

router.get('/hello', (req, res) => {
  res.send('Hello, World!');
});
router.use('/expense', expenses)

export default router;
