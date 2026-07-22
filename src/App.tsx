import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header.tsx";

export const AuthStatus = createContext(null);

function App() {

  // Тут будет проверка авторизации через Firebase
  // Ее результат отправится в стейт и в контекст
  // Если успешно - передаем объект Пользователя, если нет - null
  // + нужно типизировать Контекст

  return (
    <>
      <AuthStatus.Provider value={null}>
        <Header />
        <div className={'main'}>
          <Outlet />
        </div>
      </AuthStatus.Provider>
    </>
  )
}

export default App
