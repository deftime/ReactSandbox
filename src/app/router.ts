import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import { HomePage } from "@/pages/HomePage.tsx";
import { FormsPage } from "@/pages/FormsPage.tsx";
import { TodoPage } from "@/pages/TodoPage.tsx";
import { SwapiPage } from "@/pages/SwapiPage.tsx";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: HomePage
      },
      {
        path: '/forms',
        Component: FormsPage
      },
      {
        path: '/todo',
        Component: TodoPage
      },
      {
        path: '/swapi',
        Component: SwapiPage
      }
    ]
  }
])