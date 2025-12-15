"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updatedTodo = exports.createNewTodo = exports.getTodosByID = exports.getAllTodos = void 0;
const todo_1 = require("../models/todo");
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.Todo.find().lean();
        res.status(200).json({
            success: true,
            count: todos.length,
            todos,
        });
    }
    catch (error) {
        console.error("getAllTodos error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch todos",
        });
    }
});
exports.getAllTodos = getAllTodos;
const getTodosByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todo_1.Todo.findById(id).lean();
        if (!todo) {
            res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        res.status(200).json({
            success: true,
            todo
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTodosByID = getTodosByID;
const createNewTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const todo = yield todo_1.Todo.create({
            title
        });
        res.status(201).json({
            success: true,
            message: 'Todo created Successfully.',
            todo
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong!'
        });
    }
});
exports.createNewTodo = createNewTodo;
const updatedTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        console.log('title', title);
        const updatedTodo = yield todo_1.Todo.findByIdAndUpdate(id, { title }, {
            new: true, runValidators: true
        });
        if (!updatedTodo) {
            res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        res.status(200).json({
            success: true,
            message: 'Todo updated Successfully.',
            todo: updatedTodo
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatedTodo = updatedTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield todo_1.Todo.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        res.status(200).json({
            success: true,
            message: 'Todo deleted Successfully.'
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteTodo = deleteTodo;
