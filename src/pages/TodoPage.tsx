import clsx from "clsx";
import cls from '@/styles/modules/todoPage.module.scss';
import { useTasks } from "@/hooks/useTasks.ts";
import { Task } from "@/components/Task.tsx";
import { FormAddTask } from "@/components/FormAddTask.tsx";

export function TodoPage() {
  const { tasks, addTask, checkTask, deleteTask } = useTasks()

  return (
    <section className={cls.todoApp}>
      <div className={cls.side}>
        <div className={cls.add}>
          <FormAddTask pushData={addTask} />
        </div>
        <div className={cls.list}>
          {tasks.length === 0 && <span className={cls.nope}>No tasks, add any and go!</span>}
          {tasks.map((elem) => (
            <Task key={elem.id} id={elem.id} name={elem.title} isDone={elem.isDone} onCheck={
              (e) => {
                e.stopPropagation();
                checkTask(elem.id);
              }
            } onDelete={
              (e) => {
                e.stopPropagation();
                deleteTask(elem.id);
              }
            } />
          ))}
        </div>
      </div>
      <div className={clsx(cls.side, cls.details)}></div>
    </section>
  )
}