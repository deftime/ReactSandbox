import clsx from "clsx";
import { useNavMenu } from "@/hooks/useNavMenu.ts";
import { NavLink } from "react-router-dom";
import cls from "@/styles/modules/nav.module.scss";


export function Nav() {
  const { menu } = useNavMenu();

  return (
    <nav className={cls.nav}>
      {menu.map((elem)=>{
        return (
          <NavLink to={elem.url} className={({ isActive }) => isActive ? clsx(cls.navItem, cls.active) : clsx(cls.navItem)}>
            {elem.title}
          </NavLink>
        )
      })}
    </nav>
  )
}