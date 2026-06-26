import type { ReactNode } from "react";
import clsx from "clsx";
import cls from '@/styles/modules/wrapperLayout.module.scss';

type WrapperLayoutProps = {
  children: ReactNode
  className?: 'wide' | 'bg'
}

export function WrapperLayout(props: WrapperLayoutProps) {
  const classSet = clsx(cls.wrapperBox, props.className && cls[props.className])

  return (
    <div className={classSet}>
      {props.children}
    </div>
  )
}