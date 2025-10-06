import type { Task } from "../../../pages/TasksPage/TasksPage";

type ButtonDeleteProps = {
    item: Task;
    onSave: (deletedTask: Task) => void;
}
export const ButtonDelete = ({item, onSave}: ButtonDeleteProps) => {
    const deleteItem = async () => {
        await fetch(`http://localhost:5000/tasks/${item.id}`,
            {method: "DELETE"}
        )
        onSave(item);
    }

    return (<button onClick={() => deleteItem()} type="button" className="task__button-delete">
        Удалить
    </button>)
}