import React, { useEffect, useState } from "react";
import { Header } from "../../compontents/Header/Header";
import "./TasksPage.css";
import { ButtonChange } from "../../compontents/Buttons/ButtonChange/ButtonChange";
import { ButtonDelete } from "../../compontents/Buttons/ButtonDelete/ButtonDelete";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";

export interface Task {
  id: string;
  title: string;
  status: string;
  userId: number;
}

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const userId = localStorage.getItem("me");
  const [newTaskValue, setNewTaskValue] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTaskValue.trim() || !userId) return;

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTaskValue,
        status: "new",
        userId: userId,
      }),
    });

    const createdTask = await response.json();
    setTasks((prev) => [...prev, createdTask]);
    setNewTaskValue("");
  };

  useEffect(() => {
    const loadTasks = async () => {
      if (!userId) return;
      const response = await fetch(
        `http://localhost:5000/tasks?userId=${userId}`
      );
      const data = await response.json();
      setTasks(data);
    };
    loadTasks();
  }, [userId]);

  useEffect(() => {
    const loadUserName = async () => {
      if (!userId) return;
      const response = await fetch(`http://localhost:5000/users?id=${userId}`);
      const data = await response.json();
      setUserName(data[0].name);
    };
    loadUserName();
  }, [userId]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    const task = tasks.find((t) => String(t.id) === draggableId);
    if (!task) return;

    const updatedTask = { ...task, status: destination.droppableId };

    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: destination.droppableId }),
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const columns = [
    { id: "new", title: "Новые" },
    { id: "in-progress", title: "В процессе" },
    { id: "revision", title: "Требует доработки" },
    { id: "completed", title: "Выполнено" },
  ];

  return (
    <>
      <Header isLogin={!!localStorage.getItem("me")} />
      <main>
        <h1 className="main__title">Здравствуйте, {userName}!</h1>
        <form onSubmit={handleSubmit} className="main__task-form">
          <input
            type="text"
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
            className="main__task-input"
          />
          <button type="submit" className="main__task-btn">Добавить новое задание</button>
        </form>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="columns">
            {columns.map((col) => (
              <div className="column" key={col.id}>
                <h3 className="column__title">{col.title}</h3>
                <Droppable droppableId={col.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="task-list"
                    >
                      {tasks
                        .filter((t) => t.status === col.id)
                        .map((item, index) => (
                          <Draggable
                            key={String(item.id)}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="task"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <h3 className="task__title">{item.title}</h3>
                                <div className="task__buttons">
                                  <ButtonChange
                                    item={item}
                                    onSave={(updatedTask) => {
                                      setTasks((prev) =>
                                        prev.map((t) =>
                                          t.id === updatedTask.id
                                            ? updatedTask
                                            : t
                                        )
                                      );
                                    }}
                                  />
                                  <ButtonDelete
                                    item={item}
                                    onSave={(deletedTask) => {
                                      setTasks((prev) =>
                                        prev.filter(
                                          (t) => t.id !== deletedTask.id
                                        )
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </main>
    </>
  );
};
