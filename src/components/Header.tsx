import { Nav } from "@/components/Nav.tsx";
import cls from '@/styles/modules/header.module.scss'

export function Header() {
  return (
    <header className={cls.header}>
      <Nav />
    </header>
  )
}