import clsx from "clsx";
import cls from '@/styles/modules/todoPage.module.scss';
import { Task } from "@/components/Task.tsx";
import { useTasks } from "@/hooks/useTasks.ts";

export function TodoPage() {
  const { tasks } = useTasks()

  return (
    <section className={cls.todoApp}>
      <div className={cls.side}>
        <div className={cls.add}></div>
        <div className={cls.list}>
          {tasks.map((elem) => (
            <Task key={elem.id} id={elem.id} name={elem.title} isDone={elem.isDone} onCheck={
              () => { console.log('Checked: ' + elem.id) }
            } onDelete={
              () => { console.log('Deleted: ' + elem.id) }
            } />
          ))}
        </div>
      </div>
      <div className={clsx(cls.side, cls.details)}></div>
    </section>
  )
}