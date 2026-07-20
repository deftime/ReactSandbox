import { mainMenu } from "@/store/navMenu.ts";
import { BASE_URL} from "@/app/router.ts";

export function useNavMenu() {
  // Готовим правильную структуру меню перед возвратом.
  // Заменяем строку линка с базовим корнем.
  const menu = mainMenu.map(item => {
    const newUrl = item.url.slice(1);
    return { ...item, url: BASE_URL + newUrl }
  });

  return { menu }
}