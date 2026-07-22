import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BASE_URL } from "@/app/router.ts";
import clsx from "clsx";
import cls from '@/styles/modules/loginStatus.module.scss';
import icon from '@/assets/login.png';
import { AuthStatus } from '@/App.tsx';

export function LogInStatus() {
  const navigate = useNavigate();
  const user = useContext(AuthStatus); // Получаем или Пользователя или NULL

  // Тут должен быть логаут через Firebase
  // Обновится ли статус сам или надо передавать наверх?
  const logOutHandler = () => {
    console.log('Log Out!');
  }

  const logInHandler = () => {
    navigate(`${BASE_URL}login`)
  }

  return (
    <div className={cls.logStatus}>
      {user
        ? (
          <div className={cls.logInfo}>
            <span>{user.name}</span>
            <button className={clsx('btn-link', cls.outBtn)} onClick={logOutHandler}>Log Out</button>
          </div>
        ) : (
          <div className={cls.logBtn} onClick={logInHandler}>
            <img src={icon} alt="login_icon"/>
          </div>
        )
      }
    </div>
  )
}