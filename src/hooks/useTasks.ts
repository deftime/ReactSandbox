import { useEffect, useState } from "react";

type TaskType = {
  id: number,
  isDone: boolean
  title: string,
}

export type TaskTypeClear = Omit<TaskType, 'id' | 'isDone'>

export function useTasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const tasksCurrent = localStorage.getItem('tasks');
    if (tasksCurrent) {
      setTasks(JSON.parse(tasksCurrent));
    }
  }, []);

  const addTask = (taskData: TaskTypeClear) => {
    const newId = Math.floor(Math.random() * 100);
    const newTask = { ...taskData, id: newId, isDone: false };
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  }

  const checkTask = (id: number) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone }
      }
      return task;
    })
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  return { tasks, addTask, checkTask, deleteTask }

}