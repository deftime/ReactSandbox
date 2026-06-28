import clsx from "clsx";
import cls from '@/styles/modules/todoPage.module.scss';
import { Task } from "@/components/Task.tsx";

export function TodoPage() {
  return (
    <section className={cls.todoApp}>
      <div className={cls.side}>
        <div className={cls.add}></div>
        <div className={cls.list}>
          <Task id={567} name={'Go for the delivery'} isDone={true} onCheck={
            () => { console.log('Check: ' + 567) }
          } onDelete={
            () => { console.log('Delete: ' + 567) }
          } />
          <Task id={567} name={'Bike to wood'} isDone={true} onCheck={
            () => { console.log('Check: ' + 567) }
          } onDelete={
            () => { console.log('Delete: ' + 567) }
          } />
          <Task id={567} name={'Wow time!'} isDone={false} onCheck={
            () => { console.log('Check: ' + 567) }
          } onDelete={
            () => { console.log('Delete: ' + 567) }
          } />
        </div>
      </div>
      <div className={clsx(cls.side, cls.details)}></div>
    </section>
  )
}