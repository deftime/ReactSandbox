import { useState } from "react";
import clsx from "clsx";
import { Nav } from "@/components/Nav.tsx";
import { LogInStatus } from "@/components/LogInStatus.tsx";
import cls from '@/styles/modules/header.module.scss'

export function Header() {
  // Открытие мобильного варианта меню
  const [openMobile, setOpen] = useState<boolean>(false);

  return (
    <header className={cls.header}>
      <Nav isOpenMobile={openMobile} onClick={() => setOpen(false)} />
      <LogInStatus />
      <div className={ clsx(cls.burger, 'mobile', openMobile && cls.open) }
           onClick={() => {
             setOpen(!openMobile);
           }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  )
}