import { Request, Response } from "express";
import { Todo } from "../models/todo";

export const getAllTodos = async(req:Request,res:Response)=>{
    try {
        const todos = await Todo.find().lean();

        res.status(200).json({
        success: true,
        count: todos.length,
        todos,
        });
    } catch (error) {
        console.error("getAllTodos error:", error);

        res.status(500).json({
        success: false,
        message: "Failed to fetch todos",
        });
    }
}

export const getTodosByID = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id).lean();

        if(!todo){
            res.status(404).json({
                success : false,
                  message: "Todo not found",
            })
        }

        res.status(200).json({
            success: true,
            todo
        })
    } catch (error) {
        console.log(error);
    }
}


export const createNewTodo = async(req:Request,res:Response)=>{
    try {
        const {title} = req.body;
        const todo = await Todo.create({
            title
        });

        res.status(201).json({
            success: true,
            message : 'Todo created Successfully.',
            todo
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong!'
        })
    }
}

export const updatedTodo = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params;
        const {title} = req.body;
        console.log('title',title);
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {title},
            {
                new: true, runValidators: true
            }
        )

        if (!updatedTodo) {
            res.status(404).json({
                success : false,
                  message: "Todo not found",
            })
        }

        res.status(200).json({
            success: true,
            message : 'Todo updated Successfully.',
            todo : updatedTodo
        })


    } catch (error) {
        console.log(error);
    }
}

export const deleteTodo = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params;

        const result = await Todo.findByIdAndDelete(id);

        if (!result) {
            res.status(404).json({
                success : false,
                  message: "Todo not found",
            })
        }

        res.status(200).json({
            success: true,
            message : 'Todo deleted Successfully.'
        })

    } catch (error) {
        console.log(error);
    }
}