import clsx from "clsx";
import cls from '@/styles/pages/todoPage.module.scss';
import { useTasks } from "@/hooks/useTasks.ts";
import { Task } from "@/components/Task.tsx";
import { FormAddTask } from "@/components/FormAddTask.tsx";
import { TaskDetails } from "@/components/TaskDetails.tsx";

export function TodoPage() {
  const { tasks, selected: selectedTask, editing, saveTask, checkTask, deleteTask, selectTask, editTask } = useTasks()

  return (
    <section className={cls.todoApp}>
      <div className={cls.side}>
        <div className={cls.add}>
          <FormAddTask pushData={saveTask} getData={editing} />
        </div>
        <div className={cls.list}>
          {tasks.length === 0 && <span className={cls.nope}>No tasks, add any and go!</span>}
          {tasks.map((elem) => (
            <Task key={elem.id} id={elem.id} name={elem.title} isDone={elem.isDone} isSelected={elem.isSelected}
            onCheck={
              (e) => {
                e.stopPropagation();
                checkTask(elem.id);
              }
            }
            onDelete={
              (e) => {
                e.stopPropagation();
                deleteTask(elem.id);
              }
            }
            onEdit={
              (e) => {
                e.stopPropagation();
                editTask(elem.id);
              }
            }
            onSelect={
              () => selectTask(elem.id)
            }
            />
          ))}
        </div>
      </div>
      <div className={clsx(cls.side, cls.details)}>
        {selectedTask && (
          <TaskDetails id={selectedTask.id} title={selectedTask.title} desc={selectedTask.desc} isDone={selectedTask.isDone} />
        )}
      </div>
    </section>
  )
}