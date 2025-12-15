import { Router } from "express";
import { createNewTodo, deleteTodo, getAllTodos, getTodosByID, updatedTodo } from "../controllers/todo";

const router = Router();

router.get('/',getAllTodos);
router.get('/:id',getTodosByID);
router.post('/',createNewTodo);
router.put('/:id',updatedTodo);
router.delete('/:id',deleteTodo);
export default router;