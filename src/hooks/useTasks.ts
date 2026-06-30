import { useEffect, useState } from "react";

// Главный тип любой Таски
export type TaskType = {
  id: number,
  isDone: boolean,
  isSelected: boolean,
  title: string,
  desc: string,
}

// Тип для управляемых полей формы (чистых данных).
export type TaskTypeClear = Omit<TaskType, 'id' | 'isDone' | 'isSelected'>

// Тип для отправки данных из формы на Редактирование, чистые данные + ID.
export type TaskTypeClearId = TaskTypeClear & { id: number | null }

export function useTasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]); // Стейт масива всех Тасок
  const [selected, setSelected] = useState<TaskType | null>(null); // Стейт выбранной Таски
  const [editing, setEditing] = useState<TaskType | null>(null); // Стейт режима Редактирования

  useEffect(() => {
    const tasksCurrent = localStorage.getItem('tasks');
    if (tasksCurrent) {
      setTasks(JSON.parse(tasksCurrent));
    }
  }, []);

  // Универсальный метод, который и создает новую, и редактирует существующую таску.
  // В зависимости от того, пришел ли ему ID от формы.
  const saveTask = (taskData: TaskTypeClearId) => {
    if (taskData.id) {
      const newTasks = tasks.map(task => {
        if (task.id === taskData.id) {
          // Сразу обновляем компонент Деталей, если мы редактируем выбранную таску.
          task.isSelected && setSelected({ ...task, title: taskData.title, desc: taskData.desc });
          return { ...task, title: taskData.title, desc: taskData.desc }
        } else {
          return task;
        }
      })
      setTasks(newTasks);
      setEditing(null);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    } else {
      const newId = Math.floor(Math.random() * 100);
      const newTask = { ...taskData, id: newId, isDone: false, isSelected: false };
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
  }

  const checkTask = (id: number) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        // Сразу обновляем компонент Деталей, если мы чекаем выбранную таску.
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

  // Находим таску и ставим ее в стейт Редактирования.
  // Если в этом стейте есть данные - значит мы в режиме Редактирования.
  // За стейтом смотрит Форма.
  const editTask = (id: number) => {
    const editTask = tasks.find(task => task.id === id);
    setEditing(editTask as TaskType);
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

  return { tasks, selected, editing, saveTask, checkTask, deleteTask, selectTask, editTask }

}