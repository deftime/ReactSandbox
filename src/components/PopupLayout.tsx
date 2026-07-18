import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import closeIcon from '@/assets/close.svg';
import clsx from "clsx";
import cls from '@/styles/layouts/popupLayout.module.scss';

type PopupLayoutProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function PopupLayout(props: PopupLayoutProps) {
  return (
    createPortal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={clsx(cls.popWrapper, props.isOpen && cls.open)}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cls.pop}>
          <div className={cls.popTop}>
            {props.title && <span>{props.title}</span>}
            <div className={cls.popClose} onClick={props.onClose}>
              <img src={closeIcon} alt="close pop"/>
            </div>
          </div>
          {props.children}
        </motion.div>
      </motion.div>,
    document.body)
  )
}