import clsx from "clsx";
import cls from '@/styles/modules/brick.module.scss';

type BrickProps = {
  img: string,
  title: string,
  onClick?: () => void
}

export function Brick(props: BrickProps) {
  return (
    <div className={clsx(cls.brick, props.onClick && cls.linked)} onClick={props.onClick}>
      <img src={props.img} alt="brick_icon"/>
      <span>{props.title}</span>
    </div>
  )
}