import { mainMenu } from "@/store/navMenu.ts";

// Тут казалось бы мы просто возвращаем статические данные.
// Но суть хука в том, что он возвращает меню и берет на себя логику где его брать.
// Например, завтра мы можем уже получать структуру меню из API.

export function useNavMenu() {
  const menu = mainMenu;

  return { menu }
}