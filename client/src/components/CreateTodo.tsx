import type { ChangeEvent, FormEvent } from "react"

type CreateTodoProps = {
    todoTitle : string,
    todoTitleOnChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    SubmitHandler: (e: FormEvent<HTMLFormElement>) => void,
    editMode : boolean
}
const CreateTodo = ({todoTitle,todoTitleOnChangeHandler,SubmitHandler,editMode}:CreateTodoProps) => {
  return (
    <div>
        <form onSubmit={SubmitHandler}>
            <input type="text" value={todoTitle} onChange={todoTitleOnChangeHandler}/>
            <button type="submit">
                {
                    editMode ? 'Update' : 'Save'
                }
            </button>
        </form>
    </div>
  )
}

export default CreateTodo