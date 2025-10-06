import { useState } from "react"
import { ModalChange } from "../../ModalChange/ModalChange";
import type { Task } from "../../../pages/TasksPage/TasksPage";

interface ButtonChangeProps {
    item: Task;
    onSave: (updated: Task) => void;
}

export const ButtonChange = ({ item, onSave }: ButtonChangeProps) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="task__button-change">
                Изменить
            </button>

            {isOpen && (
                <ModalChange
                    item={item}
                    onClose={() => setIsOpen(false)}
                    onSave={onSave}
                />
            )}
        </>)
}