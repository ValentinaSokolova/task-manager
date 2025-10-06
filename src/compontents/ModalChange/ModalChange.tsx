import { useState } from "react";
import type { Task } from "../../pages/TasksPage/TasksPage";
import "./ModalChange.css";

interface ModalChangeProps {
    item: Task;
    onClose: () => void;
    onSave: (updated: Task) => void;
}

export const ModalChange = ({ item, onClose, onSave }: ModalChangeProps) => {

    const [inputValue, setInputValue] = useState(item.title);

    const saveNewTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/tasks/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: inputValue,
            }),
        });
        const updatedTask = await response.json();
        onSave(updatedTask);
        onClose();
    }

    return (
        <div className="modal__window">
            <div className="modal__content">
                <h2>Изменить задание</h2>
                <form onSubmit={saveNewTask} className="modal__form">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="modal__input"
                    />
                    <button type="submit" className="modal__save-btn">Сохранить</button>
                    <button type="button" onClick={onClose} className="modal__cancel-btn">Отмена</button>
                </form>
            </div>
        </div>
    )
}