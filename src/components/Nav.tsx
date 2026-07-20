import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useNavMenu } from "@/hooks/useNavMenu.ts";
import cls from "@/styles/modules/nav.module.scss";

type NavProps = {
  isOpenMobile?: boolean
  onClick?: () => void
}

export function Nav(props: NavProps) {
  const { menu } = useNavMenu();

  const handleClick = () => {
    if (document.documentElement.clientWidth > 500) return;
    props.onClick && props.onClick();
  }

  return (
    <nav className={ clsx(cls.nav, { [cls.open]: props.isOpenMobile }) }>
      {menu.map((elem)=>{
        return (
          <NavLink to={elem.url}
                   className={({ isActive }) => isActive ? clsx(cls.navItem, cls.active) : clsx(cls.navItem)}
                   onClick={handleClick}
                   key={elem.id}>
            {elem.title}
          </NavLink>
        )
      })}
    </nav>
  )
}