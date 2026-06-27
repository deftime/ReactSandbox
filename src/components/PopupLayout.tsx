import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import closeIcon from '@/assets/close.svg';
import clsx from "clsx";
import cls from '@/styles/modules/popupLayout.module.scss';

type PopupLayoutProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function PopupLayout(props: PopupLayoutProps) {
  return (
    createPortal(<div className={clsx(cls.popWrapper, props.isOpen && cls.open)}>
      <div className={cls.pop}>
        <div className={cls.popTop}>
          {props.title && <span>{props.title}</span>}
          <div className={cls.popClose} onClick={props.onClose}>
            <img src={closeIcon} alt="close pop"/>
          </div>
        </div>
        {props.children}
      </div>
    </div>,
    document.body)
  )
}