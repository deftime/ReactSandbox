import clsx from "clsx";
import cls from '@/styles/modules/taskDetails.module.scss';

type TaskDetailsProps = {
  id: number
  title: string
  desc?: string
  isDone: boolean
}

export function TaskDetails(props: TaskDetailsProps) {
  return (
    <div className={clsx(cls.taskDetails, props.isDone && cls.done)} data-id={props.id}>
      <div className={cls.top}>
        <div className={cls.taskTitle}>{props.title}</div>
        <div className={cls.status}>{props.isDone ? 'Done' : 'To Do'}</div>
      </div>
      <div className={cls.desc}>{props.desc ?? 'No description...'}</div>
    </div>
  )
}