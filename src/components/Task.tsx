import type { MouseEvent } from "react";
import clsx from "clsx";
import cls from '@/styles/modules/task.module.scss';
import closeIcon from '@/assets/close.svg';
import editIcon from '@/assets/edit.svg';

type TaskProps = {
  id: number
  name: string
  isDone: boolean
  isSelected: boolean
  onCheck: (e: MouseEvent<HTMLElement>) => void
  onDelete: (e: MouseEvent<HTMLElement>) => void
  onEdit: (e: MouseEvent<HTMLElement>) => void
  onSelect: () => void
}

export function Task(props: TaskProps) {
  return (
    <div className={clsx(cls.task, props.isDone && cls.done, props.isSelected && cls.select)} data-id={props.id} onClick={props.onSelect}>
      <div className={cls.checker} onClick={props.onCheck}></div>
      <div className={cls.name}>{props.name}</div>
      <div className={cls.tools}>
        <span onClick={props.onEdit}><img src={editIcon} alt="" title="Edit"/></span>
        <span onClick={props.onDelete}><img src={closeIcon} alt="" title="Delete"/></span>
      </div>
    </div>
  )
}