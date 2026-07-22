import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import { HomePage } from "@/pages/HomePage.tsx";
import { FormsPage } from "@/pages/FormsPage.tsx";
import { TodoPage } from "@/pages/TodoPage.tsx";
import { SwapiPage } from "@/pages/SwapiPage.tsx";
import { LawOnlinePage } from "@/pages/LawOnlinePage.tsx";
import { LogInPage } from "@/pages/LogInPage.tsx";

export const BASE_URL = import.meta.env.PROD ? '/ReactSandbox/' : '/';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: BASE_URL,
        Component: HomePage
      },
      {
        path: BASE_URL + 'forms',
        Component: FormsPage
      },
      {
        path: BASE_URL + 'todo',
        Component: TodoPage
      },
      {
        path: BASE_URL + 'swapi',
        Component: SwapiPage
      },
      {
        path: BASE_URL + 'lawonline',
        Component: LawOnlinePage
      },
      {
        path: BASE_URL + 'login',
        Component: LogInPage
      }
    ]
  }
])