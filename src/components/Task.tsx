import type { MouseEvent } from "react";
import clsx from "clsx";
import cls from '@/styles/modules/task.module.scss';
import closeIcon from '@/assets/close.svg';

type TaskProps = {
  id: number
  name: string
  isDone: boolean
  onCheck: (e: MouseEvent<HTMLElement>) => void
  onDelete: (e: MouseEvent<HTMLElement>) => void
}

export function Task(props: TaskProps) {
  return (
    <div className={clsx(cls.task, props.isDone && cls.done)} data-id={props.id} onClick={()=> console.log('Task click!')}>
      <div className={cls.checker} onClick={props.onCheck}></div>
      <div className={cls.name}>{props.name}</div>
      <div className={cls.tools}>
        <span onClick={props.onDelete}><img src={closeIcon} alt=""/></span>
      </div>
    </div>
  )
}