import { useEffect, useState } from "react";

type TaskType = {
  id: number,
  isDone: boolean,
  isSelected: boolean,
  title: string,
  desc: string,
}

export type TaskTypeClear = Omit<TaskType, 'id' | 'isDone' | 'isSelected'>

export function useTasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [selected, setSelected] = useState<TaskType | null>(null);

  useEffect(() => {
    const tasksCurrent = localStorage.getItem('tasks');
    if (tasksCurrent) {
      setTasks(JSON.parse(tasksCurrent));
    }
  }, []);

  const addTask = (taskData: TaskTypeClear) => {
    const newId = Math.floor(Math.random() * 100);
    const newTask = { ...taskData, id: newId, isDone: false, isSelected: false };
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  }

  const checkTask = (id: number) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.isSelected && setSelected({...task, isDone: !task.isDone});
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

  const selectTask = (id: number) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.isSelected ? setSelected(null) : setSelected(task);
        return { ...task, isSelected: !task.isSelected }
      } else {
        return { ...task, isSelected: false }
      }
    })
    setTasks(newTasks);
  }

  return { tasks, selected, addTask, checkTask, deleteTask, selectTask }

}